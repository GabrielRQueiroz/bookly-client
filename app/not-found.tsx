import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="px-4 h-full w-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link href="/" className="text-primary-content hover:underline">
        Voltar para a página inicial
      </Link>
    </main>
  );
}
