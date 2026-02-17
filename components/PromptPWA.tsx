'use client';

import { ActionIcon, Button, Dialog, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDownload, IconPlus, IconShare } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export const PromptPWA = () => {
  const [opened, { close }] = useDisclosure(true);
  const [isIOS, setIsIOS] = useState(false);
  const [alreadyPrompted, setAlreadyPrompted] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setAlreadyPrompted(localStorage.getItem('pwaPrompted') === 'true');

    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(globalThis as any).MSStream,
    );

    setIsStandalone(
      globalThis.matchMedia('(display-mode: standalone)').matches,
    );
  }, []);

  if (isStandalone || alreadyPrompted) {
    return null;
  }

  const handleClose = () => {
    localStorage.setItem('pwaPrompted', 'true');
    close();
  };

  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={handleClose}
      title="Instalar Bookly"
      size="lg"
    >
      <Text size="sm" mb="xs" fw={500}>
        Adicione o Bookly à sua tela de início para acessar suas estantes de
        livros com mais facilidade!
      </Text>
      <Button
        variant="subtle"
        onClick={handleClose}
        rightSection={<IconDownload size={14} />}
      >
        Adicionar
      </Button>
      {isIOS && (
        <Text size="xs" mt="md">
          Para instalar esse aplicativo no seu iOS, toque no ícone de
          compartilhamento
          <ActionIcon size="xs" color="gray">
            <IconShare />
          </ActionIcon>
          e depois em "Adicionar à Tela de Início"
          <ActionIcon size="xs" color="gray">
            <IconPlus />
          </ActionIcon>
        </Text>
      )}
    </Dialog>
  );
};
