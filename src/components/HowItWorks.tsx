import { FileText, MessageCircle, CreditCard, Download } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: 'Escolha seu projeto',
    description: 'Navegue pelo catálogo e encontre o projeto ideal'
  },
  {
    icon: MessageCircle,
    title: 'Fale com consultor',
    description: 'Tire suas dúvidas e receba orientações'
  },
  {
    icon: CreditCard,
    title: 'Efetue o pagamento',
    description: 'Pague de forma prática'
  },
  {
    icon: Download,
    title: 'Acesse os arquivos',
    description: 'Receba o projeto'
  }
];

export default function HowItWorks() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900">Como Funciona</h2>
          <p className="mt-2 text-gray-600">Processo simples e rápido para adquirir seu projeto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="relative flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                <step.icon className="w-8 h-8 text-primary-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              
              <p className="text-sm text-gray-600">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-4rem)] h-0.5">
                  <div className="w-full h-full bg-primary-100" />
                  <div className="absolute right-0 -top-1.5 w-3 h-3 transform rotate-45 border-t-2 border-r-2 border-primary-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}