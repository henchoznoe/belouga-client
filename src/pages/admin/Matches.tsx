import AdminContainer from "@components/global/AdminContainer.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchAndAdd from "@components/admin/generics/SearchAndAdd.tsx";
import { Alert, Spinner } from "flowbite-react";
import DataTable from "@components/admin/generics/DataTable.tsx";
import ModalDelete from "@components/admin/generics/ModalDelete.tsx";
import { GetMatchesType, MatchesDataType } from "@/types/matches.ts";
import { cn } from "@/utils/classNames.ts";
import { formatDate } from "@/utils/date.ts";

const Matches = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();

  const [matches, setMatches] = useState<MatchesDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [matchToDelete, setMatchToDelete] = useState<MatchesDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const matchesRes: GetMatchesType = await send(1, 'GET', {
        params: 'action=getMatches',
        requireAuth: true
      });
      if ( matchesRes.success ) setMatches(matchesRes.data);
    }
    fetchData();
  }, [send]);

  const onMatchDeleted = (deletedMatch: MatchesDataType) => {
    setMatches((prev) => prev.filter((match) => match.pk_match !== deletedMatch.pk_match));
  }

  const filteredMatches = matches
    .filter((match) => match.round_label.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.fk_round - b.fk_round);

  return (
    <>
      <AdminContainer title="Matchs">
        <p className="mb-5">
          Voici la liste des matchs du tournoi. En tant qu'Admin, tu peux ajouter, modifier ou supprimer
          des matchs pour faire avancer le bracket.
        </p>
        <SearchAndAdd onSearch={setFilter}/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : filteredMatches.length === 0 ? (
          <Alert color="yellow">Aucun match trouvé.</Alert>
        ) : (
          <>
            <DataTable
              data={filteredMatches}
              columns={[
                {
                  key: "round_label",
                  label: "Round",
                  render: (match) => <>{match.round_label}</>
                },
                {
                  key: "team_one_name",
                  label: "Equipes",
                  render: (match) => (
                    <>
                      <span
                        className={cn(match.winner_team ? match.winner_team === match.fk_team_one ? "text-green-500" : "text-red-500" : '')}>
                        {match.team_one_name}
                      </span>
                      <span> VS </span>
                      <span
                        className={cn(match.winner_team ? match.winner_team === match.fk_team_two ? "text-green-500" : "text-red-500" : '')}>
                        {match.team_two_name}
                      </span>
                    </>
                  )
                },
                {
                  key: "score_team_one",
                  label: "Score",
                  render: (match) => (
                    <>
                      {match.score_team_one !== null && match.score_team_two !== null ? `${match.score_team_one} - ${match.score_team_two}` : "---"}
                    </>
                  )
                },
                {
                  key: "winner_team",
                  label: "Vainqueur",
                  render: (match) => (
                    <>
                      {match.winner_team ? match.winner_team === match.fk_team_one ? match.team_one_name : match.team_two_name : "---"}
                    </>
                  )
                },
                {
                  key: "match_date",
                  label: "Date",
                  render: (match) => (
                    <>
                      {match.match_date ? formatDate(match.match_date) : "---"}
                    </>
                  )
                }
              ]}
              onEdit={(match) => navigate(`edit/${match.pk_match}`)}
              onDelete={(match) => {
                setMatchToDelete(match);
                setModalDeleteOpen(true);
              }}
            />
            <ModalDelete
              open={modalDeleteOpen}
              setOpen={setModalDeleteOpen}
              dataToDelete={matchToDelete!}
              onDataDeleted={onMatchDeleted}
              deleteAction={(match) => `action=deleteMatch&pk_match=${match.pk_match}`}
              confirmText={`Êtes-vous sûr de vouloir supprimer le match [${matchToDelete?.team_one_name} VS ${matchToDelete?.team_two_name}] ?`}
            />
          </>
        )}
      </AdminContainer>
    </>
  );
}

export default Matches;
