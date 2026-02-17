'use client';

import {
  Button,
  Group,
  LoadingOverlay,
  NumberInput,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { criarEstante } from '../actions';

const schema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  linhas: z.number().min(1, 'Mínimo 1 linha').max(26, 'Máximo 26 linhas'),
  colunas: z.number().min(1, 'Mínimo 1 coluna').max(50, 'Máximo 50 colunas'),
});

export const FormularioEstantes = ({ onSucess }: { onSucess: () => void }) => {
  const [nome, setNome] = useState('');
  const [fileiras, setFileiras] = useState<number | string>(1);
  const [colunas, setColunas] = useState<number | string>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    startTransition(async () => {
      await criarEstante({
        nome,
        linhas: Number(fileiras),
        colunas: Number(colunas),
      })
        .catch((error: unknown) => {
          notifications.show({
            title: 'Não foi possível criar a estante',
            message:
              error instanceof Error
                ? error.message
                : 'Ocorreu um erro desconhecido',
            color: 'red',
          });
        })
        .then(() => {
          onSucess();
        });
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <LoadingOverlay
        visible={isPending}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />

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

      <Button fullWidth type="submit" loading={isPending}>
        Criar Estante
      </Button>
    </form>
  );
};
