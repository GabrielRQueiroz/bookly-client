'use client';

import { Badge, Card } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';

type Estante = {
  id: number;
  nome: string;
  linhas: number;
  colunas: number;
};

export default function PaginaEstantes() {
  const owned: Estante[] = [
    { id: 1, nome: 'Estante da Sala', linhas: 4, colunas: 5 },
    { id: 2, nome: 'Estante Escritório', linhas: 3, colunas: 4 },
  ];

  const invited: Estante[] = [
    { id: 3, nome: 'Estante do João', linhas: 5, colunas: 6 },
  ];

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <h1 className="text-2xl font-bold">Estantes</h1>

      {/* MINHAS ESTANTES */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Minhas Estantes</h2>

        {owned.length === 0 ? (
          <p className="text-gray-500">Você ainda não criou nenhuma estante.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {owned.map((estante) => (
              <CardEstante key={estante.id} estante={estante} />
            ))}

            {/* CARD DE ADICIONAR */}
            <Card
              shadow="sm"
              padding="lg"
              className="
              hover:shadow-md transition cursor-pointer
              border-2 [border-opacity:0.5] border-dashed flex flex-col items-center 
              justify-center opacity-75 hover:opacity-100
              "
              component={Link}
              href="/estantes/nova"
            >
              <IconPlus size={32} stroke={1.5} />
              <p className="font-medium">Nova estante</p>
            </Card>
          </div>
        )}
      </section>

      {/* ESTANTES COMPARTILHADAS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Compartilhadas Comigo</h2>

        {invited.length === 0 ? (
          <p className="text-gray-500">
            Você não foi convidado para nenhuma estante.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {invited.map((estante) => (
              <CardEstante key={estante.id} estante={estante} isDono={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const CardEstante = ({
  estante,
  isDono = true,
}: {
  estante: Estante;
  isDono?: boolean;
}) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      className="hover:shadow-md transition cursor-pointer"
      component={Link}
      href={`/estantes/${estante.id}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{estante.nome}</h3>
        <Badge color="primary">{isDono ? 'Dono' : 'Convidado'}</Badge>
      </div>

      <p className="text-sm text-gray-600">
        {estante.linhas} x {estante.colunas} nichos
      </p>
    </Card>
  );
};
