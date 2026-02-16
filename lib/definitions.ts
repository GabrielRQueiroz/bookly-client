import { Livro } from './api';

export type Nicho = {
  id: string;
  estanteId: string;
  linha: number;
  coluna: number;
  livros?: Livro[];
};

export type SessionPayload = {
  user: {
    id: string;
    nome: string;
    email: string;
  };
  token: string;
  expiresAt: Date;
};
