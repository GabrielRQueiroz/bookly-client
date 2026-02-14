'use client';

import { Button, Group, NumberInput, TextInput } from '@mantine/core';
import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  linhas: z.number().min(1, 'Mínimo 1 linha').max(26, 'Máximo 26 linhas'),
  colunas: z.number().min(1, 'Mínimo 1 coluna').max(50, 'Máximo 50 colunas'),
});

export const EstantesFormulario = () => {
  const [nome, setNome] = useState('');
  const [fileiras, setFileiras] = useState<number | string>(4);
  const [colunas, setColunas] = useState<number | string>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setErrors({});

    const result = schema.safeParse({
      nome,
      linhas: Number(fileiras),
      colunas: Number(colunas),
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      // 🔥 Aqui você chamará seu backend depois
      console.log('Criando estante:', result.data);

      // Simulação
      await new Promise((resolve) => setTimeout(resolve, 800));

      alert('Estante criada com sucesso!');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <TextInput
        label="Nome da Estante"
        placeholder="Ex: Estante da Sala"
        value={nome}
        onChange={(e) => setNome(e.currentTarget.value)}
        error={errors.nome}
      />

      <Group grow wrap="wrap">
        <NumberInput
          className="w-full"
          label="Número de fileiras"
          value={fileiras}
          onChange={(value) => setFileiras(value === null ? 1 : value)}
          min={1}
          max={26}
          error={errors.linhas}
        />

        <NumberInput
          className="w-full"
          label="Número de colunas"
          value={colunas}
          onChange={(value) => setColunas(value === null ? 1 : value)}
          min={1}
          max={50}
          error={errors.colunas}
        />
      </Group>

      <Button fullWidth onClick={handleSubmit} loading={loading}>
        Criar Estante
      </Button>
    </div>
  );
};
