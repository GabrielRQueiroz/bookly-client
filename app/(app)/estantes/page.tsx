import { Layout, LayoutSection } from '@/components/Layout';
import { estantesApi } from '@/lib/api';
import { Estante } from '@/lib/api/estantes';
import { getUsuario } from '@/lib/dal';
import { CardEstante, CardEstanteNova } from './components/CardEstante';

export default async function PaginaEstantes() {
  const user = await getUsuario();
  const estantes: Estante[] = await estantesApi.listar();

  const owned = estantes.filter((e) => e.donos.some((d) => d.id === user?.id));
  const invited = estantes.filter((e) =>
    e.membros.some((m) => m.id === user?.id),
  );

  return (
    <Layout titulo="Estantes">
      <LayoutSection titulo="Minhas Estantes">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {owned.map((estante) => (
            <CardEstante key={estante.id} estante={estante} />
          ))}

          <CardEstanteNova />
        </div>
      </LayoutSection>

      <LayoutSection titulo="Compartilhadas Comigo">
        {invited.length === 0 ? (
          <p className="text-gray-500">
            Você não foi convidado para nenhuma estante.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {invited.map((estante) => (
              <CardEstante key={estante.id} estante={estante} isDono={false} />
            ))}
          </div>
        )}
      </LayoutSection>
    </Layout>
  );
}
