import Heading from "@components/global/Heading.tsx";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Heading title="Belouga Tournament"/>
      <div className="flex flex-col gap-3 items-center">
        <img src="/img/red-logo.png" alt="Logo" className="w-40"/>
        <p>Textes ici (LORSQU'ILS SERONT PRETTTTTTS 😂), images et bracket sur cette page</p>
        <NavLink to="/signup" className="py-2 px-4 bg-red-500 rounded">S'inscrire au tournoi</NavLink>
      </div>
    </>
  );
}

export default Home;
