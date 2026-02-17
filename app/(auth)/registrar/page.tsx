'use client';

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { FormRegistrar, registrar } from '../actions';

const iniitalData: {
  data: FormRegistrar;
  errors: Record<string, string>;
} = {
  data: { apelido: '', email: '', senha: '', senhaConfirmacao: '' },
  errors: {},
};

export default function PaginaRegistrar() {
  const [{ data, errors }, formAction, pending] = useActionState(
    registrar,
    iniitalData,
  );
  const [apelido, setApelido] = useState(data.apelido);
  const [email, setEmail] = useState(data.email);
  const [senha, setSenha] = useState(data.senha);
  const [senhaConfirmacao, setSenhaConfirmacao] = useState(
    data.senhaConfirmacao,
  );

  return (
    <>
      <Text className="text-sm text-center text-gray-500 mt-2">
        Já tem uma conta?{' '}
        <Anchor href="/login" component={Link}>
          Entrar
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
          label="Apelido"
          name="apelido"
          placeholder="Seu apelido"
          required
          radius="md"
          value={apelido}
          onChange={(e) => setApelido(e.currentTarget.value)}
          error={errors?.apelido ? errors.apelido.errors.join(', ') : undefined}
        />

        <TextInput
          label="Email"
          name="email"
          placeholder="email@provedor.com"
          required
          radius="md"
          mt="md"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          error={errors?.email ? errors.email.errors.join(', ') : undefined}
        />

        <PasswordInput
          value={senha}
          onChange={(e) => setSenha(e.currentTarget.value)}
          placeholder="Sua senha"
          label="Senha"
          name="senha"
          radius="md"
          required
          mt="md"
          error={errors?.senha ? errors.senha.errors.join(', ') : undefined}
        />

        <PasswordInput
          label="Confirmação de senha"
          name="senhaConfirmacao"
          placeholder="Confirme sua senha"
          radius="md"
          required
          mt="md"
          value={senhaConfirmacao}
          onChange={(e) => setSenhaConfirmacao(e.currentTarget.value)}
          error={
            errors?.senhaConfirmacao
              ? errors.senhaConfirmacao.errors.join(', ')
              : undefined
          }
        />
        <Button type="submit" fullWidth mt="xl" radius="md" loading={pending}>
          Registrar
        </Button>
      </Paper>
    </>
  );
}
