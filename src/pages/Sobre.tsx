import { Users, Award, Lightbulb, Heart } from 'lucide-react';

export default function Sobre() {
  const valores = [
    {
      icone: Users,
      titulo: 'Foco no Cliente',
      descricao: 'Colocamos as necessidades e sonhos dos nossos clientes em primeiro lugar.',
    },
    {
      icone: Award,
      titulo: 'Excelência',
      descricao: 'Comprometidos com os mais altos padrões de qualidade em cada projeto.',
    },
    {
      icone: Lightbulb,
      titulo: 'Inovação',
      descricao: 'Buscamos constantemente novas soluções e tecnologias para nossos projetos.',
    },
    {
      icone: Heart,
      titulo: 'Sustentabilidade',
      descricao: 'Desenvolvemos projetos com responsabilidade ambiental e social.',
    },
  ];

  return (
    <div className="flex-1 pt-24">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070"
            alt="Equipe TerraraProjetos"
          />
          <div className="absolute inset-0 bg-indigo-800/70 mix-blend-multiply" />
        </div>
        <div className="relative mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sobre a TerraraProjetos
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-indigo-100">
            Transformando sonhos em projetos arquitetônicos excepcionais desde 2015.
          </p>
        </div>
      </div>

      {/* Nossa História */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nossa História</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A TerraraProjetos nasceu da paixão por arquitetura e do desejo de criar espaços que transformam vidas. 
              Com anos de experiência no mercado, nos especializamos em desenvolver projetos que combinam 
              funcionalidade, estética e sustentabilidade.
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Nossa equipe de arquitetos e engenheiros trabalha em conjunto para garantir que cada projeto 
              seja único e perfeitamente adaptado às necessidades de nossos clientes, sempre respeitando 
              prazos e orçamentos estabelecidos.
            </p>
          </div>
        </div>
      </div>

      {/* Nossos Valores */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Nossos Valores
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Construímos nossa reputação sobre valores sólidos que guiam cada decisão e projeto.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {valores.map((valor) => (
                <div key={valor.titulo} className="flex flex-col items-center text-center">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <valor.icone className="h-8 w-8 flex-none text-indigo-600" />
                    <span className="text-lg">{valor.titulo}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{valor.descricao}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}