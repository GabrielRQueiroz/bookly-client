'use server';

import { editorasApi } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarEditora = async (nome: string) => {
  await editorasApi.criar({ nome });

  updateTag('editoras');
};

export const atualizarEditora = async (id: string, nome: string) => {
  await editorasApi.atualizar(id, { nome });

  updateTag('editoras');
};

export const excluirEditora = async (id: string) => {
  await editorasApi.remover(id);

  updateTag('editoras');
};

export const listarEditoras = async () => {
  return await editorasApi.listar();
};
