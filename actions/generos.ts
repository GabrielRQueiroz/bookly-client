'use server';

import { Api } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarGenero = async (nome: string, corHexa: string) => {
  await Api.generos.criar({ nome, corHexa });

  updateTag('generos');
};

export const listarGeneros = async () => {
  return await Api.generos.listar();
};
