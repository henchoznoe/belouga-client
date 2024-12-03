import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useForm } from "react-hook-form";
import { EditAdminFormData, editAdminSchema } from "@/schemas/admins.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { AdminTypesDataType, GetAdminTypesType } from "@/types/adminTypes.ts";
import { toast } from "sonner";
import AdminContainer from "@components/global/AdminContainer.tsx";
import BtnReturnTo from "@components/buttons/BtnReturnTo.tsx";
import { Alert, Spinner } from "flowbite-react";
import { AdminsDataType, EditAdminsType, GetAdminType } from "@/types/admins.ts";

const EditAdminForm = () => {

  const { id: pk_admin } = useParams();
  const { send, isLoading, errors } = useFetch();
  const authCtx = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors: formErrors }, reset } = useForm<EditAdminFormData>({
    resolver: zodResolver(editAdminSchema),
  });
  const [admin, setAdmin] = useState<AdminsDataType | null>(null);
  const [adminTypes, setAdminTypes] = useState<AdminTypesDataType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const adminRes: GetAdminType = await send(1, 'GET', `action=getAdmin&pk_admin=${pk_admin}`, null, {
        Authorization: `Bearer ${authCtx.admin?.token}`
      });
      if ( adminRes.success ) {
        setAdmin(adminRes.data);
        reset({
          username: adminRes.data.username,
          pk_admin_type: adminRes.data.pk_admin_type.toString()
        })
        const adminTypesRes: GetAdminTypesType = await send(2, 'GET', 'action=getAdminTypes', null, {
          Authorization: `Bearer ${authCtx.admin?.token}`
        });
        if ( adminTypesRes.success ) setAdminTypes(adminTypesRes.data);
      }
    }
    fetchData();
  }, [authCtx.admin?.token, pk_admin, reset, send]);

  const editAdminHandler = async (data: EditAdminFormData) => {
    const res: EditAdminsType = await send(3, 'PUT', null, JSON.stringify({
      action: 'updateAdmin',
      pk_admin,
      ...data
    }), {
      Authorization: `Bearer ${authCtx.admin?.token}`
    });
    if ( res.success ) {
      toast.success(`L'utilisateur ${res.data.username} a été modifié`)
      navigate('/admin/admins');
    }
  };

  return (
    <>
      <AdminContainer title="Modifier">
        <BtnReturnTo to="/admin/admins"/>
        {isLoading[1] || isLoading[2] ? (
          <Alert color="gray">
            <Spinner color="gray"/> Données en cours de chargement...
          </Alert>
        ) : errors[1] ? (
          <Alert color="red">Une erreur est survenue : {errors[1]}</Alert>
        ) : errors[2] ? (
          <Alert color="red">Une erreur est survenue : {errors[2]}</Alert>
        ) : admin === null ? (
          <Alert color="yellow">L'administrateur demandé n'a pas pu être récupéré</Alert>
        ) : adminTypes.length === 0 ? (
          <Alert color="yellow">Aucun type d'administrateur trouvé.</Alert>
        ) : (
          <div className="flex justify-center">
            <div className="w-80 px-6 py-5 rounded-2xl">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit(editAdminHandler)}>
                <label>Nom d'utilisateur</label>
                <input
                  type="text"
                  className="px-2 py-1 text-black rounded-md"
                  placeholder="Nom d'utilisateur"
                  {...register('username')}
                />
                {formErrors.username && <span className="text-red-500">{formErrors.username?.message}</span>}

                <label>Rôle</label>
                <select
                  className="px-2 py-1 text-black rounded-md"
                  {...register('pk_admin_type')}
                >
                  {adminTypes.map((adminType) => (
                    <option key={adminType.pk_admin_type} value={adminType.pk_admin_type}>{adminType.label}</option>
                  ))}
                </select>
                {formErrors.pk_admin_type && <span className="text-red-500">{formErrors.pk_admin_type?.message}</span>}

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

export default EditAdminForm;
