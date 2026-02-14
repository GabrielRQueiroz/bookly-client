import { Card } from '@mantine/core';
import { EstantesFormulario } from '../EstantesFormulario';

export default function PaginaNovaEstante() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Nova Estante</h1>

      <Card shadow="sm" padding="lg" radius="md">
        <EstantesFormulario />
      </Card>
    </div>
  );
}
