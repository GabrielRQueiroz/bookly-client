import { Editora } from '@/lib/api';
import { ComboboxData, Select } from '@mantine/core';

export const EditoraAutocomplete = ({
  editoras,
  name = 'editora',
}: {
  editoras: Editora[];
  name?: string;
}) => {
  const data: ComboboxData = editoras.map((e) => ({
    value: e.id,
    label: e.nome,
  }));

  return (
    <Select
      required
      searchable
      label="Editora"
      name={name}
      placeholder="Digite o nome da editora"
      data={data}
    />
  );
};
