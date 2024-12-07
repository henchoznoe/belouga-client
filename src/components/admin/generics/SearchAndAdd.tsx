import { useNavigate } from "react-router-dom";
import { TextInput } from "flowbite-react";

type SearchAndAddProps = {
  onSearch: (search: string) => void;
}

const SearchAndAdd = (props: SearchAndAddProps) => {

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

export default SearchAndAdd;
