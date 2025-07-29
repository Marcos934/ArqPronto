import { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import type { EstadoFiltro } from '../types';

interface FiltrosProjetoProps {
  aoMudarFiltro: (filtros: EstadoFiltro) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FiltrosProjeto({ aoMudarFiltro, isOpen = false, onClose }: FiltrosProjetoProps) {
  const [filtros, setFiltros] = useState<EstadoFiltro>({
    termoBusca: '',
    tipo: '',
    quartos: '',
    banheiros: '',
    vagas: '',
    areaMinima: '',
    areaMaxima: ''
  });

  const handleChange = useCallback((chave: keyof EstadoFiltro, valor: string) => {
    const novosFiltros = { ...filtros, [chave]: valor };
    setFiltros(novosFiltros);
    aoMudarFiltro(novosFiltros);
  }, [filtros, aoMudarFiltro]);

  const limparFiltros = useCallback(() => {
    const filtrosLimpos = {
      termoBusca: '',
      tipo: '',
      quartos: '',
      banheiros: '',
      vagas: '',
      areaMinima: '',
      areaMaxima: ''
    };
    setFiltros(filtrosLimpos);
    aoMudarFiltro(filtrosLimpos);
  }, [aoMudarFiltro]);

  const filterContent = (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Buscar projeto..."
          value={filtros.termoBusca}
          onChange={(e) => handleChange('termoBusca', e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Tipo do imóvel</h3>
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-sm rounded-lg border ${
              filtros.tipo === 'residencial'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleChange('tipo', filtros.tipo === 'residencial' ? '' : 'residencial')}
          >
            Residencial
          </button>
          <button
            type="button"
            className={`flex-1 py-2 px-4 text-sm rounded-lg border ${
              filtros.tipo === 'comercial'
                ? 'bg-primary-600 text-white border-primary-600'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleChange('tipo', filtros.tipo === 'comercial' ? '' : 'comercial')}
          >
            Comercial
          </button>
        </div>
      </div>

      {/* Area */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Área da casa</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Mínimo (m²)</label>
            <input
              type="number"
              min="0"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0"
              value={filtros.areaMinima}
              onChange={(e) => handleChange('areaMinima', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Máximo (m²)</label>
            <input
              type="number"
              min="0"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-900 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0"
              value={filtros.areaMaxima}
              onChange={(e) => handleChange('areaMaxima', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Rooms */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Quartos</h3>
        <div className="flex flex-wrap gap-2">
          {['2', '3', '4', '5'].map((num) => (
            <button
              key={num}
              type="button"
              className={`py-2 px-4 text-sm rounded-lg border ${
                filtros.quartos === num
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('quartos', filtros.quartos === num ? '' : num)}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Banheiros</h3>
        <div className="flex flex-wrap gap-2">
          {['2', '3', '4', '5'].map((num) => (
            <button
              key={num}
              type="button"
              className={`py-2 px-4 text-sm rounded-lg border ${
                filtros.banheiros === num
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('banheiros', filtros.banheiros === num ? '' : num)}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>

      {/* Parking Spots */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-2">Vagas de garagem</h3>
        <div className="flex flex-wrap gap-2">
          {['1', '2', '3', '4'].map((num) => (
            <button
              key={num}
              type="button"
              className={`py-2 px-4 text-sm rounded-lg border ${
                filtros.vagas === num
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => handleChange('vagas', filtros.vagas === num ? '' : num)}
            >
              {num}+
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        type="button"
        onClick={limparFiltros}
        className="w-full mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        Limpar filtros
      </button>
    </div>
  );

  // Desktop version
  if (!onClose) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {filterContent}
      </div>
    );
  }

  // Mobile version
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[300px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {filterContent}
          </div>
        </div>
      </div>
    </>
  );
}