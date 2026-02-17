import 'server-only';

import { atualizarSessao, criarSessao, decrypt } from '@/lib/session';
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

  return session;
});

export const getAccessToken = cache(async () => {
  const session = await verificarSessao();

  if (!session) return null;

  const now = new Date();
  const expiresAt = new Date(session.expiresAt);

  if (expiresAt > now) {
    return session.token;
  } else {
    try {
      const response = await Api.usuarios.refreshToken(session.refreshToken);
      const newSession = {
        ...session,
        token: response.access_token,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };
      criarSessao(session.user, response.access_token, session.refreshToken);
      return newSession.token;
    } catch (error) {
      console.log('Erro ao atualizar token:', error);
      redirect('/login');
    }
  }
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
