import { Genero } from "../api/generos";
import { readDb, writeDb } from "./db";

const delay = () => new Promise((r) => setTimeout(r, 400));

export async function criar(nome: string, corHexa: string): Promise<Genero> {
  await delay();
  const db = await readDb();
  const novo = { id: Date.now().toString(), nome, corHexa };
  db.generos.push(novo);
  await writeDb(db);
  return novo;
}

export async function listar(): Promise<Genero[]> {
  await delay();
  const db = await readDb();
  return db.generos;
}

export async function buscarPorId(id: string): Promise<Genero | undefined> {
  await delay();
  const db = await readDb();
  return db.generos.find((g: Genero) => g.id === id);
}

export async function remover(id: string): Promise<void> {
  await delay();
  const db = await readDb();
  const index = db.generos.findIndex((g: Genero) => g.id === id);
  if (index !== -1) {
    db.generos.splice(index, 1);
    await writeDb(db);
  }
}

export async function atualizar(
  id: string,
  nome: string,
  corHexa: string,
): Promise<Genero> {
  await delay();
  const db = await readDb();
  const genero = db.generos.find((g: Genero) => g.id === id);
  if (!genero) {
    throw new Error('Gênero não encontrado');
  }
  genero.nome = nome;
  genero.corHexa = corHexa;
  await writeDb(db);
  return genero;
}
