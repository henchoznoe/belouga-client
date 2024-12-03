import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

type BtnReturnToProps = {
  to: string;
}

const BtnReturnTo = (props: BtnReturnToProps) => {

  const navigate = useNavigate();

  return (
    <>
      <button
        className="flex gap-1 items-center justify-center w-24 py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
        onClick={() => navigate(props.to)}
      >
        <ArrowLeftIcon className="size-5"/> Retour
      </button>
    </>
  );
}

export default BtnReturnTo;
