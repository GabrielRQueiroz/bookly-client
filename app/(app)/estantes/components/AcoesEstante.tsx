import { Estante } from '@/lib/api';
import {
  Button,
  Flex,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Tooltip,
} from '@mantine/core';
import {
  IconDotsVertical,
  IconResize,
  IconTrash,
  IconWriting,
} from '@tabler/icons-react';

export const AcoesEstante = ({ estante }: { estante: Estante }) => {
  return (
    <Flex flex={1} justify="end" wrap="nowrap">
      <Menu position="bottom-end" shadow="md" width={200}>
        <Tooltip label="Opções" position="left">
          <MenuTarget>
            <Button radius="lg" variant="subtle" color="gray" px={8}>
              <IconDotsVertical size={20} />
            </Button>
          </MenuTarget>
        </Tooltip>
        <MenuDropdown>
          <MenuLabel>Tabela</MenuLabel>
          <MenuItem leftSection={<IconWriting size={14} />}>Renomear</MenuItem>
          <MenuItem leftSection={<IconResize size={14} />}>
            Redimensionar
          </MenuItem>

          <MenuDivider />

          <MenuLabel>Cuidado!</MenuLabel>
          <MenuItem color="red" leftSection={<IconTrash size={14} />}>
            Apagar estante
          </MenuItem>
        </MenuDropdown>
      </Menu>
    </Flex>
  );
};
