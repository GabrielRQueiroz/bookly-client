import { config } from '../config';
import { http } from '../http';
import * as mock from '../mocks/usuarios.mock';

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  avatarUrl: string | null;
  estantes: {
    id: string;
    role: 'dono' | 'membro';
  }[];
};

export const usuariosApi = {
  login: async (
    email: string,
    senha: string,
  ): Promise<{
    usuario: Usuario;
    access_token: string;
    refresh_token: string;
  }> => {
    if (config.useMock) return mock.login(email, senha);
    return http<{
      usuario: Usuario;
      access_token: string;
      refresh_token: string;
    }>('auth/login', {
      method: 'POST',
      body: { email, senha },
    });
  },

  criar: async (
    nome: string,
    email: string,
    senha: string,
  ): Promise<{
    usuario: Usuario;
    access_token: string;
    refresh_token: string;
  }> => {
    if (config.useMock) return mock.criar(nome, email, senha);
    return http<{
      usuario: Usuario;
      access_token: string;
      refresh_token: string;
    }>('auth/registrar', {
      method: 'POST',
      body: { nome, email, senha },
    });
  },

  listar: async (): Promise<Usuario[]> => {
    if (config.useMock) return mock.listar();
    return http<Usuario[]>('/usuarios');
  },

  buscarPorId: async (id: string): Promise<Usuario> => {
    if (config.useMock) return mock.buscarPorId(id);
    return http<Usuario>(`/usuarios/${id}`);
  },

  atualizar: async (data: Usuario): Promise<Usuario> => {
    if (config.useMock)
      return mock.atualizar(data.id, data.nome, data.email, data.avatarUrl);
    return http<Usuario>(`/usuarios/${data.id}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
  },

  remover: async (id: string): Promise<void> => {
    if (config.useMock) return mock.remover(id);
    await http(`/usuarios/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  },

  adicionarEstante: async (
    usuarioId: string,
    estanteId: string,
  ): Promise<void> => {
    if (config.useMock) return mock.adicionarEstante(usuarioId, estanteId);
    await http(`/usuarios/${usuarioId}/estantes/${estanteId}`, {
      method: 'POST',
      credentials: 'include',
    });
  },

  removerEstante: async (
    usuarioId: string,
    estanteId: string,
  ): Promise<void> => {
    if (config.useMock) return mock.removerEstante(usuarioId, estanteId);
    await http(`/usuarios/${usuarioId}/estantes/${estanteId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
  },

  listarUsuariosPorEstante: async (estanteId: string): Promise<Usuario[]> => {
    if (config.useMock) return mock.listarUsuariosPorEstante(estanteId);
    return http<Usuario[]>(`/usuarios/estantes/${estanteId}`, {
      credentials: 'include',
    });
  },
};
