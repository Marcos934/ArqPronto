import { useState } from 'react';
import { Building2 } from 'lucide-react';
import BannerCarousel from '../components/BannerCarousel';
import ProjectSection from '../components/ProjectSection';
import HowItWorks from '../components/HowItWorks';
import { useProjetos } from '../hooks/useProjetos';
import { isPromotionActive } from '../utils/promotionUtils';
import type { EstadoFiltro, Projeto } from '../types';

export default function Projetos() {
  const { projetos, isLoading } = useProjetos();
  const [filtros] = useState<EstadoFiltro>({
    termoBusca: '',
    tipo: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    areaMinima: '',
    areaMaxima: ''
  });

  // Get featured projects
  const projetosDestaque = projetos
    ?.filter(projeto => projeto.destaque)
    .slice(0, 6) ?? [];

  // Get promotional projects
  const projetosPromocao = projetos
    ?.filter(projeto => 
      projeto.promocao_ativa && 
      isPromotionActive(projeto.promocao_ativa, projeto.promocao_inicio, projeto.promocao_fim)
    )
    .slice(0, 6) ?? [];

  // Get recently added projects (limited to 3)
  const projetosRecentes = projetos
    ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-100 pt-16 pb-16">
        <div className="animate-pulse">
          <div className="h-[261px] md:h-[596px] max-w-[1255px] mx-auto bg-gray-200 rounded-lg" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
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
    <div className="flex-1 bg-gray-100">
      {/* Banner Section with adjusted spacing */}
      <div className="pt-20 pb-8">
        <BannerCarousel />
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <HowItWorks />

        <div className="mt-8">
          <div className="flex items-center space-x-2 mb-8">
            <Building2 className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Projetos Arquitetônicos</h1>
          </div>

          <div className="space-y-12">
            {/* Featured Projects */}
            {projetosDestaque.length > 0 && (
              <ProjectSection
                id="featured-projects"
                title="Projetos em Destaque"
                subtitle="Seleção especial de projetos"
                projects={projetosDestaque}
                type="featured"
                viewAllLink="/catalogo"
              />
            )}

            {/* Promotional Projects */}
            {projetosPromocao.length > 0 && (
              <ProjectSection
                id="promotional-projects"
                title="Projetos em Promoção"
                subtitle="Aproveite nossos descontos especiais"
                projects={projetosPromocao}
                type="promotional"
                viewAllLink="/promocoes"
              />
            )}

            {/* Recently Added Projects */}
            {projetosRecentes.length > 0 && (
              <ProjectSection
                id="recent-projects"
                title="Adicionados Recentemente"
                subtitle="Confira nossas últimas novidades"
                projects={projetosRecentes}
                type="recent"
                viewAllLink="/catalogo"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}