
import { Autor } from '../api/autores';
import { readDb, writeDb } from './db';


const delay = () => new Promise((r) => setTimeout(r, 400));

export async function criar(nome: string, nomeComum?: string): Promise<Autor> {
  await delay();
  const db = await readDb();
  const nova = { id: Date.now().toString(), nome, nomeComum };
  db.autores.push(nova);
  await writeDb(db);
  return nova;
}

export async function listar(): Promise<Autor[]> {
  await delay();
  const db = await readDb();
  return db.autores;
}

export async function buscarPorId(id: string): Promise<Autor | undefined> {
  await delay();
  const db = await readDb();
  return db.autores.find((a: Autor) => a.id === id);
}

export async function atualizar(
  id: string,
  nome: string,
  nomeComum?: string,
): Promise<Autor> {
  await delay();
  const db = await readDb();
  const index = db.autores.findIndex((a: Autor) => a.id === id);
  if (index === -1) {
    throw new Error('Autor não encontrado');
  }
  db.autores[index].nome = nome;
  db.autores[index].nomeComum = nomeComum;
  await writeDb(db);
  return db.autores[index];
}

export async function remover(id: string): Promise<void> {
  await delay();
  const db = await readDb();
  const index = db.autores.findIndex((a: Autor) => a.id === id);
  if (index !== -1) {
    db.autores.splice(index, 1);
    await writeDb(db);
  }
}

export async function buscarPorNome(nome: string): Promise<Autor | undefined> {
  await delay();
  const db = await readDb();
  return db.autores.find((a: Autor) => a.nome === nome);
}

export async function buscarPorNomeComum(
  nomeComum: string,
): Promise<Autor | undefined> {
  await delay();
  const db = await readDb();
  return db.autores.find((a: Autor) => a.nomeComum === nomeComum);
}
