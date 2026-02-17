'use client';

import { listarAutores } from '@/actions/autores';
import { listarEditoras } from '@/actions/editoras';
import { listarGeneros } from '@/actions/generos';
import { EditoraAutocomplete } from '@/components/Autocompletes';
import {
  AutoresMultiSelect,
  GenerosMultiSelect,
} from '@/components/MultiSelect';
import { Autor, Editora, Genero } from '@/lib/api';
import { Nicho } from '@/lib/definitions';
import { Button, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useActionState, useEffect, useState } from 'react';
import { cadastrarLivro } from '../actions';

export const FormularioLivro = ({
  nicho,
  onSuccess,
}: {
  nicho?: Nicho;
  onSuccess?: () => void;
}) => {
  const [{ notification }, formAction, pending] = useActionState(
    cadastrarLivro,
    {
      notification: undefined,
    },
  );
  const [autores, setAutores] = useState<Autor[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [editoras, setEditoras] = useState<Editora[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [autoresData, generosData, editorasData] = await Promise.all([
        await listarAutores(),
        await listarGeneros(),
        await listarEditoras(),
      ]);
      setAutores(autoresData);
      setGeneros(generosData);
      setEditoras(editorasData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (notification) {
      notifications.show(notification);
    }
  }, [notification]);

  return (
    <form action={formAction}>
      {nicho && (
        <>
          <input type="hidden" name="estante" value={nicho.estanteId} />
          <input type="hidden" name="coluna" value={nicho.coluna} />
          <input type="hidden" name="linha" value={nicho.linha} />
        </>
      )}

      <TextInput
        name="titulo"
        label="Título do livro"
        placeholder="Digite o título do livro"
        required
      />

      <EditoraAutocomplete editoras={editoras} />

      <AutoresMultiSelect autores={autores} />
      <GenerosMultiSelect generos={generos} />

      <Button type="submit" fullWidth mt="xl" loading={pending}>
        Adicionar
      </Button>
    </form>
  );
};
