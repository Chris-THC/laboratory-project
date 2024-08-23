import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useGetOrderList } from '@renderer/hooks/res/CashRegister/UserCashRegister'
import { CashRegisterI } from '@renderer/interfaces/CashRegisterInterface/CashRegisterInterface'
import { ShowMenu } from './ShowMenu'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  Pagination,
  PaginationEllipsis
} from '@/components/ui/pagination'

export const TransactionFC: React.FC = () => {
  const { data } = useGetOrderList()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const columns: ColumnDef<CashRegisterI>[] = [
    {
      accessorFn: (row) => row.user.name,
      id: 'user.name',
      header: 'Usuario',
      cell: ({ row }) => <div className="font-inter font-medium">{row.original.user.name}</div>
    },
    {
      accessorFn: (row) => row.customer.name,
      id: 'customer.name',
      header: 'Cliente',
      cell: ({ row }) => <div className="font-inter font-medium">{row.original.customer.name}</div>
    },
    {
      accessorKey: 'orderTotal',
      header: 'Total',
      cell: ({ row }) => (
        <div className="font-inter font-medium">{`$${row.getValue('orderTotal')}`}</div>
      )
    },
    {
      accessorKey: 'orderReminding',
      header: 'Restante',
      cell: ({ row }) => (
        <div className="font-inter font-medium">{`$${row.getValue('orderReminding')}`}</div>
      )
    },
    {
      accessorKey: 'orderAmountPaid',
      header: 'Importe Recibido',
      cell: ({ row }) => <div className="capitalize">{`$${row.getValue('orderAmountPaid')}`}</div>
    },
    {
      accessorKey: 'orderDeposit',
      header: 'Deposito',
      cell: ({ row }) => <div className="capitalize">{`$${row.getValue('orderDeposit')}`}</div>
    },
    {
      accessorKey: 'orderChange',
      header: 'Cambio',
      cell: ({ row }) => <div className="capitalize">{`$${row.getValue('orderChange')}`}</div>
    },
    {
      accessorKey: 'orderNotes',
      header: 'Notas',
      cell: ({ row }) => <div className="capitalize">{row.getValue('orderNotes')}</div>
    },
    {
      accessorKey: 'orderTimeStamp',
      header: 'Fecha de transacción',
      cell: ({ row }) => <div className="capitalize">{`${row.getValue('orderTimeStamp')}`}</div>
    },
    {
      header: 'Acciones',
      cell: ({ row }): JSX.Element => {
        return <ShowMenu row={row} />
      }
    }
  ]

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount: data ? Math.ceil(data.length / pagination.pageSize) : 0,
    onPaginationChange: setPagination,
    manualPagination: false, // Paginación manual habilitada
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination // Se pasa el estado de paginación
    }
  })

  const PaginationComponent: React.FC = () => {
    return (
      <div className="mt-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                disabled={!table.getCanPreviousPage()}
                variant={'ghost'}
                onClick={() => table.previousPage()}
              >
                <ChevronLeft className="mr-1" />
                Anterior
              </Button>
            </PaginationItem>

            {table.getState().pagination.pageIndex > 0 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex - 1)}
                >
                  {table.getState().pagination.pageIndex}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink
                isActive={true}
                onClick={() => table.setPageIndex(table.getState().pagination.pageIndex)}
              >
                {table.getState().pagination.pageIndex + 1}
              </PaginationLink>
            </PaginationItem>

            {table.getState().pagination.pageIndex < table.getPageCount() - 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => table.setPageIndex(table.getState().pagination.pageIndex + 1)}
                >
                  {table.getState().pagination.pageIndex + 2}
                </PaginationLink>
              </PaginationItem>
            )}

            {table.getPageCount() > 3 && table.getState().pagination.pageIndex > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {table.getState().pagination.pageIndex < table.getPageCount() - 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                  {table.getPageCount()}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <Button
                variant={'ghost'}
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
              >
                Siguiente
                <ChevronRight className="ml-1" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-[98%]">
        <div className="flex items-center py-4 justify-between">
          <div>
            <h3 className="font-inter font-normal text-base mb-2">
              Búsqueda por nombre del paciente
            </h3>
            <Input
              placeholder="Nombre del paciente"
              value={(table.getColumn('customer.name')?.getFilterValue() as string) ?? ''}
              onChange={(event) =>
                table.getColumn('customer.name')?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className="text-gray-800 text-center max-w-[120px] font-medium m-0 p-2 bg-[#EFFBFF]"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sin resultados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        <PaginationComponent />
      </div>
    </div>
  )
}
