import { config } from '../config';
import { http } from '../http';
import * as mock from '../mocks/autores.mock';

export type Autor = {
  id: string;
  nome: string;
  nomeComum?: string;
};

export const autoresApi = {
  listar: async (): Promise<Autor[]> => {
    if (config.useMock) return mock.listar();
    return http<Autor[]>('/autores');
  },

  criar: async (data: Omit<Autor, 'id'>): Promise<Autor> => {
    if (config.useMock) return mock.criar(data.nome, data.nomeComum);
    return http<Autor>('/autores', {
      method: 'POST',
      body: data,
    });
  },

  buscarPorId: async (id: string): Promise<Autor | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Autor>(`/autores/${id}`);
  },

  atualizar: async (data: Autor): Promise<Autor> => {
    if (config.useMock)
      return mock.atualizar(data.id, data.nome, data.nomeComum);
    return http<Autor>(`/autores/${data.id}`, {
      method: 'PUT',
      body: data,
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/autores/${id}`, {
      method: 'DELETE',
    });
  },
};
