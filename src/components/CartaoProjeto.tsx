import { Building2, BedDouble, Bath, Car, ChevronLeft, ChevronRight, Star, Tag, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isPromotionActive } from '../utils/promotionUtils';
import type { Projeto } from '../types/supabase';

interface CartaoProjetoProps {
  projeto: Projeto;
  onClick?: () => void;
  showPromotionalTag?: boolean;
  showFeaturedTag?: boolean;
  showNewTag?: boolean;
  forceShowTags?: boolean;
}

export default function CartaoProjeto({ 
  projeto, 
  onClick,
  showPromotionalTag,
  showFeaturedTag,
  showNewTag,
  forceShowTags = false
}: CartaoProjetoProps) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/projetos/${projeto.id}`);
    if (onClick) onClick();
  };

  const imagens = projeto.imagens?.length > 0 
    ? projeto.imagens 
    : ['https://via.placeholder.com/800x600?text=Sem+Imagem'];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imagens.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentImageIndex((prev) => (prev + 1) % imagens.length);
      } else {
        setCurrentImageIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const isPromoActive = isPromotionActive(
    projeto.promocao_ativa,
    projeto.promocao_inicio,
    projeto.promocao_fim
  );

  const shouldShowPromotionalTag = (showPromotionalTag || forceShowTags) && isPromoActive;
  const shouldShowFeaturedTag = (showFeaturedTag || forceShowTags) && projeto.destaque;
  const shouldShowNewTag = showNewTag || forceShowTags;

  const isNew = new Date(projeto.created_at).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] h-full flex flex-col cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative">
        <div 
          className="relative w-full aspect-[4/3] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {imagens.map((imagem, index) => (
            <img
              key={imagem}
              src={imagem}
              alt={`${projeto.titulo} - Imagem ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {imagens.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/75 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/75 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {imagens.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-white w-3' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Tags Container */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5">
          {shouldShowNewTag && isNew && (
            <div className="bg-emerald-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Novo</span>
            </div>
          )}
          {shouldShowPromotionalTag && (
            <div className="bg-red-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span>Promoção</span>
            </div>
          )}
          {shouldShowFeaturedTag && (
            <div className="bg-amber-500/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-medium text-white shadow-sm flex items-center gap-1">
              <Star className="h-3 w-3" />
              <span>Destaque</span>
            </div>
          )}
        </div>

        {/* Project Type Badge */}
        <div className="absolute bottom-2 left-2">
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            projeto.tipo === 'comercial'
              ? 'bg-primary-500/90 text-white'
              : 'bg-white/90 text-primary-700'
          } backdrop-blur-sm shadow-sm`}>
            {projeto.tipo === 'comercial' ? 'Comercial' : 'Residencial'}
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-1.5 sm:mb-2 line-clamp-2">
          {projeto.titulo}
        </h3>

        {/* Price Section */}
        {projeto.tipo !== 'comercial' && (
          <div className="mb-2 sm:mb-3">
            {isPromoActive && projeto.preco_promocional ? (
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm line-through text-gray-400">
                  De {formatador.format(projeto.preco)}
                </span>
                <span className="text-base sm:text-lg font-bold text-red-600">
                  Por {formatador.format(projeto.preco_promocional)}
                </span>
              </div>
            ) : projeto.preco > 0 && (
              <span className="text-base sm:text-lg font-semibold text-gray-900">
                {formatador.format(projeto.preco)}
              </span>
            )}
          </div>
        )}

        {/* Project Description */}
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-3 sm:mb-4 flex-1">
          {projeto.descricao}
        </p>

        {/* Project Details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
          {projeto.tipo === 'residencial' ? (
            <>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2">
                <BedDouble className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.detalhes.quartos}</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2">
                <Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.detalhes.banheiros}</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2">
                <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.detalhes.vagas}</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.area}m²</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2 col-span-2">
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.area}m²</span>
              </div>
              <div className="flex items-center justify-center bg-gray-50 rounded-lg p-1.5 sm:p-2 col-span-2">
                <Car className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
                <span>{projeto.detalhes.vagas} vagas</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}