export interface Admin {
  username: string;
  token: string; // JWT token
  expiresAt: number; // When the token expires
  permission: number; // 2 = SuperAdmin, 1 = Admin
}

export interface AuthContextType {
  isAuthenticated: boolean; // True if the user is logged in
  admin: Admin | null; // The logged-in user (also stored in localStorage)
  login: (admin: Admin) => void; // Login function
  logout: () => void; // Logout function
}
