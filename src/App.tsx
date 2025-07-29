import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGlobalSettings } from './hooks/useGlobalSettings';
import { initializeFacebookPixel } from './utils/facebook-pixel';

// Site público
import Layout from './components/Layout';
import Projetos from './pages/Projetos';
import Catalogo from './pages/Catalogo';
import ProjetosPromocao from './pages/ProjetosPromocao';
import ProjetosRecentes from './pages/ProjetosRecentes';
import DetalhesProjeto from './pages/DetalhesProjeto';
import Contato from './pages/Contato';
import ScrollToTop from './components/ScrollToTop';
import MetaTags from './components/MetaTags';

// Área administrativa
import AdminLayout from './components/admin/Layout';
import AdminLogin from './pages/admin/Login';
import ProjetosList from './pages/admin/ProjetosList';
import ProjetoForm from './pages/admin/ProjetoForm';
import SiteSettings from './pages/admin/SiteSettings';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

// Configuração personalizada para o Toaster
const toasterConfig = {
  position: 'top-center',
  duration: 3000,
  style: {
    background: '#333',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '16px',
  },
  success: {
    style: {
      background: '#10B981',
    },
  },
  error: {
    style: {
      background: '#EF4444',
    },
  },
};

function AppContent() {
  const { data: settings } = useGlobalSettings();

  useEffect(() => {
    if (settings?.facebookPixelId) {
      initializeFacebookPixel(settings.facebookPixelId);
    }
  }, [settings?.facebookPixelId]);

  // Update favicon when logo changes
  useEffect(() => {
    if (settings?.logo) {
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        const newLink = document.createElement('link');
        newLink.rel = 'icon';
        document.head.appendChild(newLink);
      }
      link.href = settings.logo;
    }
  }, [settings?.logo]);

  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <MetaTags />
        <Toaster {...toasterConfig} />
        <Routes>
          {/* Site público */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Projetos />} />
            <Route path="catalogo" element={<Catalogo />} />
            <Route path="promocoes" element={<ProjetosPromocao />} />
            <Route path="recentes" element={<ProjetosRecentes />} />
            <Route path="projetos/:id" element={<DetalhesProjeto />} />
            <Route path="contato" element={<Contato />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<Navigate to="/admin/projetos" replace />} />
            <Route path="projetos" element={<ProjetosList />} />
            <Route path="projetos/novo" element={<ProjetoForm />} />
            <Route path="projetos/editar/:id" element={<ProjetoForm />} />
            <Route path="configuracoes" element={<SiteSettings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}