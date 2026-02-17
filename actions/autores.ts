'use server';

import { autoresApi } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarAutor = async (nome: string) => {
  await autoresApi.criar({ nome });

  updateTag('autores');
};

export const listarAutores = async () => {
  return await autoresApi.listar();
}