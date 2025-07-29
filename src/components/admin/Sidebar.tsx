import { Link, useLocation } from 'react-router-dom';
import { Building2, LogOut, Settings } from 'lucide-react';
import { useGlobalSettings } from '../../hooks/useGlobalSettings';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();
  const { data: settings } = useGlobalSettings();

  const navigation = [
    { name: 'Projetos', href: '/admin/projetos', icon: Building2 },
    { name: 'Configurações do Site', href: '/admin/configuracoes', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center h-16 px-4 border-b">
        <Link to="/admin" className="flex items-center">
          {settings?.logo ? (
            <img 
              src={settings.logo}
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
          ) : (
            <Building2 className="h-8 w-8 text-indigo-600" />
          )}
          <span className="ml-2 text-xl font-bold text-gray-900">ArqPronto</span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );
}