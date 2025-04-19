import Heading from "@components/global/Heading.tsx";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { RegisterPlayerType } from "@/types/register.ts";
import { Alert, Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import { RegisterPlayerFormDataT, registerPlayerSchemaT } from "@/schemas/register.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {

  const { send, isLoading, errors } = useFetch();

  /*const [teams, setTeams] = useState<TeamsWithPlayersDataType[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const teamsRes: GetTeamsWithPlayersType = await send(1, "GET", {
        params: 'action=getTeamsWithPlayers'
      });
      if ( teamsRes.success ) setTeams(teamsRes.data);
    }
    fetchTeams();
  }, [send]);*/

  /*const onTeamAdded = (addedTeam: RegisterTeamDataType) => {
    setTeams([...teams, {
      fk_team: addedTeam.pk_team, name: addedTeam.name,
      pk_player: 0,
      username: "",
      riot_username: "",
      discord: "",
      twitch: null,
      rank: ""
    }]);
  };*/

  /*const onPlayerAdded = (addedPlayer: TeamsWithPlayersDataType) => {
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
  }*/

  const form = useForm<RegisterPlayerFormDataT>({ resolver: zodResolver(registerPlayerSchemaT) });
  const navigate = useNavigate();

  const registerPlayerHandler = async (data: RegisterPlayerFormDataT) => {
    const dataToSend: any = {
      action: 'registerPlayerTrackmania',
      ...data
    };
    Object.keys(dataToSend).forEach((key) => {
      if ( dataToSend[key] === "null" || dataToSend[key] === "" ) dataToSend[key] = null;
    });
    const res: RegisterPlayerType = await send(1, 'POST', {
      body: JSON.stringify(dataToSend)
    });

    if ( res.success ) {
      toast.success(`Super ! Votre inscription a bien été prise en compte`);
      form.reset();
      navigate('/');
    }
  }

  return (
    <>
      <Heading title="Inscriptions"/>
      <div className="bg-zinc-600 p-6 rounded-lg mb-4 container mx-auto">

        <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(registerPlayerHandler)}>
          <label>Pseudo</label>
          <input
            type="text"
            className="px-2 py-1 text-black rounded-md"
            placeholder="Nom d'utilisateur"
            {...form.register('username')}
          />
          {form.formState.errors.username &&
            <span className="text-red-500">{form.formState.errors.username?.message}</span>}

          <label>Discord</label>
          <input
            type="text"
            className="px-2 py-1 text-black rounded-md"
            placeholder="Discord"
            {...form.register('discord')}
          />
          {form.formState.errors.discord &&
            <span className="text-red-500">{form.formState.errors.discord?.message}</span>}

          <label>URL Twitch</label>
          <input
            type="text"
            className="px-2 py-1 text-black rounded-md"
            placeholder="https://twitch.tv/xxx"
            {...form.register('twitch')}
          />
          {form.formState.errors.twitch &&
            <span className="text-red-500">{form.formState.errors.twitch?.message}</span>}

          <button
            className="py-2 bg-zinc-500 hover:bg-zinc-700 rounded-md"
            type="submit"
            disabled={isLoading[1]}
          >
            <span className="font-paladins">{isLoading[1] ? <Spinner color="gray"/> : 'S\'inscrire'}</span>
          </button>

          {errors[1] && (
            <Alert color="red">{errors[1]}</Alert>
          )}
        </form>
      </div>
      {/*{isLoading[1] ? (
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
      )}*/}
    </>
  );
}

export default Register;
