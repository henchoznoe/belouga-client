import Heading from "@components/global/Heading.tsx";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Heading title="Belouga Tournament"/>
      <div className="flex flex-col items-center gap-6 p-2">
        <div className="w-full max-w-3xl p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Informations et Inscription</h2>
          <p className="text-center italic mb-6">
            Rejoignez-nous pour une compétition intense sur Valorant. Formez votre équipe et
            préparez-vous à prouver votre talent !
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">📅 Date du Belouga Tournament #2</h3>
              <p>29 et 30 mars 2025</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">🧑‍💻 Nombre de joueurs maximum :</h3>
              <p>40 joueurs (8 équipes de 5).</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">💡 Format d'inscription :</h3>
              <p>Inscription par équipe complète de 5 joueurs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">🎮 Jeu :</h3>
              <p>Valorant</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">📋 Format du tournoi :</h3>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Seeding :</strong> Classement des équipes basé sur le rang moyen
                  des membres.
                </li>
                <li>
                  <strong>Phases :</strong> Élimination directe avec un winner bracket et un
                  loser bracket.
                </li>
              </ul>
              <h3 className="text-lg font-semibold">🥇️ Le bracket</h3>
              <img src="/img/bracket.png" alt="Bracket du tournoi"/>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">⚠️ Important :</h3>
            <ul className="list-disc list-inside">
            <li>Assurez-vous de constituer une équipe complète avant de vous inscrire (si possible)</li>
              <li>Les inscriptions sont limitées aux 40 premières places.</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">🖊️ Comment s'inscrire ?</h3>
            <p>
              Fournissez les informations suivantes pour chaque joueur :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Votre pseudo</li>
              <li>Votre pseudo Discord</li>
              <li>Votre Riot ID</li>
              <li>Votre rang Valorant</li>
              <li>Votre nom d'équipe (ou sélectionnez dans la liste si déjà enregistrée).</li>
              <li>Votre chaîne Twitch (facultatif).</li>
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
          className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105 transition-all"
        >
          S'inscrire au tournoi
        </NavLink>

        <img src="/img/red-logo.png" alt="Logo" className="w-40"/>
      </div>
    </>
  );
};

export default Home;
