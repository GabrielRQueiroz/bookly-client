'use client';

import { Livro } from '@/lib/api';
import { getLetraLinha } from '@/lib/utils';
import {
  Autocomplete,
  CloseButton,
  Divider,
  Flex,
  Group,
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import {
  IconArrowDown,
  IconArrowsSort,
  IconArrowUp,
  IconFilter,
  IconSearch,
} from '@tabler/icons-react';
import { Column, flexRender } from '@tanstack/react-table';
import { TData, useEstanteContext } from '../contexts/EstanteContext';

export const ListaEstante = () => {
  const { tabela } = useEstanteContext();
  const { colors } = useMantineTheme();

  const headerAccessibleTitle = (column: Column<TData, any>) => {
    if (!column.getCanSort()) return 'Não é possível ordenar por esta coluna';
    if (column.getIsSorted() === 'asc') return 'Ordenado de forma ascendente';
    if (column.getIsSorted() === 'desc') return 'Ordenado de forma descendente';
    return 'Não está ordenado por esta coluna';
  };

  return (
    <Group gap={8}>
      <FiltrosTabela />
      <Divider />
      <Table verticalSpacing="xs" striped highlightOnHover>
        <TableThead className="sticky top-0">
          {tabela.getHeaderGroups().map((headerGroup) => (
            <TableTr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableTh
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`${
                    header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : ''
                  }
              `}
                  title={headerAccessibleTitle(header.column)}
                >
                  {header.isPlaceholder ? null : (
                    <Flex align="center" gap="xs">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}{' '}
                      {header.column.getIsSorted() === 'asc' && (
                        <IconArrowDown
                          color={colors.primary[8]}
                          className="inline"
                          stroke={3}
                          size={16}
                        />
                      )}
                      {header.column.getIsSorted() === 'desc' && (
                        <IconArrowUp
                          color={colors.primary[8]}
                          className="inline"
                          stroke={3}
                          size={16}
                        />
                      )}
                      {header.column.getIsSorted() === false && (
                        <IconArrowsSort
                          color={colors.primary[4]}
                          className="inline"
                          size={16}
                        />
                      )}
                    </Flex>
                  )}
                </TableTh>
              ))}
            </TableTr>
          ))}
        </TableThead>
        <TableTbody>
          {tabela.getRowModel().rows.map((row) => (
            <TableTr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableTd key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableTd>
              ))}
            </TableTr>
          ))}
          {tabela.getRowModel().rows.length === 0 && (
            <TableTr>
              <TableTd colSpan={tabela.getAllColumns().length} align="center">
                Nenhum livro encontrado.
              </TableTd>
            </TableTr>
          )}
        </TableTbody>
      </Table>
    </Group>
  );
};

export const FiltrosTabela = () => {
  const { textoBusca, buscarPorTexto } = useEstanteContext();

  return (
    <Flex align="center" gap="xs">
      <ThemeIcon variant="light" size="lg" radius="sm">
        <IconFilter size={20} />
      </ThemeIcon>

      <Autocomplete
        leftSection={<IconSearch size={16} />}
        rightSection={
          textoBusca && (
            <CloseButton
              aria-label="Limpar busca"
              size="sm"
              radius="lg"
              onClick={() => buscarPorTexto('')}
            />
          )
        }
        value={textoBusca}
        onChange={buscarPorTexto}
        placeholder="Buscar em todas as colunas..."
      />
    </Flex>
  );
};

export const ListaEstanteLegado = ({
  livros,
}: {
  livros: (Livro & { linha: number; coluna: number })[];
}) => {
  const linhas = livros.map((livro, index) => (
    <TableTr key={livro.id}>
      <TableTd>{livro.titulo}</TableTd>
      <TableTd>{`${getLetraLinha(index)}${livro.coluna}`}</TableTd>
    </TableTr>
  ));

  return (
    <Table verticalSpacing="xs" striped highlightOnHover>
      <TableThead>
        <TableTr>
          <TableTh>Título</TableTh>
          <TableTh>Nicho</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{linhas}</TableTbody>
    </Table>
  );
};
