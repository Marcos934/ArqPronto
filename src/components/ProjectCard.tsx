import { Building2, MapPin, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link to={`/projects/${project.id}`}>
        <div className="relative h-48 w-full">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold text-gray-900">
            {formatter.format(project.price)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{project.type}</span>
            </div>
            <div className="flex items-center">
              <Ruler className="h-4 w-4 mr-1" />
              <span>{project.area}m²</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{project.details.stories} {project.details.stories === 1 ? 'story' : 'stories'}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}