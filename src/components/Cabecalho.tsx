import { Menu, X, Phone, Building2, Tag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalSettings } from '../hooks/useGlobalSettings';

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { data: settings } = useGlobalSettings();

  const navegacao = [
    { nome: 'Ver Todos os Projetos', href: '/catalogo', icone: Building2 },
    { nome: 'Promoção', href: '/promocoes', icone: Tag },
  ];

  // Show only logo while loading
  if (!settings) {
    return (
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Topo">
          <div className="flex h-14 sm:h-16 items-center">
            <div className="flex items-center">
              {settings?.logo && (
                <img 
                  src={settings.logo}
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
              )}
            </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Topo">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {settings?.logo ? (
                <img 
                  src={settings.logo}
                  alt="Logo"
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <Building2 className="h-8 w-8 text-primary-600" />
              )}
              <span className="ml-2 text-base sm:text-lg font-bold text-gray-900">ArqPronto</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navegacao.map((item) => (
              <Link
                key={item.nome}
                to={item.href}
                className="text-sm sm:text-base font-medium text-gray-500 hover:text-gray-900"
              >
                <span className="flex items-center">
                  <item.icone className="h-4 w-4 mr-1" />
                  {item.nome}
                </span>
              </Link>
            ))}
            <Link
              to="/contato"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-3 sm:px-4 py-2 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-primary-700"
            >
              Falar com Consultor
            </Link>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={() => setMenuAberto(!menuAberto)}
            >
              <span className="sr-only">Abrir menu principal</span>
              {menuAberto ? (
                <X className="block h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {menuAberto && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navegacao.map((item) => (
                <Link
                  key={item.nome}
                  to={item.href}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  onClick={() => setMenuAberto(false)}
                >
                  <item.icone className="h-4 w-4 mr-2" />
                  {item.nome}
                </Link>
              ))}
              <Link
                to="/contato"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                onClick={() => setMenuAberto(false)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Falar com Consultor
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}