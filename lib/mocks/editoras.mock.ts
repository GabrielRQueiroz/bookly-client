import { Editora } from "../api/editoras";
import { readDb, writeDb } from "./db";

const delay = () => new Promise((r) => setTimeout(r, 400));

export async function criar(nome: string): Promise<Editora> {
  await delay();
  const db = await readDb();
  const nova = { id: Date.now().toString(), nome };
  db.editoras.push(nova);
  await writeDb(db);
  return nova;
}

export async function listar(): Promise<Editora[]> {
  await delay();
  const db = await readDb();
  return db.editoras;
}

export async function buscarPorId(id: string): Promise<Editora | undefined> {
  await delay();
  const db = await readDb();
  return db.editoras.find((e: Editora) => e.id === id);
}

export async function atualizar(id: string, nome: string): Promise<Editora> {
  await delay();
  const db = await readDb();
  const index = db.editoras.findIndex((e: Editora) => e.id === id);
  if (index === -1) {
    throw new Error('Editora não encontrada');
  }
  db.editoras[index].nome = nome;
  await writeDb(db);
  return db.editoras[index];
}

export async function remover(id: string): Promise<void> {
  await delay();
  const db = await readDb();
  const index = db.editoras.findIndex((e: Editora) => e.id === id);
  if (index !== -1) {
    db.editoras.splice(index, 1);
    await writeDb(db);
  }
}
