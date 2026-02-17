'use client';

import { Nicho } from '@/lib/definitions';
import { getLinhaColuna } from '@/lib/utils';
import { Button, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { FormularioLivro } from '../../livros/components/FormularioLivro';
import { useEstanteContext } from '../contexts/EstanteContext';

export const AcoesNicho = ({ estanteId }: { estanteId: string }) => {
  const [nichoSelecionado, setNichoSelecionado] = useState<Nicho | undefined>();
  const { filtros } = useEstanteContext();

  useEffect(() => {
    if (filtros.some((filtro) => filtro.id === 'nicho')) {
      const coordenada = filtros.find((filtro) => filtro.id === 'nicho')
        ?.value as string;
      const { linha, coluna } = getLinhaColuna(coordenada);
      const nicho: Nicho = {
        estanteId,
        linha,
        coluna,
      };
      setNichoSelecionado(nicho);
    } else {
      setNichoSelecionado(undefined);
    }
  }, [filtros]);

  return (
    <Group w="fit-content" mx="auto" py={16}>
      <AdicionarLivro nicho={nichoSelecionado} disabled={!nichoSelecionado} />
      <Button
        size="sm"
        leftSection={<IconEdit size={20} />}
        disabled={!nichoSelecionado}
        variant="light"
        color="primary"
      >
        Editar
      </Button>
    </Group>
  );
};

const AdicionarLivro = ({
  nicho,
  disabled,
}: {
  nicho?: Nicho;
  disabled: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        size="sm"
        leftSection={<IconPlus size={20} />}
        disabled={disabled || !nicho}
        variant="light"
        color="blue"
        onClick={open}
      >
        Adicionar livro
      </Button>
      <Modal opened={opened && !!nicho} onClose={close} title="Adicionar livro">
        <FormularioLivro nicho={nicho} />
      </Modal>
    </>
  );
};
