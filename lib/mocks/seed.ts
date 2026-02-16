import { Autor, Editora, Estante, Genero, Livro, Usuario } from '../api';
import { writeDb } from './db';

const generosMock = (): Genero[] => [
  {
    id: '1',
    nome: 'Ficção Científica',
    corHexa: '#33C1FF',
  },
  {
    id: '2',
    nome: 'Fantasia',
    corHexa: '#FFC133',
  },
  {
    id: '3',
    nome: 'Mistério',
    corHexa: '#FF33A1',
  },
  {
    id: '4',
    nome: 'Romance',
    corHexa: '#FF3366',
  },
  {
    id: '5',
    nome: 'Biografia',
    corHexa: '#33FF99',
  },
  {
    id: '6',
    nome: 'História',
    corHexa: '#FF9933',
  },
  {
    id: '7',
    nome: 'Terror',
    corHexa: '#FF3333',
  },
  {
    id: '8',
    nome: 'Suspense',
    corHexa: '#6666FF',
  },
  {
    id: '9',
    nome: 'Programação',
    corHexa: '#33FF57',
  },
];

const editorasMock = (): Editora[] => [
  { id: '1', nome: 'Editora A' },
  { id: '2', nome: 'Editora B' },
  { id: '3', nome: 'Editora C' },
  { id: '4', nome: 'Editora D' },
  { id: '5', nome: 'Editora E' },
];

const autoresMock = (): Autor[] => [
  {
    id: '1',
    nome: 'J.K. Rowling',
  },
  {
    id: '2',
    nome: 'George R.R. Martin',
  },
  {
    id: '3',
    nome: 'J.R.R. Tolkien',
  },
  {
    id: '4',
    nome: 'Agatha Christie',
  },
  {
    id: '5',
    nome: 'Stephen King',
  },
  {
    id: '6',
    nome: 'Isaac Asimov',
  },
  {
    id: '7',
    nome: 'Robert C. Martin',
  },
  {
    id: '8',
    nome: 'Frederick P. Brooks Jr.',
  },
  {
    id: '9',
    nome: 'Martin Fowler',
  },
  {
    id: '10',
    nome: 'Kent Beck',
  },
  {
    id: '11',
    nome: 'Brad Smith',
  },
  {
    id: '12',
    nome: 'Douglas Adams',
  },
  {
    id: '13',
    nome: 'George Orwell',
  },
];

const usuariosMock = (): (Usuario & { senha: string })[] => [
  {
    id: '1',
    nome: 'Alice',
    email: 'alice@example.com',
    avatarUrl: '',
    estantes: [
      { id: '1', role: 'dono' },
      { id: '2', role: 'membro' },
    ],
    senha: '123456',
  },
  {
    id: '2',
    nome: 'Bob',
    email: 'bob@example.com',
    avatarUrl: '',
    estantes: [
      {
        id: '1',
        role: 'membro',
      },
      {
        id: '2',
        role: 'dono',
      },
    ],
    senha: '123456',
  },
  {
    id: '3',
    nome: 'Charlie',
    email: 'charlie@example.com',
    avatarUrl: '',
    estantes: [{ id: '1', role: 'membro' }],
    senha: '123456',
  },
  {
    id: '4',
    nome: 'Diana',
    email: 'diana@example.com',
    avatarUrl: '',
    estantes: [{ id: '1', role: 'membro' }],
    senha: '123456',
  },
  {
    id: '5',
    nome: 'Eve',
    email: 'eve@example.com',
    avatarUrl: '',
    estantes: [{ id: '1', role: 'membro' }],
    senha: '123456',
  },
];
const livrosMock = (
  autores: Autor[],
  generos: Genero[],
  editoras: Editora[],
): Livro[] => [
  {
    id: '1',
    titulo: 'Clean Code',
    autores: [autores.find((a) => a.nome === 'Robert C. Martin')!],
    generos: [generos.find((g) => g.nome === 'Programação')!],
    editora: editoras.find((e) => e.nome === 'Editora A')!,
  },
  {
    id: '2',
    titulo: 'Domain Driven Design',
    autores: [autores.find((a) => a.nome === 'Martin Fowler')!],
    generos: [generos.find((g) => g.nome === 'Programação')!],
    editora: editoras.find((e) => e.nome === 'Editora B')!,
  },
  {
    id: '4',
    titulo: 'Refatoração',
    autores: [
      autores.find((a) => a.nome === 'Martin Fowler')!,
      autores.find((a) => a.nome === 'Kent Beck')!,
    ],
    generos: [generos.find((g) => g.nome === 'Programação')!],
    editora: editoras.find((e) => e.nome === 'Editora C')!,
  },
  {
    id: '5',
    titulo: 'Armas e Ferramentas',
    autores: [autores.find((a) => a.nome === 'Brad Smith')!],
    generos: [generos.find((g) => g.nome === 'Programação')!],
    editora: editoras.find((e) => e.nome === 'Editora D')!,
  },
  {
    id: '6',
    titulo: 'Arquitetura Limpa',
    autores: [autores.find((a) => a.nome === 'Martin Fowler')!],
    generos: [generos.find((g) => g.nome === 'Programação')!],
    editora: editoras.find((e) => e.nome === 'Editora E')!,
  },

  {
    id: '7',
    titulo: 'O Guia do Mochileiro das Galáxias',
    autores: [autores.find((a) => a.nome === 'Douglas Adams')!],
    generos: [generos.find((g) => g.nome === 'Fantasia')!],
    editora: editoras.find((e) => e.nome === 'Editora A')!,
  },
  {
    id: '8',
    titulo: '1984',
    autores: [autores.find((a) => a.nome === 'George Orwell')!],
    generos: [generos.find((g) => g.nome === 'Ficção Científica')!],
    editora: editoras.find((e) => e.nome === 'Editora B')!,
  },
];

const estantesMock = (usuarios: Usuario[], livros: Livro[]): Estante[] => [
  {
    id: '1',
    donos: usuarios.filter((u) =>
      u.estantes.some((e) => e.id === '1' && e.role === 'dono'),
    ),
    membros: usuarios.filter((u) =>
      u.estantes.some((e) => e.id === '1' && e.role === 'membro'),
    ),
    nome: 'Estante da Sala',
    linhas: 4,
    colunas: 5,
    livros: livros.slice(0, 5).map((l) => {
      return {
        ...l,
        linha: Math.floor(Math.random() * 4) + 1,
        coluna: Math.floor(Math.random() * 5) + 1,
      };
    }),
  },
  {
    id: '2',
    donos: usuarios.filter((u) =>
      u.estantes.some((e) => e.id === '2' && e.role === 'dono'),
    ),
    membros: usuarios.filter((u) =>
      u.estantes.some((e) => e.id === '2' && e.role === 'membro'),
    ),
    nome: 'Estante da Cozinha',
    linhas: 3,
    colunas: 4,
    livros: livros.slice(5).map((l) => {
      return {
        ...l,
        linha: Math.floor(Math.random() * 4) + 1,
        coluna: Math.floor(Math.random() * 5) + 1,
      };
    }),
  },
];

export function generateSeed() {
  const autores = autoresMock();
  const editoras = editorasMock();
  const generos = generosMock();
  const usuarios = usuariosMock();
  const livros = livrosMock(autores, generos, editoras);
  const estantes = estantesMock(usuarios, livros);

  console.log({
    autores,
    editoras,
    generos,
    usuarios,
    estantes,
    livros,
  });

  return {
    autores,
    editoras,
    generos,
    usuarios,
    estantes,
    livros,
  };
}

export async function seedDatabase() {
  const data = generateSeed();
  await writeDb(data);
}

export async function resetDatabase() {
  await seedDatabase();
}
