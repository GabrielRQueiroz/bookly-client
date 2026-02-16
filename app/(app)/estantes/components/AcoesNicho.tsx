'use client';

import { Button, Group, Tooltip } from '@mantine/core';
import { IconDeselect, IconEdit, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useEstanteContext } from '../contexts/EstanteContext';

export const AcoesNicho = () => {
  const { filtros, setFiltroNicho } = useEstanteContext();
  const [nichoSelecionado, setNichoSelecionado] = useState<string | null>(null);

  useEffect(() => {
    if (filtros.length > 0) {
      const nichoFiltro = filtros.find((filtro) => filtro.id === 'nicho');
      if (nichoFiltro && typeof nichoFiltro.value === 'string') {
        setNichoSelecionado(nichoFiltro.value);
      } else {
        setNichoSelecionado(null);
      }
    } else {
      setNichoSelecionado(null);
    }
  }, [filtros]);

  return (
    <Group wrap="nowrap" py={12}>
      <Tooltip label="Limpar seleção">
        <Button
          size="sm"
          variant="outline"
          color="gray"
          disabled={!nichoSelecionado}
          onClick={() => setFiltroNicho(-1, -1)}
        >
          <IconDeselect size={20} />
        </Button>
      </Tooltip>
      <Button
        size="sm"
        leftSection={<IconPlus size={20} />}
        disabled={!nichoSelecionado}
        variant="light"
        color="blue"
      >
        Adicionar livro
      </Button>
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
