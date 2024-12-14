import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditPlayersType, GetPlayerType, PlayersDataType } from "@/types/players.ts";
import { GetTeamsType, TeamsDataType } from "@/types/teams.ts";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { Alert, Spinner } from "flowbite-react";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { EditPlayerFormData, editPlayerSchema } from "@/schemas/players.ts";

const EditPlayerForm = () => {

  const { id: pk_player } = useParams();
  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm<EditPlayerFormData>({
    resolver: zodResolver(editPlayerSchema),
  });
  const [player, setPlayer] = useState<PlayersDataType | null>(null);
  const [teams, setTeams] = useState<TeamsDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const playerRes: GetPlayerType = await send(1, 'GET', {
        params: `action=getPlayer&pk_player=${pk_player}`,
        requireAuth: true
      });
      if ( playerRes.success ) {
        setPlayer(playerRes.data);
        reset({
          username: playerRes.data.username,
          discord: playerRes.data.discord,
          twitch: playerRes.data.twitch?.toString(),
          pk_team: playerRes.data.fk_team?.toString()
        })
        const teamsRes: GetTeamsType = await send(2, 'GET', {
          params: 'action=getTeams',
          requireAuth: true
        });
        if ( teamsRes.success ) setTeams(teamsRes.data);
      }
    }
    fetchData();
  }, [pk_player, reset, send]);

  const editPlayerHandler = async (data: EditPlayerFormData) => {
    const dataToSend: any = {
      action: 'updatePlayer',
      pk_player,
      ...data
    };
    Object.keys(dataToSend).forEach(
      (key) => (dataToSend[key] === "null" || dataToSend[key] === '') && delete dataToSend[key]
    );
    const res: EditPlayersType = await send(3, 'PATCH', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( res.success ) {
      toast.success(`Le joueur ${res.data.username} a été modifié`)
      navigate('/admin/players');
    }
  };

  return (
    <>
      <AdminContainer title="Modifier">
        <BtnReturnTo to="/admin/players"/>
        {isLoading[1] || isLoading[2] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : errors[2] ? (
          <Alert color="red">Une erreur est survenue : {errors[2]}</Alert>
        ) : player === null ? (
          <Alert color="yellow">L'administrateur demandé n'a pas pu être récupéré</Alert>
        ) : teams.length === 0 ? (
          <Alert color="yellow">Aucune équipe trouvée.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit(editPlayerHandler)}>
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Nom d'utilisateur"
                  {...register('username')}
                />
                {formErrors.username && <span className="text-red-500">{formErrors.username?.message}</span>}

                <label>Discord</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Discord"
                  {...register('discord')}
                />
                {formErrors.discord && <span className="text-red-500">{formErrors.discord?.message}</span>}

                <label>Twitch</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Twitch"
                  {...register('twitch')}
                />
                {formErrors.twitch && <span className="text-red-500">{formErrors.twitch?.message}</span>}

                <label>Equipe</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...register('pk_team')}
                >
                  <option value="null">Facultatif</option>
                  {teams.map((team) => (
                    <option key={team.pk_team} value={team.pk_team}>{team.name}</option>
                  ))}
                </select>

                <button
                  className="py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
                  type="submit"
                  disabled={isLoading[3]}
                >
                  <span className="font-paladins">{isLoading[3] ? <Spinner color="gray"/> : 'Modifier'}</span>
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

export default EditPlayerForm;
