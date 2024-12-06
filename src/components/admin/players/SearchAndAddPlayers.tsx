import { TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { PlayersDataType } from "@/types/players.ts";

type SearchAndAddPlayersProps = {
  players: PlayersDataType[];
  onSearch: (search: string) => void;
}

const SearchAndAddPLayers = (props: SearchAndAddPlayersProps) => {

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

export default SearchAndAddPLayers;
