import { Layout, LayoutSection } from '@/components/Layout';
import { Api } from '@/lib/api';
import { CardEstante, CardEstanteNova } from './components/CardEstante';

export default async function PaginaEstantes() {
  const { dono, convidado } = await Api.estantes.listar();

  return (
    <Layout titulo="Estantes">
      <LayoutSection titulo="Minhas Estantes">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dono.map((estante) => (
            <CardEstante key={estante.id} estante={estante} />
          ))}

          <CardEstanteNova />
        </div>
      </LayoutSection>

      <LayoutSection titulo="Compartilhadas Comigo">
        {convidado.length === 0 ? (
          <p className="text-gray-500">
            Você não foi convidado para nenhuma estante.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {convidado.map((estante) => (
              <CardEstante key={estante.id} estante={estante} isDono={false} />
            ))}
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
