export type Livro = {
  id: string;
  titulo: string;
  linha: number;
  coluna: number;
};

export type Estante = {
  id: string;
  nome: string;
  linhas: number;
  colunas: number;
  livros: Livro[];
}

export type Nicho = {
  id: string;
  estanteId: string;
  linha: number;
  coluna: number;
  livros?: Livro[];
}