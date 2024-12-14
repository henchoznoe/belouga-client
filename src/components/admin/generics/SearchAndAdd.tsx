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
            className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/80"
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
