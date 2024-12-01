import useAuth from "@/shared/hooks/useAuth.ts";
import AdminContainer from "@components/global/AdminContainer.tsx";

const Dashboard = () => {
  const authCtx = useAuth();

  return (
    <AdminContainer>
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-paladinsgrad">
            Bienvenue, {authCtx.admin?.username} 👋
          </h1>
          <h2 className="text-lg font-medium font-paladins">
            Rôle : {authCtx.admin?.permission === 2 ? "SuperAdmin" : "Admin"}
          </h2>
        </div>

        <div className="space-y-4">
          <p>
            Cette page est dédiée aux administrateurs du <span className="font-semibold">BelougaTournament</span>.
            Tu peux y gérer le tournoi et accéder aux fonctionnalités réservées aux administrateurs.
          </p>
          <div className="bg-zinc-500 p-4 rounded-md">
            <p className="font-semibold text-red-500">Problème ou bug ?</p>
            <p>
              Si tu rencontres des difficultés (impossible d'effectuer une action ou un bug bloquant),
              contacte l'équipe technique le plus rapidement possible :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <span className="font-semibold">Quentin (Organisateur du tournoi) :</span> 076 650 97 41
              </li>
              <li>
                <span className="font-semibold">Noé (Développeur du site web) :</span> 075 417 17 64
              </li>
            </ul>
          </div>

          <div>
            <p>
              Tu peux gérer les joueurs, les équipes, les matches et les autres administrateurs
              (si tu as le rôle de SuperAdmin). Utilise les sections correspondantes du menu pour naviguer.
            </p>
          </div>

          <div className="bg-zinc-500 p-4 rounded-md">
            <p className="font-semibold text-green-500">Suggestions :</p>
            <p>
              Une idée pour améliorer l'application web ? Nous sommes à l'écoute ! Partage tes suggestions
              avec Noé pour continuer à améliorer la qualité des tournois organisés par le grand maître Quentadou
              !
            </p>
          </div>

          <div className="flex justify-center">
            <img className="w-60" src="/img/red-logo.png" alt="Logo Belouga Tournament"/>
          </div>
        </div>
      </div>
    </AdminContainer>
  );
};

export default Dashboard;
