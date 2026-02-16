import { Container, Title } from '@mantine/core';

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="my-auto w-full py-8" size={420}>
      <Title ta="center" mb={8} className="font-semibold">
        Bookly
      </Title>
      {children}
    </Container>
  );
}
