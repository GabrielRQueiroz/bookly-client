'use client';

import { Button } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const BotaoVoltar = ({
  href,
  ...props
}: {
  href?: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'>) => {
  const router = useRouter();

  return (
    <Button
      component={Link}
      variant="subtle"
      p="xs"
      href={href || '#'}
      leftSection={<IconArrowBack size={16} />}
      onClick={(e) => {
        if (!href) {
          router.back();
        }
      }}
      {...props}
    >
      Voltar
    </Button>
  );
};
