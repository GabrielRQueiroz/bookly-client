import 'server-only';

import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { Api } from './api';
import { SessionPayload } from './definitions';

export const verificarSessao = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = (await decrypt(cookie)) as SessionPayload;

  if (!session?.user?.id) {
    redirect('/login');
  }

  return { isAuth: true, user: session.user, token: session.token };
});

export const getUsuario = cache(async () => {
  const session = await verificarSessao();

  if (!session) return null;

  try {
    const data = await Api.usuarios.buscarPorId(session.user.id);

    return data || null;
  } catch (error) {
    console.log('Erro ao buscar usuário:', error);
    return null;
  }
});
