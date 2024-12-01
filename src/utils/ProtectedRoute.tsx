import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "@/shared/hooks/useAuth.ts";

interface ProtectedRouteProps {
  requiredPermission: number;
}

const ProtectedRoute = ({ children, requiredPermission }: PropsWithChildren<ProtectedRouteProps>) => {

  const authCtx = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if ( !authCtx.isAuthenticated ) {
      navigate('/login', { replace: true });
      return;
    }

    if ( authCtx.admin && authCtx.admin.permission < requiredPermission ) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [authCtx.isAuthenticated, requiredPermission, authCtx.admin, navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
