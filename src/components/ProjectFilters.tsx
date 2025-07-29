import { useState } from 'react';
import type { FilterState } from '../types';

interface ProjectFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000000],
    type: '',
    areaRange: [0, 1000],
    searchQuery: '',
  });

  const handleChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search Projects
          </label>
          <input
            type="text"
            id="search"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by name or description..."
            value={filters.searchQuery}
            onChange={(e) => handleChange('searchQuery', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Project Type
          </label>
          <select
            id="type"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={filters.type}
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="">All Types</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price Range
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.priceRange[0]}
              onChange={(e) => handleChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
            />
            <input
              type="number"
              placeholder="Max"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.priceRange[1]}
              onChange={(e) => handleChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            />
          </div>
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area Range (m²)
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Min"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.areaRange[0]}
              onChange={(e) => handleChange('areaRange', [parseInt(e.target.value), filters.areaRange[1]])}
            />
            <input
              type="number"
              placeholder="Max"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={filters.areaRange[1]}
              onChange={(e) => handleChange('areaRange', [filters.areaRange[0], parseInt(e.target.value)])}
            />
          </div>
        </div>
      </div>
    </div>
  );
}