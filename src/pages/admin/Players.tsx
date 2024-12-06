import AdminContainer from "@components/global/AdminContainer.tsx";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { Alert, Spinner } from "flowbite-react";
import { GetPlayersType, PlayersDataType } from "@/types/players.ts";
import PlayersTable from "@components/admin/players/PlayersTable.tsx";
import SearchAndAddPlayers from "@components/admin/players/SearchAndAddPlayers.tsx";
import ModalDelete from "@components/admin/generics/ModalDelete.tsx";

const Players = () => {

  const authCtx = useAuth();
  const { send, isLoading, errors } = useFetch();

  const [players, setPlayers] = useState<PlayersDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [playerToDelete, setPlayerToDelete] = useState<PlayersDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const playersRes: GetPlayersType = await send(1, 'GET', 'action=getPlayers', null, {
        Authorization: `Bearer ${authCtx.admin?.token}`
      });
      if ( playersRes.success ) setPlayers(playersRes.data);
    }
    fetchData();
  }, [authCtx.admin?.token, send]);

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
        <SearchAndAddPlayers
          players={filteredPlayers}
          onSearch={setFilter}
        />
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
            <PlayersTable
              players={filteredPlayers}
              setPlayerToDelete={setPlayerToDelete}
              setModalDeletePlayer={setModalDeleteOpen}
            />
            <ModalDelete
              open={modalDeleteOpen}
              setOpen={setModalDeleteOpen}
              dataToDelete={playerToDelete!}
              onDataDeleted={onPlayerDeleted}
              deleteAction={(player) => `action=deletePlayer&pk_player=${player.pk_player}`}
              confirmText="Es-tu sûr de vouloir supprimer ce joueur ?"
            />
          </>
        )}
      </AdminContainer>
    </>
  );
}

export default Players;
