import useAuth from "@/shared/hooks/useAuth.ts";

const Dashboard = () => {

  const authCtx = useAuth();

  return (
    <>
      <p>Bienvenue {authCtx.admin?.username}</p>
      <p>Vous êtes connecté en tant que {authCtx.admin?.permission === 2 ? 'super-admin' : 'admin'}</p>
      <p>A FAIRE : Sur cette page administrateur, afficher des instructions pour gérer les admins, joueurs, équipes et
        matches du
        Belouga tournament.</p>
    </>
  );
}

export default Dashboard;
