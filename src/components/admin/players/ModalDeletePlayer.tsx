import { PlayersDataType } from "@/types/players.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { Alert, Button, Modal } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

type ModalDeletePlayerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  playerToDelete: PlayersDataType;
  onPlayerDeleted: (admin: PlayersDataType) => void;
}

const ModalDeletePlayer = (props: ModalDeletePlayerProps) => {

  const { send, isLoading, errors } = useFetch();

  const deletePlayerHandler = async (player: PlayersDataType) => {
    const deletePlayerRes = await send(1, 'DELETE', {
      params: `action=deletePlayer&pk_player=${player.pk_player}`,
      requireAuth: true
    });
    if ( deletePlayerRes.success ) {
      props.onPlayerDeleted(player);
      props.setOpen(false);
    }
  }

  return (
    <>
      <Modal show={props.open} size="md" onClose={() => props.setOpen(false)} popup>
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Es-tu certains de vouloir supprimer cet administrateur ?
            </h3>
            <div className="flex justify-center gap-4 mb-3">
              <Button
                color="failure"
                disabled={isLoading[1]}
                onClick={() => deletePlayerHandler(props.playerToDelete)}
              >
                Oui, je suis sûr
              </Button>
              <Button color="gray" onClick={() => props.setOpen(false)}>
                Annuler
              </Button>
            </div>
            {errors[1] && <Alert color="failure">{errors[1]}</Alert>}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalDeletePlayer;
