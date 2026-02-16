'use client';

import { Estante, Livro } from '@/lib/api';
import { getLetraLinha, getLinhaColuna, getNicho } from '@/lib/utils';
import {
  Badge,
  Card,
  CardProps,
  Indicator,
  List,
  Overlay,
  SimpleGrid,
  useMantineTheme,
} from '@mantine/core';
import clsx from 'clsx';
import { ComponentPropsWithRef, useEffect, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { useEstanteContext } from '../contexts/EstanteContext';

type ShelfGridProps = {
  estante: Estante;
  dono: boolean;
  onCellClick?: (linha: number, coluna: number) => void;
};

export const GridEstante = ({
  estante,
  dono = false,
  onCellClick,
}: ShelfGridProps) => {
  const [active, setActive] = useState<string | null>(null);
  const { filtros, setFiltroNicho } = useEstanteContext();
  const { linhas, colunas, livros } = estante;
  useEffect(() => {
    if (filtros.length > 0) {
      const nicho = filtros.find((filtro) => filtro.id === 'nicho');

      if (
        nicho &&
        nicho.value &&
        typeof nicho.value === 'string' &&
        active !== nicho.value
      ) {
        const { linha, coluna } = getLinhaColuna(nicho.value);
        setActive(getNicho(linha, coluna));
      } else {
        setActive(null);
      }
    } else {
      setActive(null);
    }
  }, [filtros]);

  const handleCellClick = (linha: number, coluna: number) => {
    if (active === getNicho(linha, coluna)) {
      setFiltroNicho(-1, -1);
      return;
    }

    setFiltroNicho(linha, coluna);

    if (onCellClick) {
      onCellClick(linha, coluna);
    } else {
      console.log(`Célula clicada: ${getLetraLinha(linha)}${coluna}`);
    }
  };

  return (
    <div className="overflow-auto pb-3 pr-2 max-h-[60vh] h-full">
      <SimpleGrid
        className="w-fit relative mx-auto"
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
          const letra = getLetraLinha(rowIndex + 1);

          return (
            <Fragment key={`linha-${_}-${rowIndex}`}>
              {/* Cabeçalho da linha */}
              <div className="flex items-center justify-center font-semibold text-base sticky left-0 z-10 bg-gray-100 rounded-sm">
                {letra}
              </div>

              {/* Células da linha */}

              {Array.from({ length: colunas }).map((_, colIndex) => {
                const coordenada = getNicho(rowIndex + 1, colIndex + 1);

                return (
                  <Nicho
                    key={`${coordenada}`}
                    coordenada={coordenada}
                    livros={livros.filter(
                      (livro) =>
                        livro.linha === rowIndex + 1 &&
                        livro.coluna === colIndex + 1,
                    )}
                    active={active === coordenada}
                    onClick={() => handleCellClick(rowIndex + 1, colIndex + 1)}
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
  active,
  onClick,
  ...props
}: {
  coordenada: string;
  livros?: Livro[];
  active?: boolean;
  onClick?: () => void;
} & ComponentPropsWithRef<'div'> &
  CardProps) => {
  const { textoBusca, tabela } = useEstanteContext();
  const { colors } = useMantineTheme();

  const destaqueBusca =
    textoBusca.length > 0 &&
    tabela.getRowModel().rows.every((row) => row.original.nicho !== coordenada);

  return (
    <Indicator
      size={16}
      color="primary"
      disabled={!active}
      label="Selecionado"
      position="top-center"
      zIndex={1}
      inline
    >
      <Card
        shadow="xs"
        padding="md"
        className={clsx(
          'relative h-36 cursor-pointer transition',
          `border-${colors.primary[9]}`,
          active && `border-2`,
          destaqueBusca && `border-2 border-${colors.primary[9]}`,
        )}
        onClick={onClick}
        withBorder
        style={{
          borderColor:
            active || (textoBusca.length > 0 && !destaqueBusca)
              ? colors.primary[9]
              : 'transparent',
        }}
        mod={{ active }}
        {...props}
      >
        {destaqueBusca && (
          <Overlay color="#000" backgroundOpacity={0.03} zIndex={10} />
        )}

        <span className="absolute right-2 top-2 text-gray-400 text-xs">
          {coordenada}
        </span>

        <List className="text-xs leading-tight w-full pl-0! ps-[inherit]!">
          {livros?.slice(0, 4).map((livro) => (
            <li key={livro.id} className="text-gray-600 truncate">
              <Badge color={livro.generos[0].corHexa} size="xs" variant="dot">
                {livro.titulo}
              </Badge>
            </li>
          ))}

          {livros && livros.length > 4 && (
            <li className="text-gray-400 text-xs">+{livros.length - 4} mais</li>
          )}
        </List>
      </Card>
    </Indicator>
  );
};
