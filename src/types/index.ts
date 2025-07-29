export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  preco: number;
  tipo: 'residencial' | 'comercial';
  area: number;
  imagens: string[];
  detalhes: {
    quartos: number;
    suites: number;
    banheiros: number;
    vagas: number;
    closets: number;
    areaGourmet: boolean;
    pavimentos: number;
    andares: number;
    estilo: string;
  };
  especificacoesTecnicas: {
    areaTotal: number;
    larguraCasa: number;
    profundidadeCasa: number;
    areaTerreno: number;
    larguraTerreno: number;
    profundidadeTerreno: number;
  };
  areasInternas: {
    sala: number;
    cozinha: number;
    lavanderia: number;
    areaGourmet: number;
    banheiros: number;
  };
  inclusos: string[];
}

export interface EstadoFiltro {
  termoBusca: string;
  tipo: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  areaMinima: string;
  areaMaxima: string;
}