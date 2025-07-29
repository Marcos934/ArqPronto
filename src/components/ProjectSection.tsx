import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CartaoProjeto from './CartaoProjeto';
import type { Projeto } from '../types/supabase';

interface ProjectSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  projects: Projeto[];
  viewAllLink?: string;
  type?: 'promotional' | 'featured' | 'recent';
}

export default function ProjectSection({
  id,
  title,
  subtitle,
  projects,
  viewAllLink,
  type = 'featured'
}: ProjectSectionProps) {
  if (!projects?.length) return null;

  const getViewAllText = () => {
    switch (type) {
      case 'promotional':
        return 'Ver todas as promoções';
      case 'recent':
        return 'Ver todos os projetos';
      default:
        return 'Ver todos os projetos';
    }
  };

  return (
    <section id={id} className="py-8 scroll-mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-1 text-gray-500">{subtitle}</p>
          )}
        </div>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            {getViewAllText()}
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <CartaoProjeto 
            key={project.id} 
            projeto={project}
            showPromotionalTag={type === 'promotional'}
            showFeaturedTag={type === 'featured'}
            showNewTag={type === 'recent'}
          />
        ))}
      </div>

      {viewAllLink && (
        <div className="mt-8 text-center">
          <Link
            to={viewAllLink}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            {getViewAllText()}
            <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>
      )}
    </section>
  );
}