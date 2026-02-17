'use server';

import { Api } from '@/lib/api';
import { updateTag } from 'next/cache';

export const cadastrarEditora = async (nome: string) => {
  await Api.editoras.criar({ nome });

  updateTag('editoras');
};

export const atualizarEditora = async (id: string, nome: string) => {
  await Api.editoras.atualizar(id, { nome });

  updateTag('editoras');
};

export const excluirEditora = async (id: string) => {
  await Api.editoras.remover(id);

  updateTag('editoras');
};

export const listarEditoras = async () => {
  return await Api.editoras.listar();
};
