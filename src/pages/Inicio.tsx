import { ArrowRight, Building2, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CartaoProjeto from '../components/CartaoProjeto';
import { useProjetos } from '../hooks/useProjetos';
import { useGlobalSettings } from '../hooks/useGlobalSettings';

export default function Inicio() {
  const { projetos, isLoading: isLoadingProjetos } = useProjetos();
  const { data: settings, isLoading: isLoadingSettings } = useGlobalSettings();

  const isLoading = isLoadingProjetos || isLoadingSettings;

  const beneficios = [
    {
      icone: Building2,
      titulo: 'Projetos Arquitetônicos Personalizados',
      descricao: 'Designs sob medida que atendem perfeitamente à sua visão e requisitos.',
    },
    {
      icone: DollarSign,
      titulo: 'Planejamento de Custos Transparente',
      descricao: 'Preços transparentes e detalhamento de custos para sua tranquilidade.',
    },
    {
      icone: FileCheck,
      titulo: 'Aprovações Simplificadas',
      descricao: 'Cuidamos de todas as licenças e requisitos regulatórios necessários.',
    },
    {
      icone: Clock,
      titulo: 'Entrega no Prazo',
      descricao: 'Comprometidos em entregar seu projeto dentro do cronograma e orçamento.',
    },
  ];

  const projetosDestaque = projetos?.slice(0, 3) ?? [];

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070"
            alt="Arquitetura moderna"
          />
          <div className="absolute inset-0 bg-gray-900/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Seu Espaço dos Sonhos Aguarda
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-gray-300">
            Descubra projetos arquitetônicos excepcionais que combinam forma e função. 
            De casas modernas a espaços comerciais, encontre seu projeto perfeito.
          </p>
          <div className="mt-10">
            <Link
              to="/projetos"
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
            >
              Explorar Nossos Projetos
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Benefícios Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">Por Que Nos Escolher</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tudo que você precisa para seu projeto dos sonhos
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Combinamos design inovador com soluções práticas para criar espaços que inspiram e perduram.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {beneficios.map((beneficio) => (
                <div key={beneficio.titulo} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <beneficio.icone className="h-5 w-5 flex-none text-primary-600" />
                    {beneficio.titulo}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{beneficio.descricao}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Projetos em Destaque */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Projetos em Destaque</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Explore nossos últimos projetos arquitetônicos e encontre inspiração para seu próximo projeto.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {projetosDestaque.map((projeto) => (
              <CartaoProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/projetos"
              className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700"
            >
              Ver Todos os Projetos
              <ArrowRight className="ml-3 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}