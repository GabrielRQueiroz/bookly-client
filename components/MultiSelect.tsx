import { cadastrarAutor } from '@/actions/autores';
import { cadastrarGenero } from '@/actions/generos';
import { Autor, Genero } from '@/lib/api';
import {
  Badge,
  Button,
  ColorPicker,
  ComboboxData,
  Group,
  MultiSelect,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons-react';
import { useState, useTransition } from 'react';

export const AutoresMultiSelect = ({
  autores,
  name = 'autores',
}: {
  autores: Autor[];
  name?: string;
}) => {
  const [search, setSearch] = useState('');
  const data: ComboboxData = autores.map((a) => ({
    label: a.nome,
    value: a.id,
  }));

  return (
    <MultiSelect
      required
      label="Autores"
      name={name}
      placeholder="Digite o nome do autor"
      renderOption={({ option }) => (
        <Group gap="sm">
          <Text size="sm">{option.label}</Text>
          {autores.find((a) => a.id === option.value)?.nomeComum && (
            <Text size="xs" opacity={0.5}>
              {autores.find((a) => a.id === option.value)?.nomeComum}
            </Text>
          )}
        </Group>
      )}
      searchable
      searchValue={search}
      maxLength={32}
      onSearchChange={(e) => setSearch(e)}
      data={data}
      nothingFoundMessage={<OpcaoCadastrarAutor autor={search} />}
    />
  );
};

export const GenerosMultiSelect = ({
  generos,
  name = 'generos',
}: {
  generos: Genero[];
  name?: string;
}) => {
  const [search, setSearch] = useState('');
  const data: ComboboxData = generos.map((g) => ({
    label: g.nome,
    value: g.id,
  }));

  return (
    <MultiSelect
      required
      label="Gêneros"
      name={name}
      placeholder="Digite o nome do gênero"
      renderOption={({ option }) => {
        const genero = generos.find((g) => g.id === option.value);
        return (
          <Badge color={genero?.corHexa} variant="dot" size="sm">
            {option.label}
          </Badge>
        );
      }}
      searchable
      searchValue={search}
      onSearchChange={(e) => setSearch(e)}
      maxLength={24}
      data={data}
      selectFirstOptionOnChange
      nothingFoundMessage={<OpcaoCadastrarGenero genero={search} />}
    />
  );
};

const OpcaoCadastrarAutor = ({ autor }: { autor: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleAdicionar = () => {
    startTransition(async () => {
      await cadastrarAutor(autor).then(() => {
        notifications.show({
          title: 'Autor cadastrado',
          message: `O autor "${autor}" foi cadastrado com sucesso.`,
          color: 'green',
        });
      });
    });
  };

  return (
    <Button
      leftSection={<IconPlus size={14} />}
      fullWidth
      variant="outline"
      size="xs"
      loading={isPending}
      onClick={handleAdicionar}
    >
      Adicionar {autor}
    </Button>
  );
};

const OpcaoCadastrarGenero = ({ genero }: { genero: string }) => {
  const [isPending, startTransition] = useTransition();
  const [corHexa, setCorHexa] = useState('#000000');

  const handleAdicionar = () => {
    startTransition(async () => {
      await cadastrarGenero(genero, corHexa).then(() => {
        notifications.show({
          title: 'Gênero cadastrado',
          message: `O gênero "${genero}" foi cadastrado com sucesso.`,
          color: 'green',
        });
      });
    });
  };

  return (
    <Group align="center">
      <ColorPicker className="grow" value={corHexa} onChange={setCorHexa} />
      <Button
        leftSection={<IconPlus size={14} />}
        fullWidth
        variant="outline"
        size="xs"
        loading={isPending}
        onClick={handleAdicionar}
        rightSection={
          <Badge color={corHexa} variant="dot" className="pointer-events-none">
            {genero}
          </Badge>
        }
      >
        Adicionar
      </Button>
    </Group>
  );
};
