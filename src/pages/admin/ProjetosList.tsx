import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Search, Tag, Star, Power, Link as LinkIcon } from 'lucide-react';
import { useProjetos } from '../../hooks/useProjetos';
import { toast } from 'react-hot-toast';

interface FilterState {
  search: string;
  type: string;
  status: string;
  promotion: string;
  featured: string;
}

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string;
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, projectTitle }: DeleteConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <Trash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Excluir projeto
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Tem certeza que deseja excluir o projeto "{projectTitle}"? Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              Excluir
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjetosList() {
  const { projetos, isLoading, deleteProjeto, toggleStatus, updateProjeto } = useProjetos(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{ id: string; title: string } | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    type: '',
    status: 'ativo', // Set default status filter to "ativo"
    promotion: '',
    featured: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 25;

  const handleDeleteClick = (id: string, title: string) => {
    setProjectToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      await deleteProjeto.mutateAsync(projectToDelete.id);
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error('Erro ao excluir projeto');
    } finally {
      setIsDeleting(false);
      setProjectToDelete(null);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'ativo' | 'inativo') => {
    try {
      await toggleStatus.mutateAsync({ id, currentStatus });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleToggleHighlight = async (projeto: any) => {
    try {
      await updateProjeto.mutateAsync({
        ...projeto,
        destaque: !projeto.destaque
      });
      toast.success(projeto.destaque ? 'Destaque removido' : 'Projeto destacado com sucesso');
    } catch (error) {
      toast.error('Erro ao alterar destaque do projeto');
    }
  };

  // Filter projects but maintain original order
  const filteredProjetos = projetos?.filter(projeto => {
    const matchesSearch = projeto.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = !filters.type || projeto.tipo === filters.type;
    const matchesStatus = !filters.status || projeto.status === filters.status;
    const matchesPromotion = !filters.promotion || 
      (filters.promotion === 'active' ? projeto.promocao_ativa : !projeto.promocao_ativa);
    const matchesFeatured = !filters.featured || 
      (filters.featured === 'yes' ? projeto.destaque : !projeto.destaque);

    return matchesSearch && matchesType && matchesStatus && matchesPromotion && matchesFeatured;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cálculo da paginação
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjetos?.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil((filteredProjetos?.length || 0) / projectsPerPage);

  // Funções de navegação
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projetos</h1>
        <Link
          to="/admin/projetos/novo"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <div className="relative">
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Buscar projetos..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="residencial">Residencial</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="ativo">Ativo</option>
              <option value="inativo">Inativo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Promoção</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.promotion}
              onChange={(e) => setFilters(prev => ({ ...prev, promotion: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="active">Em Promoção</option>
              <option value="inactive">Sem Promoção</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destaque</label>
            <select
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filters.featured}
              onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.value }))}
            >
              <option value="">Todos</option>
              <option value="yes">Destacados</option>
              <option value="no">Não Destacados</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marcadores
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProjects?.map((projeto) => (
              <tr key={projeto.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link 
                    to={`/admin/projetos/editar/${projeto.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                  >
                    {projeto.titulo}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/projetos/${projeto.id}`;
                      navigator.clipboard.writeText(url);
                      toast.success(`Link do projeto "${projeto.titulo}" copiado`);
                    }}
                    className="text-gray-500 hover:text-indigo-600 transition-colors"
                    title="Copiar link do projeto"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {projeto.tipo === 'residencial' ? 'Residencial' : 'Comercial'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {projeto.promocao_ativa ? (
                      <div>
                        <span className="text-gray-400 line-through">
                          {formatCurrency(projeto.preco)}
                        </span>
                        <span className="ml-2 text-red-600 font-medium">
                          {formatCurrency(projeto.preco_promocional || 0)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-900">{formatCurrency(projeto.preco)}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    projeto.status === 'ativo'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {projeto.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    {projeto.promocao_ativa && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        <Tag className="h-3 w-3 mr-1" />
                        Promoção
                      </span>
                    )}
                    {projeto.destaque && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Star className="h-3 w-3 mr-1" />
                        Destaque
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => handleToggleStatus(projeto.id, projeto.status)}
                    className={`text-sm font-medium ${
                      projeto.status === 'ativo' 
                        ? 'text-red-600 hover:text-red-900' 
                        : 'text-green-600 hover:text-green-900'
                    }`}
                    title={projeto.status === 'ativo' ? 'Desativar projeto' : 'Ativar projeto'}
                  >
                    <Power className="h-4 w-4 inline" />
                  </button>
                  <button
                    onClick={() => handleToggleHighlight(projeto)}
                    className={`text-sm font-medium ${
                      projeto.destaque 
                        ? 'text-yellow-600 hover:text-yellow-900' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                    title={projeto.destaque ? 'Remover destaque' : 'Destacar projeto'}
                  >
                    <Star className={`h-4 w-4 inline ${projeto.destaque ? 'fill-current' : ''}`} />
                  </button>
                  <Link
                    to={`/admin/projetos/editar/${projeto.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Pencil className="h-4 w-4 inline" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(projeto.id, projeto.titulo)}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={projectToDelete?.title || ''}
      />
    </div>
  );
}