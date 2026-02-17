import { autoresApi } from './autores';
import { editorasApi } from './editoras';
import { estantesApi } from './estantes';
import { generosApi } from './generos';
import { livrosApi } from './livros';
import { usuariosApi } from './usuarios';

export { type Autor } from './autores';
export { type Editora } from './editoras';
export { type Estante } from './estantes';
export { type Genero } from './generos';
export { type Livro } from './livros';
export { type Usuario } from './usuarios';
export class Api {
  static readonly autores = autoresApi;
  static readonly editoras = editorasApi;
  static readonly estantes = estantesApi;
  static readonly generos = generosApi;
  static readonly livros = livrosApi;
  static readonly usuarios = usuariosApi;
}
