import AdminContainer from "@components/global/AdminContainer.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetTeamsType, TeamsDataType } from "@/types/teams.ts";
import SearchAndAdd from "@components/admin/generics/SearchAndAdd.tsx";
import { Alert, Spinner } from "flowbite-react";
import DataTable from "@components/admin/generics/DataTable.tsx";
import ModalDelete from "@components/admin/generics/ModalDelete.tsx";

const Teams = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();

  const [teams, setTeams] = useState<TeamsDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [teamToDelete, setTeamToDelete] = useState<TeamsDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const teamsRes: GetTeamsType = await send(1, 'GET', {
        params: 'action=getTeams',
        requireAuth: true
      });
      if ( teamsRes.success ) setTeams(teamsRes.data);
    }
    fetchData();
  }, [send]);

  const onTeamDeleted = (deletedTeam: TeamsDataType) => {
    setTeams((prev) => prev.filter((team) => team.pk_team !== deletedTeam.pk_team));
  }

  const filteredTeams = teams
    .filter((team) => team.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <AdminContainer title="Equipes">
        <p className="mb-5">
          Voici la liste des équipes du tournoi. En tant qu'Admin, tu peux ajouter, modifier ou supprimer
          des équipes.
        </p>
        <SearchAndAdd onSearch={setFilter}/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : filteredTeams.length === 0 ? (
          <Alert color="yellow">Aucune équipe trouvée.</Alert>
        ) : (
          <>
            <DataTable
              data={filteredTeams}
              columns={[
                {
                  key: "name",
                  label: "Nom",
                  render: (team) => <>{team.name}</>
                },
                {
                  key: "capacity",
                  label: "Joueurs / Capacité",
                  render: (team) => (
                    <>{team.player_count} / {team.capacity}</>
                  )
                }
              ]}
              onEdit={(team) => navigate(`edit/${team.pk_team}`)}
              onDelete={(team) => {
                setTeamToDelete(team);
                setModalDeleteOpen(true);
              }}
            />
            <ModalDelete
              open={modalDeleteOpen}
              setOpen={setModalDeleteOpen}
              dataToDelete={teamToDelete!}
              onDataDeleted={onTeamDeleted}
              deleteAction={(team) => `action=deleteTeam&pk_team=${team.pk_team}`}
              confirmText={`Êtes-vous sûr de vouloir supprimer l'équipe [${teamToDelete?.name}] ?`}
            />
          </>
        )}
      </AdminContainer>
    </>
  );
}

export default Teams;
