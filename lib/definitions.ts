import { Livro } from './api';

export type Nicho = {
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
    avatarUrl?: string;
  };
  token: string;
  refreshToken: string;
  expiresAt: Date;
};
