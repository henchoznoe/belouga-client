import { createContext, useState, useEffect, PropsWithChildren } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string;
  expiresAt: number;
  username: string;
  login: (token: string, expiresAt: number, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: PropsWithChildren) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<number>(0);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const localUsername: string | null = localStorage.getItem('username');
    const localToken: string | null = localStorage.getItem('token');
    const localExpiresAt: string | null = localStorage.getItem('expiresAt');

    if ( localUsername && localToken && localExpiresAt ) {
      if ( new Date().getTime() / 1000 < parseInt(localExpiresAt) ) {
        setIsAuthenticated(true);
        setToken(localToken);
        setUsername(localUsername)
      } else {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string, expiresAt: number, username: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    localStorage.setItem('expiresAt', expiresAt.toString());
    setToken(token);
    setExpiresAt(expiresAt);
    setUsername(username)
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
    setToken('');
    setExpiresAt(0);
    setUsername('')
    setIsAuthenticated(false);
  };

  if ( loading ) return <h1>Loading...</h1>;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, expiresAt, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
