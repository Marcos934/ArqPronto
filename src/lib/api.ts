import axios from 'axios';
import { supabase } from './supabase';
import { toast } from 'react-hot-toast';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Se o erro for 401 (não autorizado) e não for uma retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenta renovar a sessão
        const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshError) {
          throw refreshError;
        }

        if (session) {
          // Atualiza o token no header e refaz a requisição
          originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Se não conseguir renovar a sessão, faz logout
        await supabase.auth.signOut();
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
        toast.error('Sessão expirada. Por favor, faça login novamente.');
      }
    }

    return Promise.reject(error);
  }
);