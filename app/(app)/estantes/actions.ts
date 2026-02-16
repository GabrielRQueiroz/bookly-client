'use server';

import { estantesApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type CriarEstanteInput = {
  nome: string;
  linhas: number;
  colunas: number;
};

export async function criarEstante(data: CriarEstanteInput) {
  let id;
  try {
    const response = await estantesApi.criar({
      nome: data.nome,
      linhas: data.linhas,
      colunas: data.colunas,
      livros: [],
    });
    id = response.id;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao criar estante',
    );
  }

  revalidatePath('/estantes');

  redirect(`/estantes/${id}`);
}
