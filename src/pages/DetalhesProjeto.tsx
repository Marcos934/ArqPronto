import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import CartaoProjeto from '../components/CartaoProjeto';
import CarrosselImagens from '../components/CarrosselImagens';
import CaracteristicasProjeto from '../components/CaracteristicasProjeto';
import EspecificacoesTecnicas from '../components/EspecificacoesTecnicas';
import ContatoWhatsAppModal from '../components/ContatoWhatsAppModal';
import { useProjetoById } from '../hooks/useProjetoById';
import { useProjetos } from '../hooks/useProjetos';
import { isPromotionActive } from '../utils/promotionUtils';
import { splitIncludedItems } from '../utils/formatters';

export default function DetalhesProjeto() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);

  const { data: projeto, isLoading } = useProjetoById(id!);
  const { projetos } = useProjetos();

  if (isLoading) {
    return (
      <div className="flex-1 bg-white pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {/* Skeleton for main image */}
            <div className="h-[600px] bg-gray-200 rounded-xl"></div>
            
            {/* Skeleton for title and description */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            
            {/* Skeleton for characteristics */}
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Projeto não encontrado</h2>
          <p className="mt-2 text-gray-600">O projeto que você está procurando não existe.</p>
        </div>
      </div>
    );
  }

  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const projetosRelacionados = projetos
    ?.filter((p) => p.id !== projeto.id && p.tipo === projeto.tipo)
    .slice(0, 6) ?? [];

  const handleProjetoClick = (projetoId: string) => {
    navigate(`/projetos/${projetoId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const includedItems = splitIncludedItems(projeto.inclusos);

  return (
    <div className="flex-1 bg-white pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Informações Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            <CarrosselImagens imagens={projeto.imagens} titulo={projeto.titulo} />
          </div>

          {/* Coluna Lateral */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-gray-900">{projeto.titulo}</h1>
                <p className="mt-4 text-gray-600">{projeto.descricao}</p>
                
                {projeto.tipo === 'residencial' && (
                  <div className="mt-6">
                    {isPromotionActive(
                      projeto.promocao_ativa,
                      projeto.promocao_inicio,
                      projeto.promocao_fim
                    ) && projeto.preco_promocional ? (
                      <div className="space-y-1">
                        <span className="text-sm line-through text-gray-400">
                          De {formatador.format(projeto.preco)}
                        </span>
                        <span className="block text-3xl font-bold text-red-600">
                          Por {formatador.format(projeto.preco_promocional)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold text-gray-900">
                        {formatador.format(projeto.preco)}
                      </span>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setModalAberto(true)}
                  className="mt-8 flex items-center justify-center w-full px-6 py-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  Falar sobre este projeto
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Características e Especificações */}
        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl font-semibold mb-6 px-2 sm:px-0">Características</h2>
          <CaracteristicasProjeto 
            detalhes={projeto.detalhes} 
            area={projeto.area}
            terreno={{
              largura: projeto.especificacoes_tecnicas.larguraTerreno,
              profundidade: projeto.especificacoes_tecnicas.profundidadeTerreno
            }}
            tipo={projeto.tipo}
          />
        </div>

        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl font-semibold mb-6 px-2 sm:px-0">Especificações Técnicas</h2>
          <EspecificacoesTecnicas 
            especificacoes={projeto.especificacoes_tecnicas}
            areasInternas={projeto.areas_internas}
            tipo={projeto.tipo}
            area={projeto.area}
          />
        </div>

        <div className="mt-12 lg:mt-16">
          <h2 className="text-xl font-semibold mb-6 px-2 sm:px-0">O que está incluso?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-2 sm:px-0">
            {includedItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl"
              >
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projetos Similares */}
        {projetosRelacionados.length > 0 && (
          <div className="mt-16 lg:mt-24 border-t pt-16">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Projetos Similares</h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore outros projetos que podem te interessar
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projetosRelacionados.map((projeto) => (
                <div key={projeto.id} onClick={() => handleProjetoClick(projeto.id)} className="cursor-pointer">
                  <CartaoProjeto 
                    projeto={projeto}
                    showPromotionalTag={projeto.promocao_ativa && isPromotionActive(
                      projeto.promocao_ativa,
                      projeto.promocao_inicio,
                      projeto.promocao_fim
                    )}
                    showFeaturedTag={projeto.destaque}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ContatoWhatsAppModal
        projeto={projeto}
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />
    </div>
  );
}