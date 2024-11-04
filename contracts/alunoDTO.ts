type Aluno = {
  id: string;
  nome: string;
  email: string;
  peso: number;
  altura: number;
  telefone: string;
  cirurgias: string;
  patologias: string;
  meses_experiencia_musculacao: number;
  diagnostico_lesao_joelho: string;
  consumo_cigarro: boolean;
  consumo_alcool: boolean;
  pratica_exercicio_fisico: boolean;
  ausencias_consecutivas: number;
  status: string;
  posicao?: number;
};

export type { Aluno };
