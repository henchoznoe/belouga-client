import AdminContainer from "@components/global/AdminContainer.tsx";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { AdminsDataType, GetAdminsType } from "@/types/admins.ts";
import { Alert, Spinner } from "flowbite-react";
import AdminsTable from "@components/admin/admins/AdminsTable.tsx";
import SearchAndAddAdmins from "@components/admin/admins/SearchAndAddAdmins.tsx";
import ModalDeleteAdmin from "@components/admin/admins/ModalDeleteAdmin.tsx";

const Admins = () => {

  const authCtx = useAuth();
  const { send, isLoading, errors } = useFetch();

  const [admins, setAdmins] = useState<AdminsDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [adminToDelete, setAdminToDelete] = useState<AdminsDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const adminRes: GetAdminsType = await send(1, 'GET', 'action=getAdmins', null, {
        Authorization: `Bearer ${authCtx.admin?.token}`
      });
      if ( adminRes.success ) setAdmins(adminRes.data);
    }
    fetchData();
  }, [authCtx.admin?.token, send]);

  const onAdminDeleted = (deletedAdmin: AdminsDataType) => {
    setAdmins((prev) => prev.filter((admin) => admin.pk_admin !== deletedAdmin.pk_admin));
  }

  const filteredAdmins = admins
    .filter((admin) => admin.username.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.username.localeCompare(b.username));

  return (
    <AdminContainer title="Admins">
      <p className="mb-5">
        Voici la liste des administrateurs du site web. En tant que SuperAdmin, tu peux ajouter, modifier ou supprimer
        des administrateurs.
      </p>
      <SearchAndAddAdmins
        admins={filteredAdmins}
        onSearch={setFilter}
      />
      {isLoading[1] ? (
        <Alert color="gray">
          <Spinner color="gray"/> Données en cours de chargement...
        </Alert>
      ) : errors[1] ? (
        <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
      ) : filteredAdmins.length === 0 ? (
        <Alert color="yellow">Aucun administrateur trouvé.</Alert>
      ) : (
        <>
          <AdminsTable
            admins={filteredAdmins}
            setAdminToDelete={setAdminToDelete}
            setModalDeleteAdmin={setModalDeleteOpen}
          />
          <ModalDeleteAdmin
            open={modalDeleteOpen}
            setOpen={setModalDeleteOpen}
            adminToDelete={adminToDelete!}
            onAdminDeleted={onAdminDeleted}
          />
        </>
      )}
    </AdminContainer>
  );
};

export default Admins;
