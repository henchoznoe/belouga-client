import { Table } from "flowbite-react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { PlayersDataType } from "@/types/players.ts";

type PlayersTableProps = {
  players: PlayersDataType[];
  setPlayerToDelete: (player: PlayersDataType) => void;
  setModalDeletePlayer: (value: boolean) => void;
}

const PlayersTable = (props: PlayersTableProps) => {

  const navigate = useNavigate();

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>Utilisateur</Table.HeadCell>
          <Table.HeadCell>Equipe</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {props.players.map((player) => (
            <Table.Row key={player.pk_player}>
              <Table.Cell className="text-white">{player.username}<br/>{player.discord}<br/>{player.twitch}</Table.Cell>
              <Table.Cell className="text-white">{player.team_name ? player.team_name : '-'}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <button
                    className="flex justify-center items-center py-1 px-2 rounded hover:bg-zinc-600 text-white"
                    onClick={() => navigate(`edit/${player.pk_player}`)}
                  >
                    <PencilIcon className="size-5"/>
                  </button>
                  <button
                    className="flex justify-center items-center py-1 px-2 rounded hover:bg-red-500 text-white"
                    onClick={() => {
                      props.setPlayerToDelete(player);
                      props.setModalDeletePlayer(true)
                    }}
                  >
                    <TrashIcon className="size-5"/>
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default PlayersTable;
