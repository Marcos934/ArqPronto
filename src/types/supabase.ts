export interface Database {
  public: {
    Tables: {
      projetos: {
        Row: {
          id: string;
          titulo: string;
          descricao: string;
          tipo: 'residencial' | 'comercial';
          preco: number;
          preco_original: number | null;
          preco_promocional: number | null;
          promocao_ativa: boolean;
          promocao_inicio: string | null;
          promocao_fim: string | null;
          destaque: boolean;
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
          especificacoes_tecnicas: {
            areaTotal: number;
            larguraCasa: number;
            profundidadeCasa: number;
            areaTerreno: number;
            larguraTerreno: number;
            profundidadeTerreno: number;
          };
          areas_internas: {
            sala: number;
            cozinha: number;
            lavanderia: number;
            areaGourmet: number;
            banheiros: number;
          };
          inclusos: string[];
          status: 'ativo' | 'inativo';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projetos']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projetos']['Insert']>;
      };
    };
  };
}

export type Projeto = Database['public']['Tables']['projetos']['Row'];