import { Sidebar } from '@/components/Sidebar';
import { getUserFromCookie } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const user = getUserFromCookie();

  console.log(user);

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <Sidebar />
      <main className="w-full h-full overflow-y-auto p-6 max-w-5xl mx-auto">
        {children}
      </main>
    </>
  );
}
