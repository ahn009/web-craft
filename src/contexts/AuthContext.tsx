import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { loginUser, registerUser } from '@/services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredAuth(): { user: User | null; token: string | null } {
  const storedToken = localStorage.getItem('auth_token');
  const storedUser = localStorage.getItem('auth_user');
  if (!storedToken || !storedUser) return { user: null, token: null };

  try {
    return { user: JSON.parse(storedUser) as User, token: storedToken };
  } catch {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState(getStoredAuth);
  const { user, token } = authState;
  const isLoading = false;

  const login = useCallback(async (email: string, password: string) => {
    const { user: userData, token: authToken } = await loginUser(email, password);
    setAuthState({ user: userData, token: authToken });
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    await registerUser(email, password, name);
  }, []);

  const logout = useCallback(() => {
    setAuthState({ user: null, token: null });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
