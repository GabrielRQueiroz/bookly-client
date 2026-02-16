import { Layout, LayoutSection } from '@/components/Layout';
import { getUsuario } from '@/lib/dal';

export default async function PaginaConfiguracoes() {
  const usuario = await getUsuario();

  return (
    <Layout titulo="Configurações">
      <LayoutSection titulo="Aplicativo">
        <p>Em breve...</p>
      </LayoutSection>
      <LayoutSection titulo="Conta">
        <p>Em breve...</p>
      </LayoutSection>
    </Layout>
  );
}
