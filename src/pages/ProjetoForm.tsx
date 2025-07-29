import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface ProjetoFormData {
  titulo: string;
  descricao: string;
  tipo: 'residencial' | 'comercial';
  preco: number;
  area: number;
  imagens: string[];
  detalhes: {
    quartos: number;
    suites: number;
    banheiros: number;
    vagas: number;
    closets: number;
    areaGourmet: boolean;
    pavimentos: number;
    andares: number;
    estilo: string;
  };
  especificacoes_tecnicas: {
    areaTotal: number;
    larguraCasa: number;
    profundidadeCasa: number;
    areaTerreno: number;
    larguraTerreno: number;
    profundidadeTerreno: number;
  };
  areas_internas: {
    sala: number;
    cozinha: number;
    lavanderia: number;
    areaGourmet: number;
    banheiros: number;
  };
  inclusos: string[];
}

export default function ProjetoForm() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ProjetoFormData>();

  const onSubmit = async (data: ProjetoFormData) => {
    try {
      // TODO: Implement API call
      console.log(data);
      toast.success('Projeto salvo com sucesso!');
      navigate('/projetos');
    } catch (error) {
      toast.error('Erro ao salvar projeto');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Novo Projeto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Informações Básicas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                {...register('titulo')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select
                {...register('tipo')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Preço</label>
              <input
                type="number"
                step="0.01"
                {...register('preco')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Área Total (m²)</label>
              <input
                type="number"
                {...register('area')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                {...register('descricao')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Detalhes */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Detalhes</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quartos</label>
              <input
                type="number"
                {...register('detalhes.quartos')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Suítes</label>
              <input
                type="number"
                {...register('detalhes.suites')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Banheiros</label>
              <input
                type="number"
                {...register('detalhes.banheiros')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Vagas de Garagem</label>
              <input
                type="number"
                {...register('detalhes.vagas')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Closets</label>
              <input
                type="number"
                {...register('detalhes.closets')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Pavimentos</label>
              <input
                type="number"
                {...register('detalhes.pavimentos')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Andares</label>
              <input
                type="number"
                {...register('detalhes.andares')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Estilo</label>
              <input
                type="text"
                {...register('detalhes.estilo')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Área Gourmet</label>
              <select
                {...register('detalhes.areaGourmet')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
          </div>
        </div>

        {/* Especificações Técnicas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Especificações Técnicas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Largura do Imóvel (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.larguraCasa')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profundidade do Imóvel (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeCasa')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Largura do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.larguraTerreno')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profundidade do Terreno (m)</label>
              <input
                type="number"
                step="0.01"
                {...register('especificacoes_tecnicas.profundidadeTerreno')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Áreas Internas */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Áreas Internas (m²)</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sala</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.sala')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cozinha</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.cozinha')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Lavanderia</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.lavanderia')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Área Gourmet</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.areaGourmet')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Área de Banheiros</label>
              <input
                type="number"
                step="0.01"
                {...register('areas_internas.banheiros')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Imagens</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">URLs das Imagens (uma por linha)</label>
              <textarea
                {...register('imagens')}
                rows={4}
                placeholder="https://exemplo.com/imagem1.jpg&#10;https://exemplo.com/imagem2.jpg"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Itens Inclusos */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Itens Inclusos</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lista de Itens (um por linha)</label>
            <textarea
              {...register('inclusos')}
              rows={4}
              placeholder="Projeto arquitetônico completo&#10;Projeto estrutural&#10;Projeto hidráulico"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/projetos')}
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