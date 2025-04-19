import Heading from "@components/global/Heading.tsx";
import { NavLink } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useEffect, useState } from "react";
import { PlayersDataType } from "@/types/players.ts";
import { Alert, Spinner } from "flowbite-react";
import { SocialIcon } from "react-social-icons";

const Home = () => {

  const { send, isLoading, errors } = useFetch();

  const [players, setPlayers] = useState<PlayersDataType[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersRes = await send(1, "GET", {
        params: 'action=getPlayersT'
      });
      if ( playersRes.success ) setPlayers(playersRes.data);
    }
    fetchPlayers();
  }, [send]);

  return (
    <>
      <Heading title="Cup Trackmania"/>
      <div className="flex flex-col items-center gap-6 p-2">
        <div className="w-full max-w-3xl p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4 font-paladinsgrad">Informations</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">📅 Date :</h3>
              <p>2 (qualifications) et 9 (finale) août 2025 à 19h00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">🧑‍💻 Participants maximum :</h3>
              <p>32 joueurs</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">💡 Format d'inscription :</h3>
              <p>En solo uniquement</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">🎮 Jeu :</h3>
              <p>Trackmania 🚗</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">📋 Format du tournoi :</h3>
              <ul className="list-disc list-inside">
                <li>
                  2 août 2025 : mode coupe (jusqu'à 120 points + 8 qualifiés) sur 2 serveurs avec (dans l'idéal) 16 joueurs dans chaque
                  serveur
                </li>
                <li>
                  9 août 2025 : mode Knockout
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">⚠️ Important :</h3>
            <ul className="list-disc list-inside">
              <li>Chaque participant peut, s'il le souhaite, faire une map, qui sera joué durant le tournoi (après test et validation des
                admins) (PS : il faut prendre l'abonnement à 20 CHF)
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">🖊️ Comment s'inscrire ?</h3>
            <p>
              Pour s'inscrire au tournoi, il vous suffit de remplir le formulaire d'inscription avec :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Votre pseudo</li>
              <li>Votre pseudo Discord</li>
              <li>Votre chaîne Twitch (facultatif)</li>
            </ul>
            <p className="mt-4">
              Envoyez toutes ces informations via le formulaire prévu aux {" "}
              <NavLink
                to="/register"
                className="underline"
              >
                inscriptions
              </NavLink>.
            </p>
          </div>
        </div>


        <div className="text-center mt-6">
          <p className="text-lg font-semibold">
            Bonne chance à toutes les équipes et que le meilleur gagne ! 🎯
          </p>
        </div>

        <NavLink
          to="/register"
          className="py-2 px-4 bg-belouga-blue text-white rounded hover:bg-belouga-blue/80 hover:scale-105 transition-all"
        >
          S'inscrire au tournoi
        </NavLink>

        <img src="/img/blue-logo.png" alt="Logo" className="w-40"/>

        {/* Show players */}
        {isLoading[1] ? (
          <div className="flex items-center justify-center">
            <Spinner color="gray"/>
          </div>
        ) : errors[1] ? (
          <div className="text-red-500">
            Une erreur est survenue : {errors[1]}
          </div>
        ) : players.length > 0 ? (
          <div className="w-full max-w-3xl p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 font-paladinsgrad">Joueurs déjà inscrits</h2>
            <div className="flex flec-col gap-3">
              {players.map((player) => (
                <div key={player.pk_player} className="flex justify-between items-center bg-zinc-600 p-4 rounded-lg w-full">
                  <div className="text-sm italic">
                    <strong>Pseudo : {player.username}</strong><br/>
                    Discord : {player.discord}
                  </div>
                  <div>
                    {player.twitch &&
                      <SocialIcon url={player.twitch} className="!size-8"/>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-3xl p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 font-paladinsgrad">Joueurs déjà inscrits</h2>
            <Alert color="failure">
              Aucun joueur inscrit pour le moment.
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
