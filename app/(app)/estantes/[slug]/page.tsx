import { GridEstante } from '@/components/GridEstante';
import { ListaEstante, ListaEstanteLegado } from '@/components/ListaEstante';
import { Estante } from '@/lib/definitions';
import { Title } from '@mantine/core';

export default function PaginaEstante() {
  const estante: Estante = {
    id: '1',
    nome: 'Estante da Sala',
    linhas: 4,
    colunas: 5,
    livros: [
      { id: '1', titulo: 'Clean Code', linha: 1, coluna: 1 },
      { id: '2', titulo: 'Domain Driven Design', linha: 2, coluna: 3 },
      { id: '3', titulo: 'O Poder do Hábito', linha: 1, coluna: 1 },
      { id: '4', titulo: 'Refatoração', linha: 1, coluna: 1 },
      { id: '5', titulo: 'O Andar do Bêbado', linha: 1, coluna: 1 },
      { id: '6', titulo: 'Sapiens', linha: 1, coluna: 1 },
    ],
  };

  return (
    <div>
      <Title order={1} mb={8}>
        {estante.nome}
      </Title>

      <GridEstante
        linhas={estante.linhas}
        colunas={estante.colunas}
        livros={estante.livros}
      />

      <Title order={2} mt={16} mb={8}>
        Livros na estante
      </Title>

      <ListaEstante livros={estante.livros} />
    </div>
  );
}
