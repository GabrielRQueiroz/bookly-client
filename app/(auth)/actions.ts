'use server';

import { usuariosApi } from '@/lib/api';
import { criarSessao, excluirSessao } from '@/lib/session';
import { redirect } from 'next/navigation';
import z from 'zod';

export type FormRegistrar = z.infer<typeof schemaRegistrar>;

export type FormLogin = z.infer<typeof schemaLogin>;

export type RegistrarState = {
  data: FormRegistrar;
  errors?: { [key: string]: string };
  notification?: { title: string; message: string; color: string };
};

export type LoginState = {
  data: FormLogin;
  errors?: Record<string, any>;
  notification?: { title: string; message: string; color: string };
};

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

  if (!camposValidados.success) {
    const errors = z.treeifyError(camposValidados.error).properties;
    return {
      data: camposValidados.data ?? {
        apelido: previousState?.data?.apelido ?? '',
        email: previousState?.data?.email ?? '',
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
    return {
      data: {
        apelido: camposValidados.data.apelido,
        email: camposValidados.data.email,
        senha: '',
        senhaConfirmacao: '',
      },
      notification: {
        title: 'Não foi possível criar a conta',
        message:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro ao criar a conta',
        color: 'red',
      },
    };
  }

  await criarSessao(response.user, response.accessToken);

  redirect('/');
}

export async function login(
  previousState: any,
  formData: FormData,
): Promise<LoginState> {
  const camposValidados = schemaLogin.safeParse({
    email: formData.get('email'),
    senha: formData.get('senha'),
  });

  if (!camposValidados.success) {
    const errors = z.treeifyError(camposValidados.error).properties;
    return {
      data: camposValidados.data ?? {
        email: previousState?.data?.email ?? '',
        senha: '',
      },
      errors,
    };
  }

  const { email, senha } = camposValidados.data;

  let response;
  try {
    const res = await usuariosApi.login(email, senha);
    response = res;
  } catch (error) {
    return {
      data: {
        email,
        senha: '',
      },
      notification: {
        title: 'Não foi possível fazer o login',
        message:
          error instanceof Error ? error.message : 'Email ou senha inválidos',
        color: 'red',
      },
    };
  }

  await criarSessao(response.user, response.accessToken);

  redirect('/');
}
