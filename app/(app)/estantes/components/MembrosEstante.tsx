'use client';

import { Usuario } from '@/lib/api';
import {
  ActionIcon,
  Avatar,
  AvatarGroup,
  Button,
  Group,
  Indicator,
  List,
  Modal,
  Tooltip,
  Typography,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCrownFilled, IconLink, IconX } from '@tabler/icons-react';
import clsx from 'clsx';

export const MembrosEstante = ({
  usuarios,
  readOnly,
  tooltipDirection = 'top',
}: {
  usuarios: {
    donos: Usuario[];
    membros: Usuario[];
  };
  readOnly?: boolean;
  tooltipDirection?: 'top' | 'bottom' | 'left' | 'right';
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { colors } = useMantineTheme();
  const allUsuarios = [...usuarios.donos, ...usuarios.membros];

  return (
    <>
      <AvatarGroup>
        {allUsuarios.slice(0, 3).map((membro) => (
          <Tooltip
            label={membro.nome}
            position={tooltipDirection}
            key={membro.id}
          >
            <Indicator
              disabled={usuarios.donos.every((d) => d.id !== membro.id)}
              size={14}
              position="top-start"
              color="white"
              label={<IconCrownFilled color={colors.primary[6]} size={12} />}
              inline
              styles={{
                indicator: {
                  marginLeft: 7.5,
                  marginTop: 4,
                  border: `2px solid ${colors.primary[3]}`,
                  padding: 3,
                },
              }}
            >
              <Avatar
                key={membro.id}
                src={membro.avatarUrl || undefined}
                alt={membro.nome}
                radius="xl"
              />
            </Indicator>
          </Tooltip>
        ))}
        {allUsuarios.length > 3 && (
          <Tooltip
            label={`+${allUsuarios.length - 3} outro${allUsuarios.length - 3 > 1 ? 's' : ''} membro${allUsuarios.length - 3 > 1 ? 's' : ''}`}
            position={tooltipDirection}
          >
            <Avatar
              className={clsx(!readOnly && 'cursor-pointer')}
              onClick={() => !readOnly && open()}
              radius="xl"
            >
              +{allUsuarios.length - 3}
            </Avatar>
          </Tooltip>
        )}
      </AvatarGroup>
      {!readOnly && (
        <ModalUsuarios open={opened} onClose={close} usuarios={usuarios} />
      )}
    </>
  );
};

const ModalUsuarios = ({
  open,
  onClose,
  usuarios,
}: {
  open: boolean;
  onClose: () => void;
  usuarios: {
    donos: Usuario[];
    membros: Usuario[];
  };
}) => {
  const allUsuarios = [...usuarios.donos, ...usuarios.membros];

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title="Membros da Estante"
      size="sm"
      centered
      padding="lg"
    >
      <List className="ps-1! space-y-2">
        {allUsuarios.map((usuario) => (
          <List.Item key={usuario.id}>
            <Group gap={12}>
              <Tooltip label="Remover da estante" withArrow position="top">
                <ActionIcon radius="lg" variant="light" color="red" size="sm">
                  <IconX size={12} />
                </ActionIcon>
              </Tooltip>

              <Avatar
                src={usuario.avatarUrl || undefined}
                alt={usuario.nome}
                radius="xl"
              />

              <Typography className="flex-1">{usuario.nome}</Typography>
            </Group>
          </List.Item>
        ))}
      </List>

      <Button
        fullWidth
        variant="light"
        mt="md"
        onClick={() => alert('Funcionalidade em breve')}
        rightSection={<IconLink size={16} />}
      >
        Criar convite
      </Button>
    </Modal>
  );
};
