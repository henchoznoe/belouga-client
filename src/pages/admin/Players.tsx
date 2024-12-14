import AdminContainer from "@components/global/AdminContainer.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import { GetPlayersType, PlayersDataType } from "@/types/players.ts";
import ModalDelete from "@components/admin/generics/ModalDelete.tsx";
import DataTable from "@components/admin/generics/DataTable.tsx";
import { useNavigate } from "react-router-dom";
import SearchAndAdd from "@components/admin/generics/SearchAndAdd.tsx";

const Players = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();

  const [players, setPlayers] = useState<PlayersDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [playerToDelete, setPlayerToDelete] = useState<PlayersDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const playersRes: GetPlayersType = await send(1, 'GET', {
        params: 'action=getPlayers',
        requireAuth: true
      });
      if ( playersRes.success ) setPlayers(playersRes.data);
    }
    fetchData();
  }, [send]);

  const onPlayerDeleted = (deletedPlayer: PlayersDataType) => {
    setPlayers((prev) => prev.filter((player) => player.pk_player !== deletedPlayer.pk_player));
  }

  const filteredPlayers = players
    .filter((player) => player.username.toLowerCase().includes(filter.toLowerCase()) || player.discord.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => {
      if ( a.team_name === null ) return 1;
      if ( b.team_name === null ) return -1;
      return a.team_name.localeCompare(b.team_name);
    });

  return (
    <>
      <AdminContainer title="Joueurs">
        <p className="mb-5">
          Voici la liste des joueurs du tournoi. En tant qu'Admin, tu peux ajouter, modifier ou supprimer
          des joueurs.
        </p>
        <SearchAndAdd onSearch={setFilter}/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : filteredPlayers.length === 0 ? (
          <Alert color="yellow">Aucun joueur trouvé.</Alert>
        ) : (
          <>
            <DataTable
              data={filteredPlayers}
              columns={[
                {
                  key: "username",
                  label: "Joueur",
                  render: (player) => (
                    <>
                      {player.username}
                      <br/>
                      {player.discord}
                      <br/>
                      {player.riot_username}
                    </>
                  ),
                },
                {
                  key: "twitch",
                  label: "Twitch",
                  render: (player) => (
                    <>
                      {player.twitch
                        ? <a href={player.twitch} target="_blank" className="text-blue-500">Lien</a>
                        : '---'}
                    </>
                  )
                },
                {
                  key: "rank",
                  label: "Rang",
                  render: (player) => <>{player.rank}</>
                },
                {
                  key: "team_name",
                  label: "Équipe",
                  render: (player) => <>{player.team_name || "---"}</>
                },
              ]}
              onEdit={(player) => navigate(`edit/${player.pk_player}`)}
              onDelete={(player) => {
                setPlayerToDelete(player);
                setModalDeleteOpen(true);
              }}
            />
            <ModalDelete
              open={modalDeleteOpen}
              setOpen={setModalDeleteOpen}
              dataToDelete={playerToDelete!}
              onDataDeleted={onPlayerDeleted}
              deleteAction={(player) => `action=deletePlayer&pk_player=${player.pk_player}`}
              confirmText={`Êtes-vous sûr de vouloir supprimer le joueur [${playerToDelete?.username}] ?`}
            />
          </>
        )}
      </AdminContainer>
    </>
  );
}

export default Players;
