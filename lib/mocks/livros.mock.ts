import { Autor, Editora, Estante, Genero, Usuario } from '../api';
import type { CriarLivro, Livro } from '../api/livros';
import { getUsuario } from '../mocks/usuarios.mock';
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
      e.usuarios.filter(u => u.cargo.toLowerCase() === "dono").some((d: Usuario) => d.id === user?.id) &&
      !e.usuarios.filter(u => u.cargo.toLowerCase() === "membro").some((m: Usuario) => m.id === user?.id),
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
      e.usuarios.filter(u => u.cargo.toLowerCase() === "membro").some((m: Usuario) => m.id === user?.id) &&
      !e.usuarios.filter(u => u.cargo.toLowerCase() === "dono").some((d: Usuario) => d.id === user?.id),
  );
  const livros: Livro[] = [];
  estantes.forEach((e: Estante) => {
    e.livros.forEach((l: Omit<Livro, 'estante'>) => {
      livros.push(l);
    });
  });
  return livros;
}

export async function criar(data: CriarLivro): Promise<Livro> {
  await delay();
  const user = await getUsuario();
  const db = await readDb();

  if (data.estante) {
    const estante = db.estantes.find((e: Estante) => e.id === data.estante?.id);

    if (!estante) {
      throw new Error('Estante não encontrada');
    }
    if (!estante.donos.some((d: Usuario) => d.id === user?.id)) {
      throw new Error(
        'Usuário não tem permissão para adicionar livros nessa estante',
      );
    }
  }

  const editora = db.editoras.find((e: Editora) => e.id === data.editoraId);
  if (!editora) {
    throw new Error('Editora não encontrada');
  }

  const autores = db.autores.filter((a: Autor) =>
    data.autoresId.includes(a.id),
  );

  console.log('Autores encontrados:', autores);
  console.log('Autores informados:', data.autoresId);
  
  if (autores.length !== data.autoresId.length) {
    throw new Error('Algum autor não encontrado');
  }

  const generos = db.generos.filter((g: Genero) =>
    data.generosId.includes(g.id),
  );
  
  if (generos.length !== data.generosId.length) {
    throw new Error('Algum gênero não encontrado');
  }

  const { titulo } = data;

  const novo = {
    id: Date.now().toString(),
    titulo,
    autores,
    generos,
    editora,
  };

  db.livros.push(novo);

  if (data.estante)
    db.estantes = db.estantes.map((e: Estante) => {
      if (e.id === data.estante?.id) {
        return {
          ...e,
          livros: [
            ...e.livros,
            {
              ...novo,
              coluna: data.estante?.coluna || 1,
              linha: data.estante?.linha || 1,
            },
          ],
        };
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
