import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GetTeamsType, TeamsDataType } from "@/types/teams.ts";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { Alert, Spinner } from "flowbite-react";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { EditMatchFormData, editMatchSchema } from "@/schemas/matches.ts";
import { EditMatchesType, GetMatchType, MatchesDataType } from "@/types/matches.ts";
import { GetRoundsType, RoundsDataType } from "@/types/rounds.ts";

const EditMatchForm = () => {

  const { id: pk_match } = useParams();
  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const form = useForm<EditMatchFormData>({
    resolver: zodResolver(editMatchSchema),
  });

  const [match, setMatch] = useState<MatchesDataType | null>(null);
  const [teams, setTeams] = useState<TeamsDataType[]>([]);
  const [rounds, setRounds] = useState<RoundsDataType[]>([]);

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
        if ( teamsRes.success ) {
          setTeams(teamsRes.data);
          const matchRes: GetMatchType = await send(3, 'GET', {
            params: `action=getMatch&pk_match=${pk_match}`,
            requireAuth: true
          });
          if ( matchRes.success ) {
            setMatch(matchRes.data);
            form.reset({
              fk_round: matchRes.data.fk_round.toString(),
              fk_team_one: matchRes.data.fk_team_one?.toString(),
              fk_team_two: matchRes.data.fk_team_two?.toString(),
              team_one_score: matchRes.data.score_team_one?.toString(),
              team_two_score: matchRes.data.score_team_two?.toString(),
              match_date: matchRes.data.match_date?.toString(),
              winner_team: matchRes.data.winner_team?.toString(),
            });
          }
        }
      }
    }
    fetchData();
  }, [pk_match, form.reset, send, form]);

  const editMatchHandler = async (data: EditMatchFormData) => {
    const dataToSend: any = {
      action: 'updateMatch',
      pk_match,
      ...data,
    };
    // Convert date to ISO string for Zurich timezone
    if ( dataToSend.match_date ) {
      const zurichDate = new Date(dataToSend.match_date);
      const finalDate = new Date(zurichDate.getTime() - zurichDate.getTimezoneOffset() * 60 * 1000);
      dataToSend.match_date = finalDate.toISOString();
    }
    Object.keys(dataToSend).forEach((key) => {
      if ( dataToSend[key] === "null" || dataToSend[key] === "" ) dataToSend[key] = null;
    });
    const res: EditMatchesType = await send(4, 'PATCH', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( res.success ) {
      toast.success(`Le match [${res.data.team_one_name} VS ${res.data.team_two_name}] a été modifié`);
      navigate('/admin/matches');
    }
  };

  return (
    <>
      <AdminContainer title="Modifier">
        <BtnReturnTo to="/admin/matches"/>
        {isLoading[1] || isLoading[2] || isLoading[3] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : errors[2] ? (
          <Alert color="red">Une erreur est survenue : {errors[2]}</Alert>
        ) : errors[3] ? (
          <Alert color="red">Une erreur est survenue : {errors[3]}</Alert>
        ) : match === null ? (
          <Alert color="yellow">Le match demandé n'a pas pu être récupéré</Alert>
        ) : teams.length === 0 ? (
          <Alert color="yellow">Aucune équipe trouvée.</Alert>
        ) : rounds.length === 0 ? (
          <Alert color="yellow">Aucun round trouvé.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(editMatchHandler)}>
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
                  <option value="null">Pas défini</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>
                <label>Equipe 2</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('fk_team_two')}
                >
                  <option value="null">Pas défini</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>

                <label>Score équipe 1</label>
                <input
                  type="number"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Score équipe 1"
                  {...form.register('team_one_score')}
                  defaultValue={0}
                />
                {form.formState.errors.team_one_score &&
                  <span className="text-red-500">{form.formState.errors.team_one_score?.message}</span>}
                <label>Score équipe 2</label>
                <input
                  type="number"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Score équipe 2"
                  {...form.register('team_two_score')}
                  defaultValue={0}
                />
                {form.formState.errors.team_two_score &&
                  <span className="text-red-500">{form.formState.errors.team_two_score?.message}</span>}

                <label>Date du match</label>
                <input
                  type="datetime-local"
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
                  disabled={isLoading[4]}
                >
                  <span className="font-paladins">{isLoading[4] ? <Spinner color="gray"/> : 'Modifier'}</span>
                </button>

                {errors[4] && (
                  <Alert color="red">{errors[4]}</Alert>
                )}
              </form>
            </div>
          </div>
        )}
      </AdminContainer>
    </>
  );
}

export default EditMatchForm;
