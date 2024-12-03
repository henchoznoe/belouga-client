import { Alert, Button, Modal } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { AdminsDataType } from "@/types/admins.ts";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";

type ModalDeleteAdminProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  adminToDelete: AdminsDataType;
  onAdminDeleted: (admin: AdminsDataType) => void;
}

const ModalDeleteAdmin = (props: ModalDeleteAdminProps) => {

  const authCtx = useAuth();
  const { send, isLoading, errors } = useFetch();

  const deleteAdminHandler = async (admin: AdminsDataType) => {
    const deleteAdminRes = await send(1, 'DELETE', `action=deleteAdmin&pk_admin=${props.adminToDelete.pk_admin}`, null, {
      Authorization: `Bearer ${authCtx.admin?.token}`
    });
    if ( deleteAdminRes.success ) {
      props.onAdminDeleted(admin);
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
                onClick={() => deleteAdminHandler(props.adminToDelete)}
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

export default ModalDeleteAdmin;
