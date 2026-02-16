import { Estante, Usuario } from '../api';
import type { Livro } from '../api/livros';
import { getUsuario } from '../dal';
import { readDb, writeDb } from './db';

function delay() {
  return new Promise((r) => setTimeout(r, 400));
}

export async function listarMeus(): Promise<Livro[]> {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const estantes = db.estantes.filter(
    (e: Estante) =>
      e.donos.some((d: Usuario) => d.id === user?.id) &&
      !e.membros.some((m: Usuario) => m.id === user?.id),
  );
  const livros: Livro[] = [];
  estantes.forEach((e: Estante) => {
    e.livros.forEach((l: Omit<Livro, 'estante'>) => {
      livros.push(l);
    });
  });
  return livros;
}

export async function listarOutros(): Promise<Livro[]> {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const estantes = db.estantes.filter(
    (e: Estante) =>
      e.membros.some((m: Usuario) => m.id === user?.id) &&
      !e.donos.some((d: Usuario) => d.id === user?.id),
  );
  const livros: Livro[] = [];
  estantes.forEach((e: Estante) => {
    e.livros.forEach((l: Omit<Livro, 'estante'>) => {
      livros.push(l);
    });
  });
  return livros;
}

export async function criar(
  data: Omit<Livro, 'id'> & {
    estanteId: string;
    coluna: number;
    linha: number;
  },
): Promise<Livro> {
  await delay();
  const user = await getUsuario();
  const db = await readDb();

  const estante = db.estantes.find((e: Estante) => e.id === data.estanteId);

  if (!estante) {
    throw new Error('Estante não encontrada');
  }
  if (!estante.donos.some((d: Usuario) => d.id === user?.id)) {
    throw new Error(
      'Usuário não tem permissão para adicionar livros nessa estante',
    );
  }

  const novo = { id: Date.now().toString(), ...data };

  db.livros.push(novo);
  db.estantes = db.estantes.map((e: Estante) => {
    if (e.id === data.estanteId) {
      return { ...e, livros: [...e.livros, novo] };
    }
    return e;
  });

  await writeDb(db);
  return novo;
}

export async function remover(id: string): Promise<void> {
  await delay();
  const user = await getUsuario();
  const db = await readDb();
  const livro = db.livros.find((l: Livro) => l.id === id);

  if (!livro) {
    throw new Error('Livro não encontrado');
  }

  const estante = db.estantes.find((e: Estante) => e.id === livro.estanteId);

  if (!estante) {
    throw new Error('Estante do livro não encontrada');
  }

  if (!estante.donos.some((d: Usuario) => d.id === user?.id)) {
    throw new Error(
      'Usuário não tem permissão para remover livros dessa estante',
    );
  }

  const index = db.livros.findIndex((l: Livro) => l.id === id);

  if (index !== -1) {
    db.livros.splice(index, 1);
    db.estantes = db.estantes.map((e: Estante) => {
      if (e.id === estante.id) {
        const livros = e.livros.filter(
          (l: Omit<Livro, 'estante'>) => l.id !== id,
        );
        return { ...e, livros };
      }
      return e;
    });
    await writeDb(db);
  }
}

export async function buscarPorId(id: string): Promise<Livro | undefined> {
  await delay();
  const db = await readDb();
  return db.livros.find((l: Livro) => l.id === id);
}

export async function atualizar(
  id: string,
  data: Omit<Livro, 'id'>,
): Promise<Livro> {
  await delay();
  const db = await readDb();
  const index = db.livros.findIndex((l: Livro) => l.id === id);
  if (index === -1) {
    throw new Error('Livro não encontrado');
  }
  db.livros[index] = { id, ...data };
  await writeDb(db);
  return db.livros[index];
}

export async function buscarPorTitulo(
  titulo: string,
): Promise<Livro | undefined> {
  await delay();
  const db = await readDb();
  return db.livros.find((l: Livro) => l.titulo === titulo);
}

export async function buscarPorAutorNome(nome: string): Promise<Livro[]> {
  await delay();
  const db = await readDb();
  return db.livros.filter((l: Livro) =>
    l.autores.some((a) => a.nome.toLowerCase().includes(nome.toLowerCase())),
  );
}

export async function buscarPorGeneroNome(nome: string): Promise<Livro[]> {
  await delay();
  const db = await readDb();
  return db.livros.filter((l: Livro) =>
    l.generos.some((g) => g.nome.toLowerCase().includes(nome.toLowerCase())),
  );
}

export async function buscarPorEditoraNome(nome: string): Promise<Livro[]> {
  await delay();
  const db = await readDb();
  return db.livros.filter((l: Livro) =>
    l.editora.nome.toLowerCase().includes(nome.toLowerCase()),
  );
}
