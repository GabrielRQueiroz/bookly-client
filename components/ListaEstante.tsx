'use client';

import { Livro } from '@/lib/definitions';
import { getLetraLinha } from '@/lib/utils';
import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
} from '@mantine/core';
import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';
import {
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

type TData = {
  titulo: string;
  posicao: string;
};

export const ListaEstante = ({ livros }: { livros: Livro[] }) => {
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TData[]>(() =>
    livros.map((livro) => ({
      titulo: livro.titulo,
      posicao: `${getLetraLinha(livro.linha - 1)}${livro.coluna}`,
    })),
  );

  const columns = useMemo<ColumnDef<TData>[]>(
    () => [
      {
        accessorKey: 'titulo',
        header: 'Título',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        accessorKey: 'posicao',
        header: 'Posição',
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
    ],
    [],
  );

  const headerAccessibleTitle = (column: Column<TData, any>) => {
    if (!column.getCanSort()) return 'Não é possível ordenar por esta coluna';
    if (column.getIsSorted() === 'asc') return 'Ordenado de forma ascendente';
    if (column.getIsSorted() === 'desc') return 'Ordenado de forma descendente';
    return 'Não está ordenado por esta coluna';
  };

  useEffect(() => {
    setData(
      livros.map((livro) => ({
        titulo: livro.titulo,
        posicao: `${getLetraLinha(livro.linha - 1)}${livro.coluna}`,
      })),
    );
  }, [livros]);

  const table = useReactTable({
    columns,
    data,
    state: {
      grouping,
      sorting,
    },
    enableSorting: true,
    enableSortingRemoval: false,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: () => undefined,
  });

  return (
    <Table verticalSpacing="xs" striped highlightOnHover>
      <TableThead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableTr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableTh
                key={header.id}
                colSpan={header.colSpan}
                onClick={header.column.getToggleSortingHandler()}
                className={`${
                  header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                } ${header.column.getIsSorted() ? 'font-bold italic' : ''}
              }`}
                title={headerAccessibleTitle(header.column)}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}{' '}
                    {header.column.getIsSorted() === 'asc' && (
                      <IconSortAscending className="inline" size={16} />
                    )}
                    {header.column.getIsSorted() === 'desc' && (
                      <IconSortDescending className="inline" size={16} />
                    )}
                    {header.column.getIsSorted() === false && (
                      <IconArrowsSort className="inline" size={16} />
                    )}
                  </>
                )}
              </TableTh>
            ))}
          </TableTr>
        ))}
      </TableThead>
      <TableTbody>
        {table.getRowModel().rows.map((row) => (
          <TableTr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableTd key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableTd>
            ))}
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
};

export const ListaEstanteLegado = ({ livros }: { livros: Livro[] }) => {
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
          <TableTh>Posição</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{linhas}</TableTbody>
    </Table>
  );
};
