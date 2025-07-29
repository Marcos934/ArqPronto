import { useState } from 'react';
import { Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartaoProjeto from '../components/CartaoProjeto';
import FiltrosProjeto from '../components/FiltrosProjeto';
import Paginacao from '../components/Paginacao';
import { useProjetos } from '../hooks/useProjetos';
import { isPromotionActive } from '../utils/promotionUtils';
import type { EstadoFiltro } from '../types';

const PROJETOS_POR_PAGINA = 12;

export default function ProjetosRecentes() {
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

  // Sort projects by date
  const projetosOrdenados = [...(projetos ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Get the three most recent projects
  const projetosRecentes = projetosOrdenados.slice(0, 3);
  const demaisProjetos = projetosOrdenados.slice(3);

  const projetosFiltrados = [...projetosRecentes, ...demaisProjetos.filter((projeto) => {
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
  })];

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
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-10 w-10 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Projetos Recentes</h1>
                <p className="mt-2 text-emerald-100">
                  Confira nossas últimas novidades
                </p>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center text-white hover:text-emerald-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Voltar para Home
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FiltrosProjeto aoMudarFiltro={setFiltros} />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projetosPaginados.map((projeto, index) => (
                <CartaoProjeto 
                  key={projeto.id} 
                  projeto={projeto}
                  showNewTag={index < 3}
                  showPromotionalTag={projeto.promocao_ativa && isPromotionActive(
                    projeto.promocao_ativa,
                    projeto.promocao_inicio,
                    projeto.promocao_fim
                  )}
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
    </div>
  );
}