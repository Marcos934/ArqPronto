import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Building2, MapPin, Ruler } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <p className="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.type === project.type)
    .slice(0, 3);

  return (
    <div className="flex-1 bg-gray-100 pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Project Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              <p className="mt-4 text-lg text-gray-600">{project.description}</p>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{project.type}</span>
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{project.area}m²</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">{project.details.stories} stories</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                <dl className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-gray-500">Rooms</dt>
                    <dd className="text-lg font-medium text-gray-900">{project.details.rooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Bathrooms</dt>
                    <dd className="text-lg font-medium text-gray-900">{project.details.bathrooms}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Style</dt>
                    <dd className="text-lg font-medium text-gray-900">{project.details.style}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Price</dt>
                    <dd className="text-lg font-medium text-gray-900">{formatter.format(project.price)}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8">
                <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Contact Us About This Project
                </button>
              </div>
            </div>

            <div className="lg:p-8">
              <div className="aspect-w-16 aspect-h-9 lg:aspect-h-4">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-[400px] object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {project.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} view ${index + 2}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}