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

interface EspecificacoesTecnicasProps {
  especificacoes: {
    areaTotal: number;
    larguraCasa: number;
    profundidadeCasa: number;
    areaTerreno: number;
    larguraTerreno: number;
    profundidadeTerreno: number;
  };
  areasInternas: {
    sala: number;
    cozinha: number;
    lavanderia: number;
    areaGourmet: number;
    banheiros: number;
  };
  tipo: 'residencial' | 'comercial';
  area: number; // Added to receive the área construída value
}

export default function EspecificacoesTecnicas({ 
  especificacoes, 
  areasInternas,
  tipo,
  area // Destructure the new prop
}: EspecificacoesTecnicasProps) {
  const formatarNomeArea = (chave: string) => {
    const mapeamento: Record<string, string> = {
      sala: tipo === 'comercial' ? 'Área Útil Total' : 'Sala',
      cozinha: tipo === 'comercial' ? 'Copa/Cozinha' : 'Cozinha',
      lavanderia: 'Área de Serviço',
      areaGourmet: tipo === 'comercial' ? 'Área de Convivência' : 'Área Gourmet',
      banheiros: 'Área de Banheiros'
    };

    return mapeamento[chave] || chave;
  };

  const getUnidade = (chave: string) => {
    // Keys that should use meters (m) instead of square meters (m²)
    const usarMetros = ['larguraCasa', 'profundidadeCasa', 'larguraTerreno', 'profundidadeTerreno'];
    return usarMetros.includes(chave) ? 'm' : 'm²';
  };

  const formatarLabel = (chave: string) => {
    const mapeamento: Record<string, string> = {
      areaTotal: 'Área Total',
      larguraCasa: 'Largura',
      profundidadeCasa: 'Profundidade',
      areaTerreno: 'Área do Terreno',
      larguraTerreno: 'Largura do Terreno',
      profundidadeTerreno: 'Profundidade do Terreno'
    };

    const label = mapeamento[chave] || chave
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());

    return label
      .replace('Casa', tipo === 'comercial' ? 'do Edifício' : 'da Casa')
      .replace('Terreno', 'do Terreno');
  };

  // Create a new object with the área total matching área construída
  const especificacoesAjustadas = {
    ...especificacoes,
    areaTotal: area // Use the área construída value for área total
  };

  return (
    <div className="space-y-8 px-2 sm:px-0">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dimensões do Projeto</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Object.entries(especificacoesAjustadas)
            .filter(([_, valor]) => valor > 0) // Only show items with values greater than 0
            .map(([chave, valor]) => (
              <div key={chave} className="bg-gray-50 p-4 rounded-lg">
                <span className="block text-sm text-gray-600">
                  {formatarLabel(chave)}
                </span>
                <span className="text-lg font-semibold">
                  {valor} {getUnidade(chave)}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          {tipo === 'comercial' ? 'Distribuição de Áreas' : 'Áreas Internas'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {Object.entries(areasInternas)
            .filter(([_, area]) => area > 0) // Only show items with values greater than 0
            .map(([espaco, area]) => (
              <div key={espaco} className="bg-gray-50 p-4 rounded-lg">
                <span className="block text-sm text-gray-600">
                  {formatarNomeArea(espaco)}
                </span>
                <span className="text-lg font-semibold">{area} m²</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}