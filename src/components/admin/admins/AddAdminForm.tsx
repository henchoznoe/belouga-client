import { Alert, Spinner } from "flowbite-react";
import { AddAdminsType } from "@/types/admins.ts";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AddAdminFormData, addAdminSchema } from "@/schemas/admins.ts";
import { useNavigate } from "react-router-dom";
import AdminContainer from "@components/global/AdminContainer.tsx";
import { useEffect, useState } from "react";
import { AdminTypesDataType, GetAdminTypesType } from "@/types/adminTypes.ts";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";

const AddAdminForm = () => {

  const { send, isLoading, errors } = useFetch();
  const navigate = useNavigate();
  const form = useForm<AddAdminFormData>({ resolver: zodResolver(addAdminSchema) });

  const [adminTypes, setAdminTypes] = useState<AdminTypesDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const adminTypesRes: GetAdminTypesType = await send(1, 'GET', {
        params: 'action=getAdminTypes',
        requireAuth: true
      });
      if ( adminTypesRes.success ) setAdminTypes(adminTypesRes.data);
    }
    fetchData()
  }, [send]);

  const addAdminHandler = async (data: AddAdminFormData) => {
    const dataToSend = Object.fromEntries(
      Object.entries({
        action: 'createAdmin',
        ...data,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, value]) => value !== '')
    );
    const adminsRes: AddAdminsType = await send(2, 'POST', {
      body: JSON.stringify(dataToSend),
      requireAuth: true
    });
    if ( adminsRes.success ) {
      toast.success(`L'administrateur ${adminsRes.data.username} a été ajouté`)
      navigate('/admin/admins');
    }
  };

  return (
    <>
      <AdminContainer title="Ajouter">
        <BtnReturnTo to="/admin/admins"/>
        {isLoading[1] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : adminTypes.length === 0 ? (
          <Alert color="yellow">Aucun type d'administrateur trouvé.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(addAdminHandler)}>
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Nom d'utilisateur"
                  {...form.register('username')}
                />
                {form.formState.errors.username &&
                  <span className="text-red-500">{form.formState.errors.username?.message}</span>}

                <label>Mot de passe</label>
                <input
                  type="password"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Mot de passe"
                  {...form.register('password')}
                />
                {form.formState.errors.password &&
                  <span className="text-red-500">{form.formState.errors.password?.message}</span>}

                <label>Rôle</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...form.register('fk_admin_type')}
                  defaultValue={adminTypes[0].pk_admin_type}
                >
                  {adminTypes.map((adminType) => (
                    <option key={adminType.pk_admin_type} value={adminType.pk_admin_type}>{adminType.label}</option>
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

export default AddAdminForm;
