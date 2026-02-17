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
import { useActionState, useEffect, useState } from 'react';
import { login, LoginState } from '../actions';

const initialState: LoginState = {
  data: { email: '', senha: '' },
};

export default function PaginaLogin() {
  const [{ data, errors, notification }, formAction, pending] = useActionState(
    login,
    initialState,
  );
  const [email, setEmail] = useState(data.email);
  const [senha, setSenha] = useState(data.senha);

  useEffect(() => {
    if (notification) {
      notifications.show({
        title: notification.title,
        message: notification.message,
        color: notification.color,
      });
    }
  }, [data]);

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
        action={formAction}
        withBorder
        shadow="sm"
        p={22}
        mt={30}
        radius="md"
      >
        <TextInput
          label="Email"
          name="email"
          placeholder="email@provedor.com"
          required
          radius="md"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={errors?.email ? errors.email.errors.join(', ') : null}
        />
        <PasswordInput
          label="Senha"
          name="senha"
          placeholder="Sua senha"
          required
          mt="md"
          radius="md"
          value={senha}
          onChange={(e) => setSenha(e.currentTarget.value)}
          error={errors?.senha ? errors.senha.errors.join(', ') : null}
        />

        <Group justify="space-between" mt="lg">
          <Checkbox label="Lembrar de mim" />
          <Anchor component="button" size="sm">
            Esqueceu a senha?
          </Anchor>
        </Group>

        <Button type="submit" fullWidth mt="xl" radius="md" loading={pending}>
          Entrar
        </Button>
      </Paper>
    </>
  );
}
