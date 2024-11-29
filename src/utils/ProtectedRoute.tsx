import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "@/shared/hooks/useAuth.ts";

const ProtectedRoute = ({ children }: PropsWithChildren) => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if ( !isAuthenticated ) navigate('/login', { replace: true });
  }, [navigate, isAuthenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
