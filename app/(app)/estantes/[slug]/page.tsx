import { GridEstante } from '@/app/(app)/estantes/components/GridEstante';
import { ListaEstante } from '@/app/(app)/estantes/components/ListaEstante';
import { BotaoVoltar } from '@/components/BotaoVoltar';
import { Estante, estantesApi } from '@/lib/api';
import { getUsuario } from '@/lib/dal';
import { getNicho } from '@/lib/utils';
import { Group, Title } from '@mantine/core';
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
  const estante: Estante | undefined = await estantesApi.buscarPorId(slug);
  const dono = estante?.donos.some((d) => d.id === usuario?.id) ?? false;

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
      <BotaoVoltar href="/estantes" />

      <Group gap={8}>
        <Title order={1} className="text-2xl" mb={8}>
          {estante.nome}
        </Title>
        <MembrosEstante
          usuarios={{
            donos: estante.donos,
            membros: estante.membros,
          }}
        />
        {dono && <AcoesEstante estante={estante} />}
      </Group>

      <GridEstante estante={estante} dono={dono} />

      {dono && <AcoesNicho />}

      <Title order={2} className="text-lg" mt={16} mb={8}>
        Livros na estante
      </Title>

      <ListaEstante />
    </EstanteContextProvider>
  );
}
