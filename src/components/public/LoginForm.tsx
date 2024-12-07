import { useNavigate } from "react-router-dom";
import { useFetch } from "@/shared/hooks/useFetch.ts";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "@/schemas/login.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Alert, Spinner } from "flowbite-react";

const LoginForm = () => {

  const navigate = useNavigate();
  const { send, isLoading, errors } = useFetch();
  const authCtx = useAuth();
  const form = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const loginHandler = async (data: LoginFormData) => {
    const res = await send(1, 'POST', {
      body: JSON.stringify({ action: 'login', ...data })
    });
    if ( res.success ) {
      toast.success(`Bienvenue ${res.data.username}`)
      authCtx.login(res.data);
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-80 bg-zinc-700 px-6 py-5 rounded-2xl">
          <form className="flex flex-col gap-3" onSubmit={form.handleSubmit(loginHandler)}>
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              className="px-2 py-1 text-black rounded-md"
              placeholder="Nom d'utilisateur"
              {...form.register('username')}
            />
            {form.formState.errors.username && (
              <span className="text-red-500">{form.formState.errors.username?.message}</span>
            )}

            <label>Mot de passe</label>
            <input
              type="password"
              className="px-2 py-1 text-black rounded-md"
              placeholder="Mot de passe"
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <span className="text-red-500">{form.formState.errors.password?.message}</span>
            )}

            <button
              className="py-2 bg-zinc-500 hover:bg-zinc-600 rounded-md"
              type="submit"
              disabled={isLoading[1]}
            >
              <span className="font-paladins">{isLoading[1] ? <Spinner color="gray"/> : 'Se connecter'}</span>
            </button>

            {errors[1] && (
              <Alert color="red">{errors[1]}</Alert>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
