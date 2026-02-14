import { cookies } from 'next/headers';

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) return null;

  // TODO validar JWT futuramente
  return { id: 1, name: 'Gabriel' };
}
