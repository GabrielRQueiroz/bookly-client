'use server';

import { Api } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarAutor = async (nome: string) => {
  await Api.autores.criar({ nome });

  updateTag('autores');
};

export const listarAutores = async () => {
  return await Api.autores.listar();
};
