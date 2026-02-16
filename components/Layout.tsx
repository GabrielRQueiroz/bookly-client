'use client';

import { Container, Title } from '@mantine/core';
import { createContext, useMemo } from 'react';

type LayoutProps = {
  titulo: string;
  children: React.ReactNode;
};

const LayoutContext = createContext({ titulo: '' });

export const Layout = ({ titulo, children }: LayoutProps) => {
  const value = useMemo(() => ({ titulo }), [titulo]);

  return (
    <LayoutContext.Provider value={value}>
      <Container className="space-y-10">
        <Title order={1} mb={16} className="text-2xl">
          {titulo}
        </Title>
        {children}
      </Container>
    </LayoutContext.Provider>
  );
};

export const LayoutSection = ({ titulo, children }: LayoutProps) => {
  return (
    <section>
      <Title order={2} mb={4} size="lg" className="font-semibold">
        {titulo}
      </Title>
      {children}
    </section>
  );
};

export const LayoutSubsection = ({ titulo, children }: LayoutProps) => {
  return (
    <section>
      <Title order={3} mb={4} size="md" className="font-semibold">
        {titulo}
      </Title>
      {children}
    </section>
  );
};

Layout.Section = LayoutSection;
Layout.Subsection = LayoutSubsection;
