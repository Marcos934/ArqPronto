import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Projeto } from '../types/supabase';

export function useProjetoById(id: string) {
  return useQuery({
    queryKey: ['projeto', id],
    enabled: !!id,
    staleTime: 0, // Sempre busca dados frescos
    cacheTime: 0, // Não mantém cache
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projetos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Erro ao buscar projeto:', error);
        throw error;
      }

      if (!data) {
        return null;
      }

      // Converte e valida todos os campos numéricos
      const formattedData = {
        ...data,
        preco: Number(data.preco) || 0,
        preco_promocional: data.preco_promocional ? Number(data.preco_promocional) : null,
        area: Number(data.area) || 0,
        detalhes: {
          ...data.detalhes,
          quartos: Number(data.detalhes?.quartos) || 0,
          suites: Number(data.detalhes?.suites) || 0,
          banheiros: Number(data.detalhes?.banheiros) || 0,
          vagas: Number(data.detalhes?.vagas) || 0,
          closets: Number(data.detalhes?.closets) || 0,
          pavimentos: Number(data.detalhes?.pavimentos) || 0,
          andares: Number(data.detalhes?.andares) || 0,
          areaGourmet: Boolean(data.detalhes?.areaGourmet),
          estilo: data.detalhes?.estilo || ''
        },
        especificacoes_tecnicas: {
          ...data.especificacoes_tecnicas,
          areaTotal: Number(data.especificacoes_tecnicas?.areaTotal) || 0,
          larguraCasa: Number(data.especificacoes_tecnicas?.larguraCasa) || 0,
          profundidadeCasa: Number(data.especificacoes_tecnicas?.profundidadeCasa) || 0,
          areaTerreno: Number(data.especificacoes_tecnicas?.areaTerreno) || 0,
          larguraTerreno: Number(data.especificacoes_tecnicas?.larguraTerreno) || 0,
          profundidadeTerreno: Number(data.especificacoes_tecnicas?.profundidadeTerreno) || 0
        },
        areas_internas: {
          ...data.areas_internas,
          sala: Number(data.areas_internas?.sala) || 0,
          cozinha: Number(data.areas_internas?.cozinha) || 0,
          lavanderia: Number(data.areas_internas?.lavanderia) || 0,
          areaGourmet: Number(data.areas_internas?.areaGourmet) || 0,
          banheiros: Number(data.areas_internas?.banheiros) || 0
        },
        promocao_ativa: Boolean(data.promocao_ativa),
        destaque: Boolean(data.destaque),
        imagens: Array.isArray(data.imagens) ? data.imagens : [],
        inclusos: Array.isArray(data.inclusos) ? data.inclusos : []
      } as Projeto;

      console.log('Dados formatados do projeto:', formattedData);
      return formattedData;
    },
    retry: 1
  });
}