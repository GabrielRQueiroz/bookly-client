'use client';

import { Livro } from '@/lib/definitions';
import { getLetraLinha } from '@/lib/utils';
import { Card, List, SimpleGrid } from '@mantine/core';
import { Fragment } from 'react/jsx-runtime';

type ShelfGridProps = {
  linhas: number;
  colunas: number;
  livros: Livro[];
  onCellClick?: (linha: number, coluna: number) => void;
};

export const GridEstante = ({
  linhas,
  colunas,
  livros,
  onCellClick,
}: ShelfGridProps) => {
  return (
    <div className="overflow-auto pb-3 pr-2 max-h-[75vh] h-full">
      <SimpleGrid
        className="min-w-max"
        cols={colunas + 1}
        style={{
          gridTemplateColumns: `50px repeat(${colunas}, clamp(150px, 15vw, 180px))`,
        }}
      >
        {/* Canto superior esquerdo vazio */}
        <div className="sticky top-0 left-0 z-30 bg-gray-50" />

        {/* Cabeçalho das colunas */}
        {Array.from({ length: colunas }).map((_, colIndex) => (
          <div
            key={`header-coluna-${_}-${colIndex}}`}
            className="text-center font-semibold text-base sticky top-0 z-20 bg-gray-100 py-2 rounded-sm"
          >
            {colIndex + 1}
          </div>
        ))}

        {/* Linhas */}
        {Array.from({ length: linhas }).map((_, rowIndex) => {
          const letra = getLetraLinha(rowIndex);

          return (
            <Fragment key={`linha-${_}-${rowIndex}`}>
              {/* Cabeçalho da linha */}
              <div className="flex items-center justify-center font-semibold text-base sticky left-0 z-10 bg-gray-100 rounded-sm">
                {letra}
              </div>

              {/* Células da linha */}

              {Array.from({ length: colunas }).map((_, colIndex) => {
                const linha = rowIndex + 1;
                const coluna = colIndex + 1;
                const coordenada = `${letra}${coluna}`;

                return (
                  <Nicho
                    key={`${linha}-${coluna}`}
                    coordenada={coordenada}
                    onClick={() => {
                      if (onCellClick) {
                        onCellClick(linha, coluna);
                      } else {
                        console.log(`Célula clicada: ${coordenada}`);
                      }
                    }}
                    livros={livros?.filter(
                      (livro) =>
                        livro.linha === linha && livro.coluna === coluna,
                    )}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </SimpleGrid>
    </div>
  );
};

const Nicho = ({
  coordenada,
  livros,
  onClick,
}: {
  coordenada: string;
  livros?: Livro[];
  onClick?: () => void;
}) => {
  return (
    <Card
      shadow="xs"
      padding="md"
      className="relative h-36 cursor-pointer transition"
      onClick={onClick}
    >
      {/* Coordenada */}
      <span className="absolute right-2 top-2 text-gray-400 text-xs">
        {coordenada}
      </span>

      {/* Lista */}
      <List className="text-xs leading-tight w-full pl-0! ps-[inherit]!">
        {livros?.slice(0, 4).map((livro) => (
          <li key={livro.id} className="text-gray-600 truncate">
            {livro.titulo}
          </li>
        ))}

        {livros && livros.length > 4 && (
          
          <li className="text-gray-400 text-xs">
            +{livros.length - 4} mais
          </li>
        )}
      </List>
    </Card>
  );
};
