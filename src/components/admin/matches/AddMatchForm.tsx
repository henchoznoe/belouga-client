import { Alert, Spinner } from "flowbite-react";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { useEffect, useState } from "react";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { GetTeamsType, TeamsDataType } from "@/types/teams.ts";
import { GetRoundsType, RoundsDataType } from "@/types/rounds.ts";
import { AddMatchesType } from "@/types/matches.ts";
import { AddMatchFormData, addMatchSchema } from "@/schemas/matches.ts";

const AddMatchForm = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const form = useForm<AddMatchFormData>({ resolver: zodResolver(addMatchSchema) });

  const [rounds, setRounds] = useState<RoundsDataType[]>([]);
  const [teams, setTeams] = useState<TeamsDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const roundsRes: GetRoundsType = await send(1, 'GET', {
        params: 'action=getRounds',
        requireAuth: true
      });
      if ( roundsRes.success ) {
        setRounds(roundsRes.data);
        const teamsRes: GetTeamsType = await send(2, 'GET', {
          params: 'action=getTeams',
          requireAuth: true
        });
        if ( teamsRes.success ) setTeams(teamsRes.data);
      }
    }
    fetchData()
  }, [send]);

  const addMatchHandler = async (data: AddMatchFormData) => {
    const dataToSend = Object.fromEntries(
      Object.entries({
        action: 'createMatch',
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, value]) => value !== '')
    );
    const res: AddMatchesType = await send(3, 'POST', {
      body: JSON.stringify(dataToSend),
      requireAuth: true,
    });

    if ( res.success ) {
      toast.success(`Le match [${res.data.team_one_name} VS ${res.data.team_two_name}] a été ajouté`);
      navigate('/admin/matches');
    }
  };

  return (
    <>
      <AdminContainer title="Ajouter">
        <BtnReturnTo to="/admin/matches"/>
        {isLoading[1] || isLoading[2] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : errors[2] ? (
          <Alert color="red">Une erreur est survenue : {errors[2]}</Alert>
        ) : rounds.length === 0 ? (
          <Alert color="yellow">Aucun round trouvé.</Alert>
        ) : teams.length === 0 ? (
          <Alert color="yellow">Aucune équipe trouvée.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(addMatchHandler)}>
                <label>Round*</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('fk_round')}
                  defaultValue={rounds[0].pk_round}
                >
                  {rounds.map((round) => (
                    <option key={round.pk_round} value={round.pk_round}>{round.label}</option>
                  ))}
                </select>

                <label>Equipe 1</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('fk_team_one')}
                >
                  <option value="">Aucune</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>
                <label>Equipe 2</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('fk_team_two')}
                >
                  <option value="">Aucune</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>

                <label>Score équipe 1</label>
                <input
                  type="number"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Score équipe 1"
                  {...form.register('team_one_score', { valueAsNumber: true })}
                  defaultValue={0}
                />
                {form.formState.errors.team_one_score &&
                  <span className="text-red-500">{form.formState.errors.team_one_score?.message}</span>}
                <label>Score équipe 2</label>
                <input
                  type="number"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Score équipe 2"
                  {...form.register('team_two_score', { valueAsNumber: true })}
                  defaultValue={0}
                />
                {form.formState.errors.team_two_score &&
                  <span className="text-red-500">{form.formState.errors.team_two_score?.message}</span>}

                <label>Date du match</label>
                <input
                  type="date"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Date du match"
                  {...form.register('match_date')}
                />
                {form.formState.errors.match_date &&
                  <span className="text-red-500">{form.formState.errors.match_date?.message}</span>}

                <label>Vainqueur</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('winner_team')}
                >
                  <option value="">Aucune</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>

                <button
                  className="py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
                  type="submit"
                  disabled={isLoading[3]}
                >
                  <span className="font-paladins">{isLoading[3] ? <Spinner color="gray"/> : 'Ajouter'}</span>
                </button>

                {errors[3] && (
                  <Alert color="red">{errors[3]}</Alert>
                )}
              </form>
            </div>
          </div>
        )}
      </AdminContainer>
    </>
  );
}

export default AddMatchForm;
