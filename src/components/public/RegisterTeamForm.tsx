import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { RegisterTeamFormData, registerTeamSchema } from "@/schemas/register.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { RegisterTeamDataType, RegisterTeamType } from "@/types/register.ts";
import { Alert, Spinner } from "flowbite-react";

type RegisterTeamFormProps = {
  onTeamAdded: (addedTeam: RegisterTeamDataType) => void;
}

const RegisterTeamForm = (props: RegisterTeamFormProps) => {

  const { send, isLoading, errors } = useFetch();
  const form = useForm<RegisterTeamFormData>({ resolver: zodResolver(registerTeamSchema) });

  const registerTeamHandler = async (data: RegisterTeamFormData) => {
    const dataToSend: any = {
      action: 'registerTeam',
      ...data
    };
    Object.keys(dataToSend).forEach((key) => {
      if ( dataToSend[key] === "null" || dataToSend[key] === "" ) dataToSend[key] = null;
    });
    const res: RegisterTeamType = await send(1, 'POST', {
      body: JSON.stringify(dataToSend)
    });

    if ( res.success ) {
      toast.success(`L'équipe ${res.data.name} a bien été créée`);
      form.reset();
      props.onTeamAdded(res.data);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(registerTeamHandler)}>
        <label>Nom de l'équipe*</label>
        <input
          type="text"
          className="px-2 py-1 text-black rounded-md"
          placeholder="Nom de l'équipe"
          {...form.register('name')}
        />
        {form.formState.errors.name &&
          <span className="text-red-700">{form.formState.errors.name?.message}</span>}

        <button
          className="py-2 bg-zinc-500 hover:bg-zinc-700 rounded-md"
          type="submit"
          disabled={isLoading[1]}
        >
          <span className="font-paladins">{isLoading[1] ? <Spinner color="gray"/> : 'Créer'}</span>
        </button>

        {errors[1] && (
          <Alert color="red">{errors[1]}</Alert>
        )}
      </form>
    </>
  );
}

export default RegisterTeamForm;
