import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import type { User, AuthError } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Tenta recuperar o usuário do localStorage ao inicializar
    const storedUser = localStorage.getItem('authUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verifica e restaura a sessão ao montar o componente
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('authUser', JSON.stringify(session.user));
      }
    };

    initializeAuth();

    // Escuta mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        localStorage.setItem('authUser', JSON.stringify(session.user));
      } else {
        setUser(null);
        localStorage.removeItem('authUser');
      }
      
      // Handle token refresh
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token refreshed successfully');
      }
      
      // Handle signed out
      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('authUser');
        navigate('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleAuthError = (error: AuthError) => {
    switch (error.message) {
      case 'Invalid login credentials':
        toast.error('Email ou senha inválidos');
        break;
      case 'Email not confirmed':
        toast.error('Por favor, confirme seu email antes de fazer login');
        break;
      default:
        toast.error('Erro ao realizar login. Tente novamente.');
    }
    throw error;
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      if (data.user) {
        setUser(data.user);
        localStorage.setItem('authUser', JSON.stringify(data.user));
        
        // Redirect to the previous page or default to admin
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
        toast.success('Login realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      handleAuthError(error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('authUser');
      navigate('/admin/login');
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erro ao realizar logout');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}