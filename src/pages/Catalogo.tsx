import { useState } from 'react';
import { Building2, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartaoProjeto from '../components/CartaoProjeto';
import FiltrosProjeto from '../components/FiltrosProjeto';
import Paginacao from '../components/Paginacao';
import { useProjetos } from '../hooks/useProjetos';
import { isPromotionActive } from '../utils/promotionUtils';
import type { EstadoFiltro } from '../types';

const PROJETOS_POR_PAGINA = 12;

export default function Catalogo() {
  const { projetos, isLoading } = useProjetos();
  const [filtros, setFiltros] = useState<EstadoFiltro>({
    termoBusca: '',
    tipo: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    areaMinima: '',
    areaMaxima: ''
  });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltroChange = (novosFiltros: EstadoFiltro) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const projetosFiltrados = (projetos ?? []).filter((projeto) => {
    if (filtros.termoBusca) {
      const termoBusca = filtros.termoBusca.toLowerCase();
      if (!projeto.titulo.toLowerCase().includes(termoBusca) && 
          !projeto.descricao.toLowerCase().includes(termoBusca)) {
        return false;
      }
    }

    if (filtros.tipo && projeto.tipo !== filtros.tipo) return false;
    if (filtros.areaMinima && projeto.area < parseInt(filtros.areaMinima)) return false;
    if (filtros.areaMaxima && projeto.area > parseInt(filtros.areaMaxima)) return false;

    if (projeto.tipo === 'residencial') {
      if (filtros.quartos && projeto.detalhes.quartos < parseInt(filtros.quartos)) return false;
      if (filtros.banheiros && projeto.detalhes.banheiros < parseInt(filtros.banheiros)) return false;
      if (filtros.vagas && projeto.detalhes.vagas < parseInt(filtros.vagas)) return false;
    }

    return true;
  });

  const totalPaginas = Math.ceil(projetosFiltrados.length / PROJETOS_POR_PAGINA);
  const projetosPaginados = projetosFiltrados.slice(
    (paginaAtual - 1) * PROJETOS_POR_PAGINA,
    paginaAtual * PROJETOS_POR_PAGINA
  );

  const handlePaginaChange = (novaPagina: number) => {
    setPaginaAtual(novaPagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-100 pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg aspect-[4/3]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-100 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Todos os Projetos</h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-primary-100">
                  Encontre o projeto ideal para sua construção
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center text-white hover:text-primary-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Voltar</span>
              </Link>
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block">
            <FiltrosProjeto aoMudarFiltro={handleFiltroChange} />
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projetosPaginados.map((projeto) => (
                <CartaoProjeto 
                  key={projeto.id} 
                  projeto={projeto}
                  forceShowTags={true}
                />
              ))}
            </div>

            {projetosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Nenhum projeto encontrado
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Tente ajustar seus critérios de busca ou filtros
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <Paginacao
                  paginaAtual={paginaAtual}
                  totalPaginas={totalPaginas}
                  aoMudarPagina={handlePaginaChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters - Mobile */}
      <div className="lg:hidden">
        <FiltrosProjeto 
          aoMudarFiltro={handleFiltroChange}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />
      </div>
    </div>
  );
}