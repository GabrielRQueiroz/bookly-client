import { config } from '../config';
import { getAccessToken } from '../dal';
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
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
    });
  },

  criar: async (data: Omit<Genero, 'id'>): Promise<Genero> => {
    if (config.useMock) return mock.criar(data.nome, data.corHexa);
    return http<Genero>('/generos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      body: data,
    });
  },

  buscarPorId: async (id: string): Promise<Genero | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Genero>(`/generos/${id}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/generos/${id}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      method: 'DELETE',
    });
  },

  atualizar: async (id: string, data: Omit<Genero, 'id'>): Promise<Genero> => {
    if (config.useMock) return mock.atualizar(id, data.nome, data.corHexa);
    return http<Genero>(`/generos/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      body: data,
    });
  },
};
