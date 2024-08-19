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

export const TransactionFC: React.FC = () => {
  const { data } = useGetOrderList()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
      header: 'Cantidad recibida',
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
      cell: ({ row }) => {
        return row.getValue('orderNotes') === "" ? (
          <div>{'******'}</div>
        ) : (
          <div className="capitalize">{row.getValue('orderNotes')}</div>
        )
      }
    },
    {
      accessorKey: 'orderTimeStamp',
      header: 'Fecha',
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
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const Pagination: React.FC = () => {
    return (
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
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
                      <TableCell key={cell.id} className='text-center'>
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
        <Pagination />
      </div>
    </div>
  )
}
