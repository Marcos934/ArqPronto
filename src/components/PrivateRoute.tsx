import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const storedUser = localStorage.getItem('authUser');
      setHasSession(!!storedUser);
      setIsLoading(false);
    };

    checkSession();
  }, []);

  if (isLoading) {
    return null; // ou um componente de loading
  }

  if (!isAuthenticated && !hasSession) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}