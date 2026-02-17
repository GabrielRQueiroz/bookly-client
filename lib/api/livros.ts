import { config } from '../config';
import { getAccessToken } from '../dal';
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

export type CriarLivro = {
  titulo: string;
  autoresId: string[];
  generosId: string[];
  editoraId: string;
  estante?: {
    id: string;
    coluna: number;
    linha: number;
  };
};

export const livrosApi = {
  listarSeus: async (): Promise<Livro[]> => {
    if (config.useMock) return mock.listarMeus();
    return http<Livro[]>(`/livros/meus`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  listarDeOutros: async (): Promise<Livro[]> => {
    if (config.useMock) return mock.listarOutros();
    return http<Livro[]>(`/livros/outros`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  criar: async (data: CriarLivro): Promise<Livro> => {
    if (config.useMock) return mock.criar(data);
    return http<Livro>('/livros', {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      body: data,
      next: {
        tags: ['livros'],
      },
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/livros/${id}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      method: 'DELETE',
      next: {
        tags: ['livros'],
      },
    });
  },

  atualizar: async (id: string, data: Omit<Livro, 'id'>): Promise<Livro> => {
    if (config.useMock) return mock.atualizar(id, data);
    return http<Livro>(`/livros/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      body: data,
      next: {
        tags: ['livros'],
      },
    });
  },

  buscarPorId: async (id: string): Promise<Livro | undefined> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Livro>(`/livros/${id}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  buscarPorTitulo: async (titulo: string): Promise<Livro | undefined> => {
    if (config.useMock) return mock.buscarPorTitulo(titulo);
    return http<Livro>(`/livros/titulo/${titulo}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  buscarPorAutorNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorAutorNome(nome);
    return http<Livro[]>(`/livros/autor/${nome}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  buscarPorGeneroNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorGeneroNome(nome);
    return http<Livro[]>(`/livros/genero/${nome}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },

  buscarPorEditoraNome: async (nome: string): Promise<Livro[]> => {
    if (config.useMock) return mock.buscarPorEditoraNome(nome);
    return http<Livro[]>(`/livros/editora/${nome}`, {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${await getAccessToken()}`,
      },
      next: {
        tags: ['livros'],
      },
    });
  },
};
