import { Usuario } from '../api';
import { config } from '../config';
import { getAccessToken } from '../dal';
import { http } from '../http';
import * as mock from '../mocks/estantes.mock';
import { Livro } from './livros';

export type Estante = {
  id: string;
  nome: string;
  linhas: number;
  colunas: number;
  usuarios: (Usuario & {cargo: string})[];
  livros: (Livro & {
    linha: number;
    coluna: number;
  })[];
};

export type ListaEstantes = {
  dono: Estante[];
  convidado: Estante[];
}

export type CriarEstanteInput = {
  nome: string;
  linhas: number;
  colunas: number;
};

export const estantesApi = {
  listar: async (): Promise<ListaEstantes> => {
    if (config.useMock) return mock.listar();
    return http<ListaEstantes>(`/estante`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['estantes'],
      },
    });
  },

  criar: async (
    data: CriarEstanteInput,
  ): Promise<Estante> => {
    if (config.useMock) return mock.criar(data);
    return http<Estante>('/estante', {
      method: 'POST',
      body: data,
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['estantes'],
      },
    });
  },

  buscarPorId: async (id: string): Promise<Estante | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Estante>(`/estante/${id}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['estantes'],
      },
    });
  },

  atualizar: async (
    id: string,
    data: Omit<Estante, 'id'>,
  ): Promise<Estante> => {
    if (config.useMock) return mock.atualizar(id, data);
    return http<Estante>(`/estante/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      body: data,
      next: {
        tags: ['estantes'],
      },
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/estante/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['estantes'],
      },
    });
  },
};
