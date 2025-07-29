import { 
  Home,
  Ruler,
  BedDouble, 
  Bath,
  Car,
  DoorOpen,
  Utensils,
  Building,
  PaintBucket,
  ShowerHead
} from 'lucide-react';

interface CaracteristicasProjetoProps {
  detalhes: {
    quartos: number;
    suites: number;
    banheiros: number;
    vagas: number;
    closets: number;
    areaGourmet: boolean;
    pavimentos: number;
    andares: number;
    estilo: string;
  };
  area: number;
  terreno: {
    largura: number;
    profundidade: number;
  };
  tipo: 'residencial' | 'comercial';
}

export default function CaracteristicasProjeto({ detalhes, area, terreno, tipo }: CaracteristicasProjetoProps) {
  const caracteristicasResidenciais = [
    { 
      icone: Home, 
      valor: `${area}m²`, 
      label: 'Área Construída'
    },
    { 
      icone: Ruler, 
      valor: `${terreno.largura}x${terreno.profundidade}m`, 
      label: 'Terreno'
    },
    { 
      icone: Building, 
      valor: detalhes.pavimentos, 
      label: 'Pavimentos'
    },
    { 
      icone: BedDouble, 
      valor: detalhes.quartos, 
      label: 'Dormitórios'
    },
    { 
      icone: Bath, 
      valor: detalhes.suites, 
      label: 'Suítes'
    },
    { 
      icone: ShowerHead,
      valor: detalhes.banheiros, 
      label: 'Banheiros'
    },
    { 
      icone: Car, 
      valor: detalhes.vagas, 
      label: 'Vagas'
    },
    { 
      icone: DoorOpen, 
      valor: detalhes.closets, 
      label: 'Closets'
    },
    { 
      icone: Utensils, 
      valor: detalhes.areaGourmet ? 'Sim' : 'Não', 
      label: 'Área Gourmet'
    },
    {
      icone: PaintBucket,
      valor: detalhes.estilo,
      label: 'Estilo'
    }
  ];

  const caracteristicasComerciais = [
    { 
      icone: Building, 
      valor: `${area}m²`, 
      label: 'Área Construída'
    },
    { 
      icone: Ruler, 
      valor: `${terreno.largura}x${terreno.profundidade}m`, 
      label: 'Terreno'
    },
    { 
      icone: Building, 
      valor: detalhes.pavimentos, 
      label: 'Pavimentos'
    },
    { 
      icone: ShowerHead, 
      valor: detalhes.banheiros, 
      label: 'Banheiros'
    },
    { 
      icone: Car, 
      valor: detalhes.vagas, 
      label: 'Vagas'
    }
  ];

  const caracteristicas = tipo === 'comercial' ? caracteristicasComerciais : caracteristicasResidenciais;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 px-2 sm:px-0">
      {caracteristicas.map(({ icone: Icone, valor, label }) => (
        <div 
          key={label} 
          className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 p-3 sm:p-4 rounded-lg bg-gray-50 border border-gray-100 text-center sm:text-left"
        >
          <Icone className="h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="block text-base sm:text-lg font-semibold text-gray-900">
              {valor}
            </span>
            <span className="text-xs sm:text-sm text-gray-500">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}