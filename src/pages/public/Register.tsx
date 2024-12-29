import Heading from "@components/global/Heading.tsx";
import RegisterPlayerForm from "@components/public/RegisterPlayerForm.tsx";
import TeamsList from "@components/public/TeamsList.tsx";
import { useEffect, useState } from "react";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { GetTeamsWithPlayersType, RegisterTeamDataType, TeamsWithPlayersDataType } from "@/types/register.ts";
import { Alert, Spinner } from "flowbite-react";
import RegisterTeamForm from "@components/public/RegisterTeamForm.tsx";

const Register = () => {

  const { send, isLoading, errors } = useFetch();

  const [teams, setTeams] = useState<TeamsWithPlayersDataType[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRes: GetTeamsWithPlayersType = await send(1, "GET", {
        params: 'action=getTeamsWithPlayers'
      });
      if ( teamsRes.success ) setTeams(teamsRes.data);
    }
    fetchTeams();
  }, [send]);

  const onTeamAdded = (addedTeam: RegisterTeamDataType) => {
    setTeams([...teams, {
      fk_team: addedTeam.pk_team, name: addedTeam.name,
      pk_player: 0,
      username: "",
      riot_username: "",
      discord: "",
      twitch: null,
      rank: ""
    }]);
  };

  const onPlayerAdded = (addedPlayer: TeamsWithPlayersDataType) => {
    setTeams(teams.map((team) => {
      if ( team.fk_team === addedPlayer.fk_team ) {
        return {
          fk_team: addedPlayer.fk_team,
          name: team.name,
          pk_player: addedPlayer.pk_player,
          username: addedPlayer.username,
          riot_username: addedPlayer.riot_username,
          discord: addedPlayer.discord,
          twitch: addedPlayer.twitch,
          rank: addedPlayer.rank
        };
      }
      return team;
    }));
  }

  return (
    <>
      <Heading title="Inscriptions"/>
      {isLoading[1] ? (
        <Alert color="gray">
          <Spinner color="gray"/> Chargement, veuillez patienter...
        </Alert>
      ) : errors[1] ? (
        <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
      ) : (
        <div className="flex flex-col px-2 gap-2 max-w-2xl mx-auto">
          <div className="bg-zinc-600 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Bienvenue sur les inscriptions</h2>
            <p>
              Ici, vous pouvez voir les équipes déjà inscrites ainsi que leurs joueurs.
              Pour vous inscrire, vous avez trois options :
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Créer une nouvelle équipe et vous y mettre dedans.</li>
              <li>Rejoindre une équipe déjà créée.</li>
              <li>S'inscrire sans équipe pour le moment (à éviter mais c'est possible)</li>
            </ul>
          </div>

          <div className="bg-zinc-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Équipes déjà inscrites</h3>
            <TeamsList teams={teams}/>
          </div>

          <div className="bg-zinc-600 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Créer une équipe (si besoin)</h3>
            <RegisterTeamForm onTeamAdded={onTeamAdded}/>
          </div>

          <div className="bg-zinc-600 p-6 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-4">Formulaire d'inscription</h3>
            <RegisterPlayerForm teams={teams} onPlayerAdded={onPlayerAdded}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
