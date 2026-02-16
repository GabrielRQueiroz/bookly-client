import React from 'react'
import { Layout, LayoutSection } from '@/components/Layout';
import { getUsuario } from '@/lib/dal';

export default async function PaginaAmigos() {
  const usuario = await getUsuario();
  
  return (
    <Layout titulo="Amigos">
      <LayoutSection titulo="Meus Amigos">
        <p>Em breve...</p>
      </LayoutSection>
    </Layout>
  )
}
