import { AdminsDataType } from "@/types/admins.ts";
import { TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

type SearchAndAddAdminsProps = {
  admins: AdminsDataType[];
  onSearch: (search: string) => void;
}

const SearchAndAddAdmins = (props: SearchAndAddAdminsProps) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="mb-3">
        <div className="flex justify-between">
          <TextInput
            type="text"
            placeholder="Rechercher..."
            onChange={(e) => props.onSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-600"
            onClick={() => navigate('add')}
          >
            Ajouter
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchAndAddAdmins;
