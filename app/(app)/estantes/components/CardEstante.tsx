'use client';

import { Estante } from '@/lib/api/estantes';
import { Badge, Card, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { MembrosEstante } from './MembrosEstante';

export const CardEstante = ({
  estante,
  isDono = true,
}: {
  estante: Estante;
  isDono?: boolean;
}) => {
  'use client';
  return (
    <Card
      shadow="sm"
      padding="lg"
      className="hover:shadow-md transition cursor-pointer opacity-100 hover:opacity-75 focus:opacity-75"
      color="primary"
      component={Link}
      href={`/estantes/${estante.id}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{estante.nome}</h3>
        {isDono ? null : (
          <Badge className="pointer-events-none" size="sm" color="primary">
            Convidado
          </Badge>
        )}
      </div>

      <p className="text-sm text-gray-600">
        {estante.linhas} x {estante.colunas} nichos
      </p>

      <Group mt="md">
        <MembrosEstante
          readOnly
          tooltipDirection="bottom"
          usuarios={{
            donos: estante.usuarios.filter(
              (u) => u.cargo.toUpperCase() === 'DONO',
            ),
            membros: estante.usuarios.filter(
              (u) => u.cargo.toUpperCase() === 'MEMBRO',
            ),
          }}
        />
      </Group>
    </Card>
  );
};

export const CardEstanteNova = () => (
  <Card
    shadow="sm"
    padding="lg"
    className="
                hover:shadow-md transition cursor-pointer
                border-2 [border-opacity:0.5] border-dashed flex flex-col items-center 
                justify-center opacity-75 hover:opacity-100 focus:opacity-100
                "
    component={Link}
    href="/estantes/nova"
  >
    <IconPlus size={32} stroke={1.5} />
    <p className="font-medium">Nova estante</p>
  </Card>
);
