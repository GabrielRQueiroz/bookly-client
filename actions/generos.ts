'use server';

import { generosApi } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarGenero = async (nome: string, corHexa: string) => {
  await generosApi.criar({ nome, corHexa });

  updateTag('generos');
};

export const listarGeneros = async () => {
  return await generosApi.listar();
};
