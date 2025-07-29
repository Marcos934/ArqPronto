import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Info } from 'lucide-react';
import { useProjetos } from '../../hooks/useProjetos';
import { useProjetoById } from '../../hooks/useProjetoById';
import { useStorage } from '../../hooks/useStorage';
import ImageUpload from '../ImageUpload';
import type { Projeto } from '../../types/supabase';

type ProjetoFormData = Omit<Projeto, 'id' | 'created_at' | 'updated_at'>;

export default function ProjetoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const { createProjeto, updateProjeto } = useProjetos();
  const { data: projetoExistente, isLoading } = useProjetoById(id ?? '');
  const { uploadImage } = useStorage();

  const { register, handleSubmit, setValue, watch, reset } = useForm<ProjetoFormData>({
    defaultValues: {
      titulo: '',
      descricao: '',
      tipo: 'residencial',
      preco: 0,
      preco_promocional: null,
      promocao_ativa: false,
      promocao_inicio: null,
      promocao_fim: null,
      destaque: false,
      area: 0,
      status: 'ativo',
      detalhes: {
        quartos: 0,
        suites: 0,
        banheiros: 0,
        vagas: 0,
        closets: 0,
        areaGourmet: false,
        pavimentos: 0,
        andares: 0,
        estilo: ''
      },
      especificacoes_tecnicas: {
        areaTotal: 0,
        larguraCasa: 0,
        profundidadeCasa: 0,
        areaTerreno: 0,
        larguraTerreno: 0,
        profundidadeTerreno: 0
      },
      areas_internas: {
        sala: 0,
        cozinha: 0,
        lavanderia: 0,
        areaGourmet: 0,
        banheiros: 0
      },
      imagens: [],
      inclusos: []
    }
  });

  const images = watch('imagens');
  const promocaoAtiva = watch('promocao_ativa');
  const preco = watch('preco');

  useEffect(() => {
    if (projetoExistente) {
      reset(projetoExistente);
    }
  }, [projetoExistente, reset]);

  useEffect(() => {
    // Auto-calculate promotional price (20% discount)
    if (promocaoAtiva && preco > 0) {
      setValue('preco_promocional', preco * 0.8);
    }
  }, [promocaoAtiva, preco, setValue]);

  const handleImageUpload = async (files: File[]) => {
    try {
      setIsUploading(true);
      const uploadedUrls = await Promise.all(
        files.map(file => uploadImage(file))
      );
      
      const newImages = [...images, ...uploadedUrls];
      setValue('imagens', newImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Erro ao fazer upload das imagens');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjetoFormData) => {
    if (!data.titulo.trim()) {
      toast.error('O título é obrigatório');
      return;
    }

    if (!data.descricao.trim()) {
      toast.error('A descrição é obrigatória');
      return;
    }

    if (!data.area || data.area <= 0) {
      toast.error('A área total deve ser maior que zero');
      return;
    }

    // Validate promotion dates if promotion is active
    if (data.promocao_ativa) {
      if (!data.promocao_inicio || !data.promocao_fim) {
        toast.error('Datas de início e fim da promoção são obrigatórias');
        return;
      }

      const inicio = new Date(data.promocao_inicio);
      const fim = new Date(data.promocao_fim);
      const hoje = new Date();

      if (inicio < hoje) {
        toast.error('A data de início deve ser futura');
        return;
      }

      if (fim <= inicio) {
        toast.error('A data de fim deve ser posterior à data de início');
        return;
      }
    }

    try {
      const formattedData = {
        ...data,
        titulo: data.titulo.trim(),
        descricao: data.descricao.trim(),
        inclusos: typeof data.inclusos === 'string' 
          ? data.inclusos.split('\n').filter(item => item.trim())
          : data.inclusos
      };

      if (id) {
        await updateProjeto.mutateAsync({ id, ...formattedData });
      } else {
        await createProjeto.mutateAsync(formattedData);
      }
      navigate('/admin/projetos');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Erro ao salvar projeto');
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const inputClassName = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-3 text-base";
  const requiredLabelClassName = "block text-sm font-medium text-gray-700 mb-2 after:content-['*'] after:ml-1 after:text-red-500";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Editar Projeto' : 'Novo Projeto'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Informações Básicas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={requiredLabelClassName}>Título</label>
              <input
                type="text"
                {...register('titulo')}
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('status')}
                    value="ativo"
                    defaultChecked
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-base">Ativo</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('status')}
                    value="inativo"
                    className="form-radio h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-base">Inativo</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
              <select
                {...register('tipo')}
                className={inputClassName}
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preço</label>
              <input
                type="number"
                step="0.01"
                {...register('preco')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={requiredLabelClassName}>Área Total (m²)</label>
              <input
                type="number"
                {...register('area')}
                required
                min="1"
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destaque
                <span className="ml-2 text-gray-500 text-xs">
                  <Info className="inline-block h-4 w-4 mr-1" />
                  Projetos em destaque aparecem em posições privilegiadas no site
                </span>
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register('destaque')}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-base">Marcar como destaque</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={requiredLabelClassName}>Descrição</label>
              <textarea
                {...register('descricao')}
                required
                rows={4}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Promoção */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Informações de Promoção</h2>
          <div className="space-y-6">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register('promocao_ativa')}
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-base">Ativar promoção</span>
              </label>
            </div>

            {promocaoAtiva && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preço Promocional
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('preco_promocional')}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Início da Promoção
                  </label>
                  <input
                    type="datetime-local"
                    {...register('promocao_inicio')}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fim da Promoção
                  </label>
                  <input
                    type="datetime-local"
                    {...register('promocao_fim')}
                    className={inputClassName}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detalhes */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Detalhes</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quartos</label>
              <input
                type="number"
                {...register('detalhes.quartos')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Suítes</label>
              <input
                type="number"
                {...register('detalhes.suites')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banheiros</label>
              <input
                type="number"
                {...register('detalhes.banheiros')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vagas de Garagem</label>
              <input
                type="number"
                {...register('detalhes.vagas')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closets</label>
              <input
                type="number"
                {...register('detalhes.closets')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pavimentos</label>
              <input
                type="number"
                {...register('detalhes.pavimentos')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Andares</label>
              <input
                type="number"
                {...register('detalhes.andares')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
              <input
                type="text"
                {...register('detalhes.estilo')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área Gourmet</label>
              <select
                {...register('detalhes.areaGourmet')}
                className={inputClassName}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Largura do Imóvel (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.larguraCasa')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profundidade do Imóvel (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeCasa')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Largura do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.larguraTerreno')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profundidade do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeTerreno')}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Áreas Internas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Áreas Internas (m²)</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sala</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.sala')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cozinha</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.cozinha')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lavanderia</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.lavanderia')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área Gourmet</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.areaGourmet')}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área de Banheiros</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.banheiros')}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Imagens</h2>
          <ImageUpload
            images={images}
            onChange={(newImages) => setValue('imagens', newImages)}
            onUpload={handleImageUpload}
            isUploading={isUploading}
          />
        </div>

        {/* Itens Inclusos */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Itens Inclusos</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lista de Itens (um por linha)</label>
            <textarea
              {...register('inclusos')}
              rows={4}
              placeholder="Projeto arquitetônico completo&#10;Projeto estrutural&#10;Projeto hidráulico"
              className={inputClassName}
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/projetos')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Salvar Projeto
          </button>
        </div>
      </form>
    </div>
  );
}