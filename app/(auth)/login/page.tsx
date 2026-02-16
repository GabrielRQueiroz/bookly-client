'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { z } from 'zod';
import { login } from '../actions';

const schema = z.object({
  email: z.string(),
  senha: z.string(),
});

export default function PaginaLogin() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parseResult = schema.safeParse({
      email,
      senha,
    });

    if (!parseResult.success) {
      notifications.show({
        title: 'Erro',
        message: 'Por favor, preencha todos os campos corretamente.',
        color: 'red',
      });
      return;
    }

    startTransition(async () => {
      await login(email, senha);
    });
  };

  return (
    <>
      <Text className="text-sm text-center text-gray-500 mt-2">
        Ainda não tem uma conta?{' '}
        <Anchor href="/registrar" component={Link}>
          Criar conta
        </Anchor>
      </Text>

      <Paper
        component={'form'}
        onSubmit={handleSubmit}
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
      >
        <TextInput
          label="Email"
          placeholder="email@provedor.com"
          required
          radius="md"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Senha"
          placeholder="Sua senha"
          required
          mt="md"
          radius="md"
          value={senha}
          onChange={(e) => setSenha(e.currentTarget.value)}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Lembrar de mim" />
          <Anchor component="button" size="sm">
            Esqueceu a senha?
          </Anchor>
        </Group>
        <Button type="submit" fullWidth mt="xl" radius="md" loading={isPending}>
          Entrar
        </Button>
      </Paper>
    </>
  );
}
