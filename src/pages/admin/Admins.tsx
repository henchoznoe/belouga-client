import AdminContainer from "@components/global/AdminContainer.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { AdminsDataType, GetAdminsType } from "@/types/admins.ts";
import { Alert, Spinner } from "flowbite-react";
import ModalDelete from "@components/admin/generics/ModalDelete.tsx";
import DataTable from "@components/admin/generics/DataTable.tsx";
import { useNavigate } from "react-router-dom";
import SearchAndAdd from "@components/admin/generics/SearchAndAdd.tsx";

const Admins = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();

  const [admins, setAdmins] = useState<AdminsDataType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const [adminToDelete, setAdminToDelete] = useState<AdminsDataType | null>(null);
  const [modalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const adminRes: GetAdminsType = await send(1, 'GET', {
        params: 'action=getAdmins',
        requireAuth: true
      });
      if ( adminRes.success ) setAdmins(adminRes.data);
    }
    fetchData();
  }, [send]);

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
      <SearchAndAdd onSearch={setFilter}/>
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
          <DataTable
            data={filteredAdmins}
            columns={[
              {
                key: "username",
                label: "Nom d'utilisateur",
                render: (admin) => <>{admin.username}</>
              },
              {
                key: "label",
                label: "Rôle",
                render: (admin) => <>{admin.label}</>
              },
            ]}
            onEdit={(admin) => navigate(`edit/${admin.pk_admin}`)}
            onDelete={(admin) => {
              setAdminToDelete(admin);
              setModalDeleteOpen(true);
            }}
          />
          <ModalDelete
            open={modalDeleteOpen}
            setOpen={setModalDeleteOpen}
            dataToDelete={adminToDelete!}
            onDataDeleted={onAdminDeleted}
            deleteAction={(admin) => `action=deleteAdmin&pk_admin=${admin.pk_admin}`}
            confirmText={`Êtes-vous sûr de vouloir supprimer l'administrateur [${adminToDelete?.username}] ?`}
          />
        </>
      )}
    </AdminContainer>
  );
};

export default Admins;
