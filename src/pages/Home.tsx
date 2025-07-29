import { ArrowRight, Building2, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const benefits = [
    {
      icon: Building2,
      title: 'Custom Architectural Projects',
      description: 'Tailored designs that match your vision and requirements perfectly.',
    },
    {
      icon: DollarSign,
      title: 'Clear Cost Planning',
      description: 'Transparent pricing and detailed cost breakdowns for your peace of mind.',
    },
    {
      icon: FileCheck,
      title: 'Streamlined Approvals',
      description: 'We handle all necessary permits and regulatory requirements.',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Committed to delivering your project on schedule and within budget.',
    },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
            alt="Modern architecture"
          />
          <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Dream Space Awaits
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Discover exceptional architectural designs that blend form and function. 
            From modern homes to commercial spaces, find your perfect project.
          </p>
          <div className="mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Explore Our Projects
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your dream project
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We combine innovative design with practical solutions to create spaces that inspire and endure.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
import { ArrowRight, Building2, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Home() {
  const benefits = [
    {
      icon: Building2,
      title: 'Custom Architectural Projects',
      description: 'Tailored designs that match your vision and requirements perfectly.',
    },
    {
      icon: DollarSign,
      title: 'Clear Cost Planning',
      description: 'Transparent pricing and detailed cost breakdowns for your peace of mind.',
    },
    {
      icon: FileCheck,
      title: 'Streamlined Approvals',
      description: 'We handle all necessary permits and regulatory requirements.',
    },
    {
      icon: Clock,
      title: 'Timely Delivery',
      description: 'Committed to delivering your project on schedule and within budget.',
    },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
            alt="Modern architecture"
          />
          <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Dream Space Awaits
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Discover exceptional architectural designs that blend form and function. 
            From modern homes to commercial spaces, find your perfect project.
          </p>
          <div className="mt-10">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Explore Our Projects
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your dream project
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We combine innovative design with practical solutions to create spaces that inspire and endure.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <benefit.icon className="h-5 w-5 flex-none text-indigo-600" />
                    {benefit.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{benefit.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Projects</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore our latest architectural designs and find inspiration for your next project.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              View All Projects
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}