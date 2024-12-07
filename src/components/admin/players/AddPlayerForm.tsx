import { Alert, Spinner } from "flowbite-react";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { useEffect, useState } from "react";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { AddPlayerFormData, addPlayerSchema } from "@/schemas/players.ts";
import { GetTeamsType, TeamsDataType } from "@/types/teams.ts";
import { AddPlayersType } from "@/types/players.ts";

const AddPlayerForm = () => {

  const { send, isLoading, errors } = useFetch();
  const authCtx = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm<AddPlayerFormData>({
    resolver: zodResolver(addPlayerSchema),
  });
  const [teams, setTeams] = useState<TeamsDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const teamsRes: GetTeamsType = await send(1, 'GET', {
        params: 'action=getTeams',
        requireAuth: true
      });
      if ( teamsRes.success ) setTeams(teamsRes.data);
    }
    fetchData()
  }, [authCtx.admin?.token, send]);

  const addPlayerHandler = async (data: AddPlayerFormData) => {
    const dataToSend: any = {
      action: 'createPlayer',
      ...data
    };
    Object.keys(dataToSend).forEach(
      (key) => (dataToSend[key] === "null" || dataToSend[key] === '') && delete dataToSend[key]
    );
    const res: AddPlayersType = await send(2, 'POST', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( res.success ) {
      toast.success(`Le joueur ${res.data.username} a été ajouté`)
      navigate('/admin/players');
    }
  };

  return (
    <>
      <AdminContainer title="Ajouter">
        <BtnReturnTo to="/admin/players"/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : teams.length === 0 ? (
          <Alert color="yellow">Aucune équipe trouvée.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit(addPlayerHandler)}>
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
                  disabled={isLoading[2]}
                >
                  <span className="font-paladins">{isLoading[2] ? <Spinner color="gray"/> : 'Ajouter'}</span>
                </button>

                {errors[2] && (
                  <Alert color="red">{errors[2]}</Alert>
                )}
              </form>
            </div>
          </div>
        )}
      </AdminContainer>
    </>
  );
}

export default AddPlayerForm;
