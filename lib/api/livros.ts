import { config } from '../config';
import { http } from '../http';
import * as mock from '../mocks/livros.mock';
import { Autor } from './autores';
import { Editora } from './editoras';
import { Genero } from './generos';

export type Livro = {
  id: string;
  titulo: string;
  autores: Autor[];
  generos: Genero[];
  editora: Editora;
};

export const livrosApi = {
  listarSeus: async (): Promise<Livro[]> => {
    if (config.useMock) return mock.listarMeus();
    return http<Livro[]>(`/livros/meus`, {
      credentials: 'include',
    });
  },

  listarDeOutros: async (): Promise<Livro[]> => {
    if (config.useMock) return mock.listarOutros();
    return http<Livro[]>(`/livros/outros`, {
      credentials: 'include',
    });
  },

  criar: async (data: Omit<Livro, 'id'> & {
    estanteId: string;
    coluna: number;
    linha: number;
  }): Promise<Livro> => {
    if (config.useMock) return mock.criar(data);
    return http<Livro>('/livros', {
      method: 'POST',
      credentials: 'include',
      body: data,
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/livros/${id}`, {
      credentials: 'include',
      method: 'DELETE',
    });
  },

  atualizar: async (id: string, data: Omit<Livro, 'id'>): Promise<Livro> => {
    if (config.useMock) return mock.atualizar(id, data);
    return http<Livro>(`/livros/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data,
    });
  },

  buscarPorId: async (id: string): Promise<Livro | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Livro>(`/livros/${id}`, {
      credentials: 'include',
    });
  },

  buscarPorTitulo: async (titulo: string): Promise<Livro | undefined> => {
    if (config.useMock) return mock.buscarPorTitulo(titulo);
    return http<Livro>(`/livros/titulo/${titulo}`, {
      credentials: 'include',
    });
  },

  buscarPorAutorNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorAutorNome(nome);
    return http<Livro[]>(`/livros/autor/${nome}`, {
      credentials: 'include',
    });
  },

  buscarPorGeneroNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorGeneroNome(nome);
    return http<Livro[]>(`/livros/genero/${nome}`, {
      credentials: 'include',
    });
  },

  buscarPorEditoraNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorEditoraNome(nome);
    return http<Livro[]>(`/livros/editora/${nome}`, {
      credentials: 'include',
    });
  },
};
