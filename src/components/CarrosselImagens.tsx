import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarrosselImagensProps {
  imagens: string[];
  titulo: string;
}

export default function CarrosselImagens({ imagens = [], titulo }: CarrosselImagensProps) {
  const [imagemAtual, setImagemAtual] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // If no images are provided, use a placeholder
  const imagensExibicao = imagens.length > 0 
    ? imagens 
    : ['https://via.placeholder.com/800x600?text=Sem+Imagem'];

  const proximaImagem = () => {
    setImagemAtual((atual) => (atual === imagensExibicao.length - 1 ? 0 : atual + 1));
  };

  const imagemAnterior = () => {
    setImagemAtual((atual) => (atual === 0 ? imagensExibicao.length - 1 : atual - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        proximaImagem();
      } else {
        imagemAnterior();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  useEffect(() => {
    const interval = setInterval(proximaImagem, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative w-full">
        <div 
          className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {imagensExibicao.map((imagem, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ${
                index === imagemAtual ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={imagem}
                alt={`${titulo} - Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {imagensExibicao.length > 1 && (
            <>
              <button
                onClick={imagemAnterior}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/75 transition-colors backdrop-blur-sm"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              
              <button
                onClick={proximaImagem}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 sm:p-3 rounded-full text-white hover:bg-black/75 transition-colors backdrop-blur-sm"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {imagensExibicao.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setImagemAtual(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === imagemAtual 
                        ? 'bg-white w-4' 
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Miniaturas para navegação */}
      {imagensExibicao.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-4 px-2 sm:px-0">
          {imagensExibicao.map((imagem, index) => (
            <button
              key={index}
              onClick={() => setImagemAtual(index)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all ${
                index === imagemAtual 
                  ? 'ring-2 ring-indigo-600 ring-offset-2' 
                  : 'hover:opacity-75'
              }`}
            >
              <img
                src={imagem}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}