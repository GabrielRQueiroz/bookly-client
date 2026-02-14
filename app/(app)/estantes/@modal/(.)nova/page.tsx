'use client';

import { LoadingOverlay, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { EstantesFormulario } from '../../EstantesFormulario';

export default function PaginaNovaEstante() {
  const [opened, { close }] = useDisclosure(true);
  const router = useRouter();

  const handleClose = () => {
    router.back();
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Nova Estante"
      size="md"
      pos="relative"
      centered
    >
      <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <EstantesFormulario />
    </Modal>
  );
}
