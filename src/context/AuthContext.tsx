import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AuthService } from '../services/auth.service';

export interface IUser {
  id: string;
  username: string;
  email: string;
  role: 'administrator' | 'user';
}

interface AuthContextType {
  loading: boolean;
  user: IUser | null;

  login: (token: string) => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);

      return;
    }

    try {
      const me = await AuthService.me();

      setUser(me);
    } catch {
      localStorage.removeItem('token');
    }

    setLoading(false);
  }

  async function login(token: string) {
    localStorage.setItem('token', token);

    const me = await AuthService.me();

    setUser(me);
  }

  function logout() {
    localStorage.removeItem('token');

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
