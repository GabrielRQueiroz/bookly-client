import { ApiError } from './errors';

export async function handleHttpError(response: Response) {
  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    // Pode não ter body
  }

  const error = new ApiError(
    (data as any)?.message || 'Erro inesperado',
    response.status,
    data,
  );

  switch (response.status) {
    case 401:
      console.warn('Não autenticado');
      break;

    case 403:
      console.warn('Acesso negado');
      break;

    case 500:
      console.error('Erro interno do servidor');
      break;
  }

  throw error;
}
