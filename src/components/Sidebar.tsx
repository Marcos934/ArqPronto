import { Link, useLocation } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navigation = [
    { name: 'Projetos', href: '/projetos', icon: Building2 },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r">
      <div className="flex items-center h-16 px-4 border-b">
        <Link to="/" className="flex items-center">
          <Building2 className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Dashboard</span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
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
    </div>
  );
}