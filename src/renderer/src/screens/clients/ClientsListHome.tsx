import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useGetAllClient } from '@renderer/hooks/res/clientRes/UseClientAPI'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  AlignLeft,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  UserCog,
  UserPlus,
  UserX
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { DelateClientsModal } from './DelteClients'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useModalDelete } from '@renderer/context/ModalDeleteContext/IsOpenModalDelete'

export const ClientsListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllClient()
  const { setClientObjectInfo, setIsClientCreate } = useClientIdSelected()
  const { isOpenModalDelete, setIsOpenModalDelete } = useModalDelete()
  const [idUserToDelete, setIdUserToDelete] = useState(0)
  const [nameUserToDelete, setNameUserToDelete] = useState('')

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'name'
    },
    {
      header: 'Edad',
      accessorKey: 'age'
    },
    {
      header: 'Teléfono',
      accessorKey: 'phoneNumber'
    },
    {
      header: 'Dirección',
      accessorKey: 'address'
    },
    {
      header: 'Doctor',
      accessorKey: 'doctorName'
    },

    // {
    //   header: 'Estatus',
    //   accessorKey: 'status',
    //   cell: ({ row }): string | undefined | null => {
    //     return changeStatusTable(row.original.status)
    //   }
    // },
    {
      header: 'Acciones',
      cell: ({ row }): JSX.Element => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-gray-800" variant="ghost">
                <AlignLeft />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Selecciona una opción</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  onClick={() => {
                    setIsClientCreate(false)
                    setClientObjectInfo(row.original)
                    navigateTo('/customer/form')
                  }}
                  value="Editar"
                  className="text-[#15658d] font-bold px-1"
                >
                  <UserCog color="#15658d" className="mr-2 h-4 w-4" />
                  Editar
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem
                  onClick={() => {
                    setIdUserToDelete(row.original.idCustomer)
                    setNameUserToDelete(row.original.name)
                    setIsOpenModalDelete(!isOpenModalDelete)
                  }}
                  value="Eliminar"
                  className="text-[#c80800] font-bold px-1"
                >
                  <UserX color="#c80800" className="mr-2 h-4 w-4" />
                  Eliminar
                </DropdownMenuRadioItem>

                <DropdownMenuSeparator />

                <DropdownMenuRadioItem
                  onClick={() => {
                    navigateTo('/tests')
                  }}
                  value="Gestionar Examenes"
                  className="text-[#0a8f94] font-bold px-1"
                >
                  <FlaskConical color="#0a8f94" className="mr-2 h-4 w-4" />
                  Gestionar exámenes
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const [filter, setFilter] = useState('')

  const tableCostumer = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filter
    },
    onGlobalFilterChange: setFilter
  })

  useEffect(() => {
    tableCostumer.setPageSize(7)
  }, [])

  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
    setIsClientCreate(true)
    setClientObjectInfo(null)
    navigateTo('/customer/form')
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {!data ? (
        <ErrorPage />
      ) : (
        <div>
          <div className="mt-9 mx-9 mb-1 flex flex-row justify-around">
            <div>
              <h2 className="text-2xl font-inter font-bold">CLIENTES REGISTRADOS EN EL SISTEMA</h2>
            </div>
            <div>
              <Button
                onClick={onCreateNewUser}
                className="bg-[#0a95ed] text-white"
                variant={'ghost'}
              >
                <UserPlus className="mr-2" />
                Cliente
              </Button>
            </div>
          </div>
          <Separator />

          <div className="flex flex-col justify-center align-middle mx-8">
            <div className="max-w-96 my-3">
              <h2 className="font-inter text-xl mb-2">Busqueda</h2>
              <Input
                type="text"
                placeholder="Buscar por normbre"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="h-full">
              <Table className="border">
                <TableHeader>
                  {tableCostumer.getHeaderGroups().map((headerGrup) =>
                    headerGrup.headers.map((header, index) => (
                      <TableHead
                        key={index}
                        className="text-center text-gray-800 max-w-[120px]   font-medium m-0 p-2 bg-[#EFFBFF]"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))
                  )}
                </TableHeader>
                <TableBody>
                  {tableCostumer.getRowModel().rows.map((row, index) => (
                    <TableRow
                      className="m-0 p-0 text-gray-600 text-center max-w-[120px] font-medium"
                      key={index}
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={index}
                          className="text-center max-w-[120px] font-medium m-0 p-2"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      disabled={!tableCostumer.getCanPreviousPage}
                      variant={'ghost'}
                      onClick={() => tableCostumer.previousPage()}
                    >
                      <ChevronLeft className="mr-1" />
                      Anterior
                    </Button>
                  </PaginationItem>

                  {/* Mostrar el número anterior si no estamos en la primera página */}
                  {tableCostumer.getState().pagination.pageIndex > 0 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() =>
                          tableCostumer.setPageIndex(
                            tableCostumer.getState().pagination.pageIndex - 1
                          )
                        }
                      >
                        {tableCostumer.getState().pagination.pageIndex}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Mostrar el número actual */}
                  <PaginationItem>
                    <PaginationLink
                      isActive={true} // Establece isActive a true para la página actual
                      onClick={() =>
                        tableCostumer.setPageIndex(tableCostumer.getState().pagination.pageIndex)
                      }
                    >
                      {tableCostumer.getState().pagination.pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>

                  {/* Mostrar el número siguiente si no estamos en la última página */}
                  {tableCostumer.getState().pagination.pageIndex <
                    tableCostumer.getPageCount() - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() =>
                          tableCostumer.setPageIndex(
                            tableCostumer.getState().pagination.pageIndex + 1
                          )
                        }
                      >
                        {tableCostumer.getState().pagination.pageIndex + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Mostrar el símbolo "..." si hay más de dos páginas antes del número actual */}
                  {tableCostumer.getPageCount() > 3 &&
                    tableCostumer.getState().pagination.pageIndex > 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                  {/* Mostrar el número de la última página si no estamos en la última página */}
                  {tableCostumer.getState().pagination.pageIndex <
                    tableCostumer.getPageCount() - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => tableCostumer.setPageIndex(tableCostumer.getPageCount() - 1)}
                      >
                        {tableCostumer.getPageCount()}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      variant={'ghost'}
                      disabled={!tableCostumer.getCanNextPage}
                      onClick={() => {
                        if (
                          tableCostumer.getState().pagination.pageIndex ===
                          tableCostumer.getPageCount() - 1
                        ) {
                          tableCostumer.getPageCount() - 1
                        } else {
                          tableCostumer.nextPage()
                        }
                      }}
                    >
                      Siguiente
                      <ChevronRight className="ml-1" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <Toaster />
            <DelateClientsModal
              isOpen={isOpenModalDelete}
              idCostumer={idUserToDelete}
              name={nameUserToDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
