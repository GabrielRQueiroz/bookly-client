'use client';

import { BotaoVoltar } from '@/components/BotaoVoltar';
import { Card } from '@mantine/core';
import { redirect } from 'next/navigation';
import { FormularioEstantes } from '../components/FormularioEstantes';

export default function PaginaNovaEstante() {
  return (
    <div className="max-w-xl mx-auto">
      <BotaoVoltar />
      <h1 className="text-2xl font-bold mb-6">Nova Estante</h1>

      <Card shadow="sm" padding="lg" radius="md">
        <FormularioEstantes onSucess={() => redirect('/estantes')} />
      </Card>
    </div>
  );
}
