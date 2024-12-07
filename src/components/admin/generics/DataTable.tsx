import { Table } from "flowbite-react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ReactElement } from "react";
import BtnActions from "@components/buttons/BtnActions.tsx";

type Column<T> = {
  key: keyof T;
  label: string;
  render: (item: T) => ReactElement;
}

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
};

const DataTable = <T, >(props: DataTableProps<T>) => {
  return (
    <Table>
      <Table.Head>
        {props.columns.map((column) => (
          <Table.HeadCell key={column.key as string}>{column.label}</Table.HeadCell>
        ))}
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {props.data.map((item, index) => (
          <Table.Row key={index}>
            {props.columns.map((column) => (
              <Table.Cell key={column.key as string}>
                <span className="text-white">{column.render(item)}</span>
              </Table.Cell>
            ))}
            <Table.Cell>
              <div className="flex gap-2">
                <BtnActions onClick={() => props.onEdit(item)} className="hover:bg-zinc-600">
                  <PencilIcon className="size-5"/>
                </BtnActions>
                <BtnActions onClick={() => props.onDelete(item)} className="hover:bg-red-500">
                  <TrashIcon className="size-5"/>
                </BtnActions>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
