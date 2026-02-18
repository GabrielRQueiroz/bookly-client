'use server';

import { Usuario } from '../api';
import { CriarEstanteInput, Estante, ListaEstantes } from '../api/estantes';
import { ApiError } from '../errors';
import { readDb, writeDb } from './db';
import { getUsuario } from './usuarios.mock';

const delay = () => new Promise((r) => setTimeout(r, 400));

export const listar = async (): Promise<ListaEstantes> => {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  return {
    dono: db.estantes.filter((e: Estante) =>
      e.usuarios.filter((u) => u.cargo.toUpperCase() === "DONO").some((d) => d.id === user?.id),
    ),
    convidado: db.estantes.filter((e: Estante) =>
      e.usuarios.filter((u) => u.cargo.toUpperCase() === "MEMBRO").some((m) => m.id === user?.id),
    ),
  };
};

export const criar = async (
  data: CriarEstanteInput
): Promise<Estante> => {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const userDb = db.usuarios.find((u: Usuario) => u.id === user?.id);
  console.log(userDb);
  const nova = {
    id: Date.now().toString(),
    ...data,
    usuarios: [
      {
        ...userDb,
        cargo: 'DONO',
      },
    ],
    livros: [],
  };
  db.estantes.push(nova);
  db.usuarios = db.usuarios.map((u: Usuario) => {
    if (u.id === user?.id) {
      return { ...u, estantes: [...u.estantes, { id: nova.id, cargo: 'DONO' }] };
    }
    return u;
  });
  await writeDb(db);
  return nova;
};

export const buscarPorId = async (id: string): Promise<Estante | undefined> => {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const estante = db.estantes.find(
    (e: Estante) =>
      e.id === id &&
      e.usuarios.some((u) => u.id === user?.id),
  );

  if (!estante) {
    throw new ApiError('Estante não encontrada', 404);
  }

  return estante;
};

export const atualizar = async (
  id: string,
  data: Omit<Estante, 'id'>,
): Promise<Estante> => {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const index = db.estantes.findIndex(
    (e: Estante) =>
      e.id === id && e.usuarios.some((u) => u.id === user?.id && u.cargo.toUpperCase() === "DONO"),
  );
  if (index === -1) {
    throw new ApiError('Estante não encontrada', 400);
  }

  db.estantes[index] = { id, ...data };
  await writeDb(db);
  return db.estantes[index];
};

export const remover = async (id: string): Promise<void> => {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const index = db.estantes.findIndex(
    (e: Estante) =>
      e.id === id && e.usuarios.some((u) => u.id === user?.id && u.cargo.toUpperCase() === "DONO"),
  );
  if (index !== -1) {
    db.estantes.splice(index, 1);
    await writeDb(db);
  }
};
