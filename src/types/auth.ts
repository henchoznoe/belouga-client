export interface Admin {
  token: string;
  expiresAt: number;
  username: string;
  permission: number;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  admin: Admin | null;
  login: (admin: Admin) => void;
  logout: () => void;
}
