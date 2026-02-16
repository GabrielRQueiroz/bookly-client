import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="w-full h-fit p-6 max-w-5xl mx-auto">{children}</main>
    </>
  );
}
