import { Table } from "flowbite-react";
import { AdminsDataType } from "@/types/admins.ts";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

type AdminsTableProps = {
  admins: AdminsDataType[];
  setAdminToDelete: (admin: AdminsDataType) => void;
  setModalDeleteAdmin: (value: boolean) => void;
}

const AdminsTable = (props: AdminsTableProps) => {

  const navigate = useNavigate();

  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>Nom d'utilisateur</Table.HeadCell>
          <Table.HeadCell>Rôle</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {props.admins.map((admin) => (
            <Table.Row key={admin.pk_admin}>
              <Table.Cell className="text-white">{admin.username}</Table.Cell>
              <Table.Cell className="text-white">{admin.label}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <button
                    className="flex justify-center items-center py-1 px-2 rounded hover:bg-zinc-600 text-white"
                    onClick={() => navigate(`edit/${admin.pk_admin}`)}
                  >
                    <PencilIcon className="size-5"/>
                  </button>
                  <button
                    className="flex justify-center items-center py-1 px-2 rounded hover:bg-red-500 text-white"
                    onClick={() => {
                      props.setAdminToDelete(admin);
                      props.setModalDeleteAdmin(true)
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

export default AdminsTable;
