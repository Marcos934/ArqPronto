import { Building2 } from 'lucide-react';

export default function Dashboard() {
  const stats = {
    totalProjetos: 6,
    projetosAtivos: 6
  };

  const cards = [
    {
      title: 'Total de Projetos',
      value: stats.totalProjetos,
      icon: Building2,
      color: 'bg-blue-500'
    },
    {
      title: 'Projetos Ativos',
      value: stats.projetosAtivos,
      icon: Building2,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">DASHBOARD TerraraProjetos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}