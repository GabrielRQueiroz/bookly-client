'use client';

import { Genero } from '@/lib/api';
import { getNicho } from '@/lib/utils';
import { Badge } from '@mantine/core';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  GroupingState,
  SortingState,
  Table,
  Updater,
  useReactTable,
} from '@tanstack/react-table';
import { createContext, useContext, useMemo, useState } from 'react';

export type EstanteContextType = {
  tabela: Table<TData>;
  filtros: ColumnFiltersState;
  grupos: GroupingState;
  textoBusca: string;
  ordenacao: SortingState;
  setData: (data: TData[]) => void;
  setGrupos: (updater: Updater<GroupingState>) => void;
  setOrdenacao: (updater: Updater<SortingState>) => void;
  buscarPorTexto: (texto: string) => void;
  adicionarFiltro: (filtro: { id: string; value: any }) => void;
  removerFiltro: (id: string) => void;
  setFiltros: (updater: Updater<ColumnFiltersState>) => void;
  setFiltroNicho: (linha: number, coluna: number) => void;
};

export type TData = {
  titulo: string;
  autores: string[];
  editora: string;
  generos: Genero[];
  nicho: string;
};

const EstanteContext = createContext<EstanteContextType | null>(null);

export const EstanteContextProvider = ({
  data: _data,
  children,
}: {
  data?: TData[];
  children: React.ReactNode;
}) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [filtros, setFiltros] = useState<ColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<TData[]>(_data || []);

  const setFiltroNicho = (linha: number, coluna: number) => {
    if (linha === -1 || coluna === -1) {
      setFiltros([]);
      return;
    }

    setFiltros([
      {
        id: 'nicho',
        value: getNicho(linha, coluna),
      },
    ]);
  };

  const adicionarFiltro = (filtro: { id: string; value: any }) => {
    setFiltros((prev) => [...prev, filtro]);
  };

  const removerFiltro = (id: string) => {
    setFiltros((prev) => prev.filter((filtro) => filtro.id !== id));
  };

  const columns = useMemo<ColumnDef<TData>[]>(
    () => [
      {
        accessorKey: 'titulo',
        header: 'Título',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        enableSorting: true,
      },
      {
        accessorFn: (row) => row.autores.join(', '),
        header: 'Autores',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        enableSorting: true,
      },
      {
        accessorKey: 'editora',
        header: 'Editora',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        enableSorting: true,
      },
      {
        accessorFn: (row) => row.generos,
        header: 'Gêneros',
        cell: (info) => {
          const generos = info.getValue() as Genero[];
          return generos.map((genero) => (
            <Badge
              key={genero.id}
              size="sm"
              color={genero.corHexa}
              variant="dot"
            >
              {genero.nome}
            </Badge>
          ));
        },
        filterFn: 'arrIncludesSome',
        enableSorting: true,
      },
      {
        accessorKey: 'nicho',
        header: 'Nicho',
        cell: (info) => info.getValue(),
        filterFn: 'includesString',
        enableSorting: true,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      grouping,
      sorting,
      columnFilters: filtros,
      globalFilter,
    },
    enableFilters: true,
    enableSorting: true,
    enableSortingRemoval: false,
    onGlobalFilterChange: setGlobalFilter,
    onGroupingChange: setGrouping,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: () => undefined,
  });

  const value = useMemo(
    () => ({
      tabela: table,
      filtros,
      textoBusca: globalFilter,
      grupos: grouping,
      ordenacao: sorting,
      setData,
      setGrupos: setGrouping,
      setOrdenacao: setSorting,
      adicionarFiltro,
      removerFiltro,
      buscarPorTexto: setGlobalFilter,
      setFiltros,
      setFiltroNicho,
    }),
    [table, filtros, grouping, sorting, globalFilter],
  );

  return (
    <EstanteContext.Provider value={value}>{children}</EstanteContext.Provider>
  );
};

export const useEstanteContext = () => {
  const context = useContext(EstanteContext);
  if (!context) {
    throw new Error(
      'useEstanteContext deve ser usado dentro de um EstanteContextProvider',
    );
  }
  return context;
};
