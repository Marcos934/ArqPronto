import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import type { Projeto } from '../types';
import { trackLead } from '../utils/facebook-pixel';

interface ContatoWhatsAppModalProps {
  projeto: Projeto;
  isOpen: boolean;
  onClose: () => void;
}

export default function ContatoWhatsAppModal({ projeto, isOpen, onClose }: ContatoWhatsAppModalProps) {
  const [nome, setNome] = useState('');
  const { data: settings } = useGlobalSettings();

  useEffect(() => {
    if (isOpen) {
      const dadosSalvos = localStorage.getItem('dadosContato');
      if (dadosSalvos) {
        const { nome: nomeSalvo } = JSON.parse(dadosSalvos);
        setNome(nomeSalvo);
      }
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!settings?.whatsappNumber) {
      toast.error('Número do WhatsApp não configurado');
      return;
    }

    localStorage.setItem('dadosContato', JSON.stringify({ nome }));

    const formatador = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    trackLead({
      content_name: projeto.titulo,
      content_ids: [projeto.id],
      content_type: 'product',
      value: projeto.preco,
      currency: 'BRL',
      status: 'whatsapp_contact',
      user_name: nome
    });

    const mensagem = encodeURIComponent(
      `Olá! Me chamo ${nome} e gostaria de saber mais sobre o projeto "${projeto.titulo}"\n\n` +
      `Características do projeto:\n` +
      `- Valor: ${formatador.format(projeto.preco)}\n` +
      `- Área: ${projeto.area}m²\n` +
      `- Quartos: ${projeto.detalhes.quartos}\n` +
      `- Suítes: ${projeto.detalhes.suites}\n` +
      `- Banheiros: ${projeto.detalhes.banheiros}\n` +
      `- Vagas: ${projeto.detalhes.vagas}`
    );

    window.open(`https://wa.me/${settings.whatsappNumber}?text=${mensagem}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              type="button"
              className="rounded-lg bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Fechar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                  Falar sobre {projeto.titulo}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Como podemos te chamar?
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Digite seu nome"
                    />
                  </div>

                  <div className="mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-lg bg-primary-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-2"
                    >
                      Chamar no WhatsApp
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}