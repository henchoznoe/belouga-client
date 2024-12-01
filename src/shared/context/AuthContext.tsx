import { createContext, useState, useEffect, PropsWithChildren } from 'react';

interface Admin {
  token: string;
  expiresAt: number;
  username: string;
  permission: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (admin: Admin) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const localAdmin = localStorage.getItem('admin');
    if ( localAdmin ) {
      const parsedAdmin = JSON.parse(localAdmin);
      if ( new Date().getTime() / 1000 < parsedAdmin.expiresAt ) {
        setAdmin(parsedAdmin);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (admin: Admin) => {
    localStorage.setItem('admin', JSON.stringify(admin));
    setAdmin(admin);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
    setIsAuthenticated(false);
  };

  if ( loading ) return <h1>Loading...</h1>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
