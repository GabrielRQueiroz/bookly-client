import { Usuario } from '../api';
import { ApiError } from '../errors';
import { readDb, writeDb } from './db';

const delay = () => new Promise((r) => setTimeout(r, 400));

const USUARIO_MOCK_ID = '1771213522449';

export async function getUsuario(): Promise<Usuario | null> {
  await delay();
  const db = await readDb();
  return db.usuarios.find((u: Usuario) => u.id === USUARIO_MOCK_ID) || null;
}

export async function login(
  email: string,
  senha: string,
): Promise<{ usuario: Usuario; access_token: string; refresh_token: string }> {
  await delay();
  const db = await readDb();
  const usuario = db.usuarios.find(
    (u: Usuario & { senha: string }) => u.email === email && u.senha === senha,
  );
  if (!usuario) {
    throw new ApiError('Credenciais inválidas', 401);
  }
  const { senha: _, ...resto } = usuario;
  return {
    usuario: resto,
    access_token: 'fake-token',
    refresh_token: 'fake-refresh-token',
  };
}

export async function criar(
  nome: string,
  email: string,
  senha: string,
): Promise<{ usuario: Usuario; access_token: string; refresh_token: string }> {
  await delay();
  const db = await readDb();
  const novo = {
    id: Date.now().toString(),
    nome,
    email,
    avatarUrl: null,
    estantes: [],
    senha,
  };
  db.usuarios.push(novo);
  await writeDb(db);
  return {
    usuario: novo,
    access_token: 'fake-token',
    refresh_token: 'fake-refresh-token',
  };
}

export async function listar(): Promise<Usuario[]> {
  await delay();
  const db = await readDb();
  return db.usuarios;
}

export async function buscarPorId(id: string): Promise<Usuario> {
  await delay();
  const db = await readDb();
  const usuario = db.usuarios.find((u: Usuario) => u.id === id);
  if (!usuario) {
    throw new ApiError('Usuário não encontrado', 404);
  }
  return usuario;
}

export async function atualizar(
  id: string,
  nome: string,
  email: string,
  avatarUrl?: string | null,
): Promise<Usuario> {
  await delay();
  const db = await readDb();
  const index = db.usuarios.findIndex((u: Usuario) => u.id === id);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  db.usuarios[index].nome = nome;
  db.usuarios[index].email = email;
  db.usuarios[index].avatarUrl = avatarUrl;
  await writeDb(db);
  return db.usuarios[index];
}

export async function remover(id: string): Promise<void> {
  await delay();
  const db = await readDb();
  const index = db.usuarios.findIndex((u: Usuario) => u.id === id);
  if (index !== -1) {
    db.usuarios.splice(index, 1);
    await writeDb(db);
  }
}

export async function buscarPorEmail(
  email: string,
): Promise<Usuario | undefined> {
  await delay();
  const db = await readDb();
  return db.usuarios.find((u: Usuario) => u.email === email);
}

export async function adicionarEstante(
  usuarioId: string,
  estanteId: string,
): Promise<void> {
  await delay();
  const db = await readDb();
  const usuario = db.usuarios.find((u: Usuario) => u.id === usuarioId);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  if (!usuario.estantesId.includes(estanteId)) {
    usuario.estantesId.push(estanteId);
  }
  await writeDb(db);
}

export async function removerEstante(
  usuarioId: string,
  estanteId: string,
): Promise<void> {
  await delay();
  const db = await readDb();
  const usuario = db.usuarios.find((u: Usuario) => u.id === usuarioId);
  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }
  const index = usuario.estantesId.indexOf(estanteId);
  if (index !== -1) {
    usuario.estantesId.splice(index, 1);
  }
  await writeDb(db);
}

export async function listarUsuariosPorEstante(
  estanteId: string,
): Promise<Usuario[]> {
  await delay();
  const db = await readDb();
  return db.usuarios.filter((u: Usuario) =>
    u.estantes.some((e) => e.id === estanteId),
  );
}
