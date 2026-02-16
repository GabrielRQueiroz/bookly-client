'use server';

import { usuariosApi } from '@/lib/api';
import { criarSessao, excluirSessao } from '@/lib/session';
import { redirect } from 'next/navigation';
import z from 'zod';

export type FormRegistrar = z.infer<typeof schemaRegistrar>;

const schemaRegistrar = z
  .object({
    apelido: z.string().min(3, 'O apelido deve ter pelo menos 3 caracteres'),
    email: z.email('Email inválido'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    senhaConfirmacao: z.string(),
  })
  .refine((data) => data.senha === data.senhaConfirmacao, {
    message: 'As senhas são diferentes',
  });

const schemaLogin = z.object({
  email: z.email('Email inválido'),
  senha: z.string(),
});

export async function logout() {
  await excluirSessao();
  redirect('/login');
}

export async function registrar(previousState: any, formData: FormData) {
  const camposValidados = schemaRegistrar.safeParse({
    apelido: formData.get('apelido'),
    email: formData.get('email'),
    senha: formData.get('senha'),
    senhaConfirmacao: formData.get('senhaConfirmacao'),
  });

  console.log(camposValidados);
  
  if (!camposValidados.success) {
    const errors = z.treeifyError(camposValidados.error).properties;
    return {
      data: camposValidados.data ?? {
        apelido: '',
        email: '',
        senha: '',
        senhaConfirmacao: '',
      },
      errors,
    };
  }

  let response;

  try {
    response = await usuariosApi.criar(
      camposValidados.data.apelido,
      camposValidados.data.email,
      camposValidados.data.senha,
    );
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao registrar usuário',
    );
  }

  await criarSessao(response.user, response.accessToken);

  redirect('/');
}

export async function login(email: string, senha: string) {
  let response;
  try {
    const res = await usuariosApi.login(email, senha);
    response = res;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao fazer login',
    );
  }

  await criarSessao(response.user, response.accessToken);

  redirect('/');
}
