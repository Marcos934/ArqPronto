import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectFilters from '../components/ProjectFilters';
import type { FilterState, Project } from '../types';

export default function Projects() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000000],
    type: '',
    areaRange: [0, 1000],
    searchQuery: '',
  });

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    const matchesType = !filters.type || project.type === filters.type;
    
    const matchesPrice = project.price >= filters.priceRange[0] &&
      project.price <= filters.priceRange[1];
    
    const matchesArea = project.area >= filters.areaRange[0] &&
      project.area <= filters.areaRange[1];

    return matchesSearch && matchesType && matchesPrice && matchesArea;
  });

  return (
    <div className="flex-1 bg-gray-100 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Our Projects</h1>
          <p className="mt-2 text-lg text-gray-600">
            Explore our collection of architectural designs and find your perfect match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ProjectFilters onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <h3 className="mt-2 text-lg font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}