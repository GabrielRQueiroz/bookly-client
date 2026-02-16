import { config } from '../config';
import { http } from '../http';
import * as mock from '../mocks/generos.mock';

export type Genero = {
  id: string;
  nome: string;
  corHexa: string;
};

export const generosApi = {
  listar: async (): Promise<Genero[]> => {
    if (config.useMock) return mock.listar();
    return http<Genero[]>('/generos', {
      credentials: 'include',
    });
  },

  criar: async (data: Omit<Genero, 'id'>): Promise<Genero> => {
    if (config.useMock) return mock.criar(data.nome, data.corHexa);
    return http<Genero>('/generos', {
      method: 'POST',
      credentials: 'include',
      body: data,
    });
  },

  buscarPorId: async (id: string): Promise<Genero | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Genero>(`/generos/${id}`, {
      credentials: 'include',
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/generos/${id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
  },

  atualizar: async (id: string, data: Omit<Genero, 'id'>): Promise<Genero> => {
    if (config.useMock) return mock.atualizar(id, data.nome, data.corHexa);
    return http<Genero>(`/generos/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    });
  },
};
