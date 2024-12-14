import { Alert, Button, Modal } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useFetch } from "@/shared/hooks/useFetch.ts";

type ModalDeleteProps<T> = {
  open: boolean;
  setOpen: (open: boolean) => void;
  dataToDelete: T;
  onDataDeleted: (data: T) => void;
  deleteAction: (data: T) => string;
  confirmText: string;
};

const ModalDelete = <T, >(props: ModalDeleteProps<T>) => {

  const { send, isLoading, errors } = useFetch();

  const deleteHandler = async () => {
    const deleteUrl = props.deleteAction(props.dataToDelete);
    const deleteRes = await send(1, "DELETE", {
      params: deleteUrl,
      requireAuth: true
    });
    if ( deleteRes.success ) {
      props.onDataDeleted(props.dataToDelete);
      props.setOpen(false);
    }
  };

  return (
    <Modal show={props.open} size="md" onClose={() => props.setOpen(false)} popup dismissible position="center">
      <Modal.Header/>
      <Modal.Body>
        <div className="text-center">
          <ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {props.confirmText}
          </h3>
          <div className="flex justify-center gap-4 mb-3">
            <Button
              color="failure"
              disabled={isLoading[1]}
              onClick={deleteHandler}
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
  );
};

export default ModalDelete;
