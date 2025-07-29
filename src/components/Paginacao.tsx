interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudarPagina: (pagina: number) => void;
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  aoMudarPagina,
}: PaginacaoProps) {
  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  const paginasVisiveis = paginas.slice(
    Math.max(0, Math.min(paginaAtual - 3, totalPaginas - 5)),
    Math.min(totalPaginas, Math.max(5, paginaAtual + 2))
  );

  return (
    <nav className="flex items-center justify-center space-x-1">
      <button
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      
      {paginaAtual > 3 && (
        <>
          <button
            onClick={() => aoMudarPagina(1)}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            1
          </button>
          {paginaAtual > 4 && (
            <span className="px-3 py-2 text-gray-500">...</span>
          )}
        </>
      )}
      
      {paginasVisiveis.map((pagina) => (
        <button
          key={pagina}
          onClick={() => aoMudarPagina(pagina)}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            pagina === paginaAtual
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          {pagina}
        </button>
      ))}
      
      {paginaAtual < totalPaginas - 2 && (
        <>
          {paginaAtual < totalPaginas - 3 && (
            <span className="px-3 py-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => aoMudarPagina(totalPaginas)}
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {totalPaginas}
          </button>
        </>
      )}
      
      <button
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </nav>
  );
}