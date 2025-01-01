import { RegisterPlayerType, TeamsWithPlayersDataType } from "@/types/register.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPlayerFormData, registerPlayerSchema, } from "@/schemas/register.ts";
import { toast } from "sonner";
import { Alert, Spinner } from "flowbite-react";

type SignUpFormProps = {
  teams: TeamsWithPlayersDataType[];
  onPlayerAdded: (addedPlayer: TeamsWithPlayersDataType) => void;
}

const RegisterPlayerForm = (props: SignUpFormProps) => {

  const { send, isLoading, errors } = useFetch();
  const form = useForm<RegisterPlayerFormData>({ resolver: zodResolver(registerPlayerSchema) });

  const registerPlayerHandler = async (data: RegisterPlayerFormData) => {
    const dataToSend: any = {
      action: 'registerPlayer',
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
      props.onPlayerAdded(res.data);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(registerPlayerHandler)}>
        <label>Pseudo*</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="Nom d'utilisateur"
          {...form.register('username')}
        />
        {form.formState.errors.username &&
          <span className="text-red-500">{form.formState.errors.username?.message}</span>}

        <label>Discord*</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="Discord"
          {...form.register('discord')}
        />
        {form.formState.errors.discord &&
          <span className="text-red-500">{form.formState.errors.discord?.message}</span>}

        <label>Riot ID*</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="Riot ID"
          {...form.register('riot_username')}
        />
        {form.formState.errors.riot_username &&
          <span className="text-red-500">{form.formState.errors.riot_username?.message}</span>}

        <label>URL Twitch</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="https://twitch.tv/xxx"
          {...form.register('twitch')}
        />
        {form.formState.errors.twitch &&
          <span className="text-red-500">{form.formState.errors.twitch?.message}</span>}

        <label>Rang Valo*</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="Rang Valorant"
          {...form.register('rank')}
        />
        {form.formState.errors.rank &&
          <span className="text-red-500">{form.formState.errors.rank?.message}</span>}

        <label>Equipe</label>
        <select
          className="px-2 py-1 text-black rounded-md"
          {...form.register('fk_team')}
        >
          <option value="null">Aucune</option>
          {props.teams
            .filter((team) => team.name)
            .reduce((uniqueTeams: TeamsWithPlayersDataType[], currentTeam) => {
              if ( !uniqueTeams.some((team) => team.fk_team === currentTeam.fk_team) ) {
                uniqueTeams.push(currentTeam);
              }
              return uniqueTeams;
            }, [])
            .map((team) => (
              <option key={team.fk_team} value={team.fk_team!}>
                {team.name}
              </option>
            ))}
          {props.teams.filter((team) => team.name).length === 0 && (
            <option disabled>Aucune équipe trouvée</option>
          )}
        </select>

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
    </>
  );
}

export default RegisterPlayerForm;
