import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import AdminContainer from "@components/global/AdminContainer.tsx";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { Alert, Spinner } from "flowbite-react";
import { AddTeamsType } from "@/types/teams.ts";
import { AddTeamFormData, addTeamSchema } from "@/schemas/teams.ts";

const AddTeamForm = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const form = useForm<AddTeamFormData>({ resolver: zodResolver(addTeamSchema) });

  const addTeamHandler = async (data: AddTeamFormData) => {
    const dataToSend = Object.fromEntries(
      Object.entries({
        action: 'createTeam',
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, value]) => value !== '')
    );
    const teamsRes: AddTeamsType = await send(1, 'POST', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( teamsRes.success ) {
      toast.success(`L'équipe ${teamsRes.data.name} a été ajoutée`)
      navigate('/admin/teams');
    }
  };

  return (
    <>
      <AdminContainer title="Ajouter">
        <BtnReturnTo to="/admin/teams"/>
        <div className="flex justify-center">
          <div className="w-80 px-6 py-5 rounded-2xl">
            <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(addTeamHandler)}>
              <label>Nom de l'équipe</label>
              <input
                type="text"
                className="px-2 py-1 text-black rounded-md"
                placeholder="Nom de l'équipe"
                {...form.register('name')}
              />
              {form.formState.errors.name &&
                <span className="text-red-500">{form.formState.errors.name?.message}</span>}

              <label>Capacité</label>
              <input
                type="number"
                className="px-2 py-1 text-black rounded-md"
                placeholder="Taille"
                {...form.register('capacity', { valueAsNumber: true })}
              />
              {form.formState.errors.capacity &&
                <span className="text-red-500">{form.formState.errors.capacity?.message}</span>}

              <button
                className="py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
                type="submit"
                disabled={isLoading[1]}
              >
                <span className="font-paladins">{isLoading[1] ? <Spinner color="gray"/> : 'Ajouter'}</span>
              </button>

              {errors[1] && (
                <Alert color="red">{errors[1]}</Alert>
              )}
            </form>
          </div>
        </div>
      </AdminContainer>
    </>
  );
}

export default AddTeamForm;
