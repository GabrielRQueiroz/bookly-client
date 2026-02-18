'use client';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { redirect, RedirectType } from 'next/navigation';
import { FormularioEstantes } from '../../components/FormularioEstantes';

export default function PaginaNovaEstante() {
  const [opened, { close }] = useDisclosure(true);

  const handleClose = () => {
    redirect('/estantes', RedirectType.replace);
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Criar uma estante"
      size="md"
      padding="lg"
      autoFocus
      centered
    >
      <FormularioEstantes onSucess={close} />
    </Modal>
  );
}
