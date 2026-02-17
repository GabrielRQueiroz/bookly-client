'use server';

import { Api } from '@/lib/api';
import { CriarLivro } from '@/lib/api/livros';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const cadastrarLivro = async (
  previousState: any,
  formData: FormData,
): Promise<{
  notification?: {
    title: string;
    message: string;
    color: string;
  };
}> => {
  const titulo = formData.get('titulo') as string;
  const autoresId = formData.get('autores')?.toString().split(',') as string[];
  const generosId = formData.get('generos')?.toString().split(',') as string[];
  const editoraId = formData.get('editora') as string;
  const estanteId = formData.get('estante') as string;
  const coluna = Number.parseInt(formData.get('coluna') as string);
  const linha = Number.parseInt(formData.get('linha') as string);

  const livro: CriarLivro = {
    titulo,
    autoresId,
    generosId,
    editoraId,
    estante: {
      id: estanteId,
      coluna,
      linha,
    },
  };

  console.log('Dados do formulário:', livro);

  try {
    if (!estanteId) {
      delete livro.estante;
    }

    await Api.livros.criar({
      ...livro,
    });

    updateTag('livros');
    if (estanteId) {
      updateTag(`estantes`);
    }
  } catch (error) {
    return {
      notification: {
        title: 'Erro ao cadastrar livro',
        message:
          error instanceof Error
            ? error.message
            : 'Tente novamente em alguns instantes.',
        color: 'red',
      },
    };
  }

  redirect(`/estantes/${estanteId}`);
};
