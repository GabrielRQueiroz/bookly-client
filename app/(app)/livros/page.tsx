import { Layout, LayoutSection } from '@/components/Layout';
import { Livro, Api } from '@/lib/api';
import { getUsuario } from '@/lib/dal';
import { List, ListItem } from '@mantine/core';

export default async function PaginaLivros() {
  const usuario = await getUsuario();
  const livros: Livro[] = await Api.livros.listarSeus();
  const outros: Livro[] = await Api.livros.listarDeOutros();

  return (
    <Layout titulo="Livros">
      <LayoutSection titulo="Livros em minhas estantes">
        {livros.length === 0 ? (
          <p className="text-gray-500">
            Você ainda não tem livros em suas estantes.
          </p>
        ) : (
          <List>
            {livros.map((livro) => (
              <ListItem key={livro.id}>{livro.titulo}</ListItem>
            ))}
          </List>
        )}
      </LayoutSection>
      <LayoutSection titulo="Livros de estantes compartilhadas">
        {outros.length === 0 ? (
          <p className="text-gray-500">
            Nenhum livro encontrado em estantes compartilhadas.
          </p>
        ) : (
          <List>
            {outros.map((livro) => (
              <ListItem key={livro.id}>{livro.titulo}</ListItem>
            ))}
          </List>
        )}
      </LayoutSection>
    </Layout>
  );
}
