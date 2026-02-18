import { GridEstante } from '@/app/(app)/estantes/components/GridEstante';
import { ListaEstante } from '@/app/(app)/estantes/components/ListaEstante';
import { BotaoVoltar } from '@/components/BotaoVoltar';
import { Api, Estante } from '@/lib/api';
import { getUsuario } from '@/lib/dal';
import { getNicho } from '@/lib/utils';
import { Container, Group, Title } from '@mantine/core';
import { AcoesEstante } from '../components/AcoesEstante';
import { AcoesNicho } from '../components/AcoesNicho';
import { MembrosEstante } from '../components/MembrosEstante';
import { EstanteContextProvider } from '../contexts/EstanteContext';

export default async function PaginaEstante({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const usuario = await getUsuario();
  const estante: Estante | undefined = await Api.estantes.buscarPorId(slug);
  const dono =
    estante?.usuarios.some(
      (u) => u.id === usuario?.id && u.cargo.toUpperCase() === 'DONO',
    ) ?? false;

  if (!estante) {
    return null;
  }

  return (
    <EstanteContextProvider
      data={estante.livros.map((livro) => ({
        id: livro.id,
        titulo: livro.titulo,
        autores: livro.autores.map((a) => a.nome),
        editora: livro.editora.nome,
        generos: livro.generos,
        nicho: getNicho(livro.linha, livro.coluna),
      }))}
    >
      <Container>
        <BotaoVoltar href="/estantes" />

        <Group gap={8}>
          <Title order={1} className="text-2xl" mb={8}>
            {estante.nome}
          </Title>
          <MembrosEstante
            usuarios={{
              donos: estante.usuarios.filter(
                (u) => u.cargo.toUpperCase() === 'DONO',
              ),
              membros: estante.usuarios.filter(
                (u) => u.cargo.toUpperCase() === 'MEMBRO',
              ),
            }}
          />
          {dono && <AcoesEstante estante={estante} />}
        </Group>

        <GridEstante estante={estante} dono={dono} />

        {dono && <AcoesNicho estanteId={estante.id} />}

        <Title order={2} className="text-lg" mt={16} mb={8}>
          Livros na estante
        </Title>

        <ListaEstante />
      </Container>
    </EstanteContextProvider>
  );
}
