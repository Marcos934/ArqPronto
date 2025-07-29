import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { useStorage } from './useStorage';
import { isPromotionActive } from '../utils/promotionUtils';
import type { Projeto } from '../types/supabase';

export function useProjetos(showInactive = false) {
  const queryClient = useQueryClient();
  const { deleteImage } = useStorage();

  const { data: projetos, isLoading, error } = useQuery({
    queryKey: ['projetos', showInactive],
    queryFn: async () => {
      try {
        let query = supabase
          .from('projetos')
          .select('*');

        if (!showInactive) {
          query = query.eq('status', 'ativo');
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching projects:', error);
          throw error;
        }

        if (!data) {
          return [];
        }

        // Processar os dados e ordenar
        const processedData = data.map(project => {
          const isActive = isPromotionActive(
            project.promocao_ativa,
            project.promocao_inicio,
            project.promocao_fim
          );

          if (!isActive && project.promocao_ativa) {
            return {
              ...project,
              promocao_inicio: null,
              promocao_fim: null
            };
          }

          return project;
        });

        // Ordenar: primeiro os destacados, depois por data de criação
        return processedData.sort((a, b) => {
          // Se ambos são destacados ou não destacados, ordenar por data de criação
          if (a.destaque === b.destaque) {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          }
          // Se apenas um é destacado, ele deve vir primeiro
          return a.destaque ? -1 : 1;
        });

      } catch (error) {
        console.error('Error in useProjetos:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5
  });

  const createProjeto = useMutation({
    mutationFn: async (projeto: Omit<Projeto, 'id' | 'created_at' | 'updated_at'>) => {
      const projetoData = {
        ...projeto,
        promocao_inicio: projeto.promocao_ativa ? projeto.promocao_inicio : null,
        promocao_fim: projeto.promocao_ativa ? projeto.promocao_fim : null,
        inclusos: Array.isArray(projeto.inclusos) 
          ? projeto.inclusos 
          : projeto.inclusos.split(/[,;\n]/).map(item => item.trim()).filter(Boolean)
      };

      const { data, error } = await supabase
        .from('projetos')
        .insert(projetoData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto criado com sucesso!');
    },
    onError: (error) => {
      console.error('Error creating project:', error);
      toast.error('Erro ao criar projeto');
    }
  });

  const updateProjeto = useMutation({
    mutationFn: async ({ id, ...projeto }: Projeto) => {
      const projetoData = {
        ...projeto,
        promocao_inicio: projeto.promocao_ativa ? projeto.promocao_inicio : null,
        promocao_fim: projeto.promocao_ativa ? projeto.promocao_fim : null,
        inclusos: Array.isArray(projeto.inclusos) 
          ? projeto.inclusos 
          : projeto.inclusos.split(/[,;\n]/).map(item => item.trim()).filter(Boolean)
      };

      const { data, error } = await supabase
        .from('projetos')
        .update(projetoData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast.error('Erro ao atualizar projeto');
    }
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, currentStatus }: { id: string; currentStatus: 'ativo' | 'inativo' }) => {
      const newStatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';
      const { error } = await supabase
        .from('projetos')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      return { id, newStatus };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      const status = data.newStatus === 'ativo' ? 'ativado' : 'desativado';
      toast.success(`Projeto ${status} com sucesso!`);
    },
    onError: (error) => {
      console.error('Error toggling project status:', error);
      toast.error('Erro ao alterar status do projeto');
    }
  });

  const deleteProjeto = useMutation({
    mutationFn: async (id: string) => {
      // First, get the project to access its images
      const { data: projeto, error: fetchError } = await supabase
        .from('projetos')
        .select('imagens')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Delete all images from storage
      if (projeto && projeto.imagens) {
        await Promise.all(
          projeto.imagens.map(async (imageUrl: string) => {
            try {
              await deleteImage(imageUrl);
            } catch (error) {
              console.error('Error deleting image:', error);
              // Continue with other deletions even if one fails
            }
          })
        );
      }

      // Delete the project from the database
      const { error: deleteError } = await supabase
        .from('projetos')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projetos'] });
      toast.success('Projeto excluído com sucesso!');
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
      toast.error('Erro ao excluir projeto');
    }
  });

  return {
    projetos,
    isLoading,
    error,
    createProjeto,
    updateProjeto,
    deleteProjeto,
    toggleStatus
  };
}