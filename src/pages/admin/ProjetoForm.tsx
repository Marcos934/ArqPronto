import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Info, ArrowLeft } from 'lucide-react';
import { useProjetos } from '../../hooks/useProjetos';
import { useProjetoById } from '../../hooks/useProjetoById';
import { useStorage } from '../../hooks/useStorage';
import ImageUpload from '../../components/ImageUpload';
import type { Projeto } from '../../types/supabase';
import { splitIncludedItems, joinIncludedItems } from '../../utils/formatters';

type ProjetoFormData = Omit<Projeto, 'id' | 'created_at' | 'updated_at'>;

export default function ProjetoForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createProjeto, updateProjeto } = useProjetos();
  const { data: projetoExistente, isLoading } = useProjetoById(id ?? '');
  const { uploadImage } = useStorage();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<ProjetoFormData>({
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
  const larguraTerreno = watch('especificacoes_tecnicas.larguraTerreno');
  const profundidadeTerreno = watch('especificacoes_tecnicas.profundidadeTerreno');

  useEffect(() => {
    if (projetoExistente) {
      console.log('Dados recebidos do projeto:', projetoExistente);
      
      // Garante que todos os campos numéricos são números
      const formattedData = {
        ...projetoExistente,
        preco: Number(projetoExistente.preco) || 0,
        preco_promocional: projetoExistente.preco_promocional ? Number(projetoExistente.preco_promocional) : null,
        area: Number(projetoExistente.area) || 0,
        inclusos: Array.isArray(projetoExistente.inclusos) 
          ? joinIncludedItems(projetoExistente.inclusos)
          : projetoExistente.inclusos || '',
        detalhes: {
          ...projetoExistente.detalhes,
          quartos: Number(projetoExistente.detalhes?.quartos) || 0,
          suites: Number(projetoExistente.detalhes?.suites) || 0,
          banheiros: Number(projetoExistente.detalhes?.banheiros) || 0,
          vagas: Number(projetoExistente.detalhes?.vagas) || 0,
          closets: Number(projetoExistente.detalhes?.closets) || 0,
          pavimentos: Number(projetoExistente.detalhes?.pavimentos) || 0,
          andares: Number(projetoExistente.detalhes?.andares) || 0
        }
      };

      console.log('Dados formatados para o formulário:', formattedData);
      reset(formattedData);
    }
  }, [projetoExistente, reset]);

  useEffect(() => {
    if (promocaoAtiva && preco > 0) {
      setValue('preco_promocional', preco * 0.8);
    }
  }, [promocaoAtiva, preco, setValue]);

  useEffect(() => {
    const area = Number(larguraTerreno || 0) * Number(profundidadeTerreno || 0);
    setValue('especificacoes_tecnicas.areaTerreno', Number(area.toFixed(2)));
  }, [larguraTerreno, profundidadeTerreno, setValue]);

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

  // Prevent scroll wheel from changing number input values
  const preventScrollInput = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const onSubmit = async (data: ProjetoFormData) => {
    // Validação da área construída vs área do terreno
    if (data.area > data.especificacoes_tecnicas.areaTerreno) {
      toast.error('A área construída não pode ser maior que a área do terreno.');
      return;
    }

    if (!data.titulo.trim()) {
      toast.error('O título é obrigatório');
      return;
    }

    if (!data.descricao.trim()) {
      toast.error('A descrição é obrigatória');
      return;
    }

    if (!data.area || data.area <= 0) {
      toast.error('A área construída deve ser maior que zero');
      return;
    }

    if (!data.imagens || data.imagens.length === 0) {
      toast.error('Pelo menos uma imagem de destaque é obrigatória');
      return;
    }

    try {
      setIsSubmitting(true);
      const formattedData = {
        ...data,
        titulo: data.titulo.trim(),
        descricao: data.descricao.trim(),
        inclusos: typeof data.inclusos === 'string' 
          ? data.inclusos.split('\n').map(item => item.trim()).filter(item => item)
          : Array.isArray(data.inclusos)
            ? data.inclusos.map(item => item.trim()).filter(item => item)
            : []
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
    } finally {
      setIsSubmitting(false);
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

  const inputClassName = "mt-1 block w-full rounded-md shadow-sm py-3 text-base focus:ring-indigo-500 focus:border-indigo-500";
  const requiredLabelClassName = "block text-sm font-medium text-gray-700 mb-2 after:content-['*'] after:ml-1 after:text-red-500";
  const errorClassName = "text-sm text-red-600 mt-1";
  const getInputBorderColor = (error?: any) => 
    error ? "border-red-500" : "border-gray-300";

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate('/admin/projetos')}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Editar Projeto' : 'Novo Projeto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">Informações Básicas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={requiredLabelClassName}>Título</label>
              <input
                type="text"
                {...register('titulo', { 
                  required: 'O título é obrigatório',
                  minLength: { value: 3, message: 'O título deve ter pelo menos 3 caracteres' }
                })}
                className={`${inputClassName} ${getInputBorderColor(errors.titulo)}`}
              />
              {errors.titulo && (
                <p className={errorClassName}>{errors.titulo.message}</p>
              )}
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
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className={requiredLabelClassName}>Área Construída (m²)</label>
              <input
                type="number"
                {...register('area', { 
                  required: 'A área construída é obrigatória',
                  min: { value: 1, message: 'A área deve ser maior que zero' }
                })}
                min="1"
                onWheel={preventScrollInput}
                className={`${inputClassName} ${getInputBorderColor(errors.area)}`}
              />
              {errors.area && (
                <p className={errorClassName}>{errors.area.message}</p>
              )}
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
                {...register('descricao', { 
                  required: 'A descrição é obrigatória',
                  minLength: { value: 10, message: 'A descrição deve ter pelo menos 10 caracteres' }
                })}
                rows={4}
                className={`${inputClassName} ${getInputBorderColor(errors.descricao)}`}
              />
              {errors.descricao && (
                <p className={errorClassName}>{errors.descricao.message}</p>
              )}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço Promocional
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('preco_promocional')}
                  onWheel={preventScrollInput}
                  className={inputClassName}
                />
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
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Suítes</label>
              <input
                type="number"
                {...register('detalhes.suites')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banheiros</label>
              <input
                type="number"
                {...register('detalhes.banheiros')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vagas de Garagem</label>
              <input
                type="number"
                {...register('detalhes.vagas')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Closets</label>
              <input
                type="number"
                {...register('detalhes.closets')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pavimentos</label>
              <input
                type="number"
                {...register('detalhes.pavimentos')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Andares</label>
              <input
                type="number"
                {...register('detalhes.andares')}
                onWheel={preventScrollInput}
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
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profundidade do Imóvel (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeCasa')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Largura do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.larguraTerreno')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profundidade do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeTerreno')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área do Terreno (m²)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.areaTerreno')}
                onWheel={preventScrollInput}
                className={inputClassName}
                disabled
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
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cozinha</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.cozinha')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lavanderia</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.lavanderia')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área Gourmet</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.areaGourmet')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Área de Banheiros</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.banheiros')}
                onWheel={preventScrollInput}
                className={inputClassName}
              />
            </div>
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-6">
            Imagens
            <span className="text-red-500 ml-1">*</span>
          </h2>
          <div>
            <ImageUpload
              images={images}
              onChange={(newImages) => setValue('imagens', newImages)}
              onUpload={handleImageUpload}
              isUploading={isUploading}
            />
            {(!images || images.length === 0) && (
              <p className={errorClassName}>Pelo menos uma imagem de destaque é obrigatória</p>
            )}
          </div>
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
              value={watch('inclusos')}
              onChange={(e) => setValue('inclusos', e.target.value)}
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
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Salvar Projeto
          </button>
        </div>
      </form>
    </div>
  );
}