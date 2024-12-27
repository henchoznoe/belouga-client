import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { EditTeamsType, GetTeamType, TeamsDataType } from "@/types/teams.ts";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { Alert, Spinner } from "flowbite-react";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { EditTeamFormData, editTeamSchema } from "@/schemas/teams.ts";

const EditTeamForm = () => {

  const { id: pk_team } = useParams();
  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm<EditTeamFormData>({
    resolver: zodResolver(editTeamSchema),
  });

  const [team, setTeam] = useState<TeamsDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const playerRes: GetTeamType = await send(1, 'GET', {
        params: `action=getTeam&pk_team=${pk_team}`,
        requireAuth: true
      });
      if ( playerRes.success ) {
        setTeam(playerRes.data);
        reset({
          name: playerRes.data.name,
          capacity: playerRes.data.capacity
        })
      }
    }
    fetchData();
  }, [pk_team, reset, send]);

  const editTeamHandler = async (data: EditTeamFormData) => {
    const dataToSend: any = {
      action: 'updateTeam',
      pk_team,
      ...data,
    };
    Object.keys(dataToSend).forEach((key) => {
      if ( dataToSend[key] === "null" || dataToSend[key] === "" ) dataToSend[key] = null;
    });
    const res: EditTeamsType = await send(2, 'PATCH', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( res.success ) {
      toast.success(`L'équipe ${res.data.name} a été modifiée`)
      navigate('/admin/teams');
    }
  };

  return (
    <>
      <AdminContainer title="Modifier">
        <BtnReturnTo to="/admin/teams"/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : team === null ? (
          <Alert color="yellow">L'équipe demandée n'a pas pu être récupérée</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit(editTeamHandler)}>
                <label>Nom</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Nom de l'équipe"
                  {...register('name')}
                />
                {formErrors.name && <span className="text-red-500">{formErrors.name?.message}</span>}

                <label>Taille</label>
                <input
                  type="number"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Capacité"
                  {...register('capacity', { valueAsNumber: true })}
                />
                {formErrors.capacity && <span className="text-red-500">{formErrors.capacity?.message}</span>}

                <button
                  className="py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
                  type="submit"
                  disabled={isLoading[3]}
                >
                  <span className="font-paladins">{isLoading[3] ? <Spinner color="gray"/> : 'Modifier'}</span>
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

export default EditTeamForm;
