import { config } from "../config";
import { http } from "../http";
import * as mock from "../mocks/editoras.mock";

export type Editora = {
  id: string;
  nome: string;
};

export const editorasApi = {
  listar: async (): Promise<Editora[]> => {
    if (config.useMock) return mock.listar();
    return http<Editora[]>('/editoras');
  },

  criar: async (data: Omit<Editora, 'id'>): Promise<Editora> => {
    if (config.useMock) return mock.criar(data.nome);
    return http<Editora>('/editoras', {
      method: 'POST',
      body: data,
    });
  },

  buscarPorId: async (id: string): Promise<Editora | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Editora>(`/editoras/${id}`);
  },

  atualizar: async (id: string, data: Omit<Editora, 'id'>): Promise<Editora> => {
    if (config.useMock) return mock.atualizar(id, data.nome);
    return http<Editora>(`/editoras/${id}`, {
      method: 'PUT',
      body: data,
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/editoras/${id}`, {
      method: 'DELETE',
    });
  },
};