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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useAddCustomerTest } from '@renderer/hooks/res/clientRes/UseClientTest'
import { useGetTestList } from '@renderer/hooks/res/testNameRes/UseTestNameAPI'
import { CostumerTestAddInterface } from '@renderer/interfaces/clients/costumersTest'
import { TestInterface } from '@renderer/interfaces/tests/test'
import { useNavigate } from 'react-router-dom'
import { useAddResults } from '@renderer/hooks/res/resultsRes/useResults'

export const TestSelector: React.FC = () => {
  const { data } = useGetTestList()
  const newCustomerTests = useAddCustomerTest()
  const addNewResult = useAddResults()
  const { clientObjectInfo } = useClientIdSelected()
  const goToBack = useNavigate()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [selectedRows, setSelectedRows] = useState<TestInterface[]>([])

  const columns: ColumnDef<TestInterface>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
            if (value === true) {
              // Si se selecciona la fila, agrega la fila al estado de filas seleccionadas
              setSelectedRows([...selectedRows, row.original])
            } else {
              // Si se deselecciona la fila, elimina la fila del estado de filas seleccionadas
              setSelectedRows(selectedRows.filter((selectedRow) => selectedRow !== row.original))
            }
          }}
          aria-label="Seleccionar columana"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'testName',
      header: 'Lista de examenes disponibles',
      cell: ({ row }) => <div className="font-inter font-medium">{row.getValue('testName')}</div>
    },
    {
      accessorKey: 'testPrice',
      header: 'Precios de los examenes',
      cell: ({ row }) => <div className="capitalize">{`$ ${row.getValue('testPrice')}`}</div>
    },
    {
      accessorKey: 'testPriceWithDiscount',
      header: 'Descuentos',
      cell: ({ row }): JSX.Element => {
        return row.getValue('testPriceWithDiscount') === null ? (
          <div>{'---'}</div>
        ) : (
          <div className="capitalize">{`$ ${row.getValue('testPriceWithDiscount')}`}</div>
        )
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

  return (
    <div className="flex justify-center align-middle">
      <div className="w-[90%]">
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Buscar un examen por nombre"
            value={(table.getColumn('testName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('testName')?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <div>
            <Button
              onClick={() => {
                selectedRows.map((testInfo) => {
                  function obtenerFechaActual(): string {
                    const fecha = new Date()
                    const año = fecha.getFullYear()
                    const mes = agregarCero(fecha.getMonth() + 1)
                    const dia = agregarCero(fecha.getDate())
                    return `${año}-${mes}-${dia}`
                  }

                  function agregarCero(numero: number): string {
                    return numero < 10 ? `0${numero}` : `${numero}`
                  }

                  const fechaActual = obtenerFechaActual()

                  const customerTestInfo: CostumerTestAddInterface = {
                    idCustomer: clientObjectInfo!.idCustomer,
                    idTest: testInfo.idTest,
                    status: '0'
                  }

                  const resultsInfo = {
                    idCustomers: clientObjectInfo!.idCustomer,
                    idTests: testInfo!.idTest,
                    resultTimeStamp: fechaActual,
                    resultNote: 'No hay notas'
                  }
                  console.log(resultsInfo)

                  newCustomerTests.mutate(customerTestInfo)
                  addNewResult.mutate(resultsInfo)
                })
                goToBack(-1)
              }}
              className="bg-[#0a95ed] text-[#fff]"
              variant={'ghost'}
            >
              Agregar Examenes
            </Button>
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
                        className="text-gray-800 max-w-[120px] font-medium m-0 p-2 bg-[#EFFBFF]"
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
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
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
      </div>
    </div>
  )
}
