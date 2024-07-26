import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
import { useGetAllUsers } from '@renderer/hooks/res/usersRes/UseUsersAPI'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination'

import { ChevronLeft, AlignLeft, UserX, ChevronRight, UserCog, UserPlus } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { DelateUserModal } from './DeleteUser'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

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

export const UsersListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllUsers()
  const { setUserObjectInfo, setIsCreate } = useUserIdSelected()
  const { isOpenModalDelete, setIsOpenModalDelete } = useModalDelete()
  const [idUserToDelete, setIdUserToDelete] = useState(0)
  const [nameUserToDelete, setNameUserToDelete] = useState('')
  const [filterUsers, setFilterUsers] = useState('')

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
      header: 'Rol del usuario',
      accessorKey: 'role',
      cell: ({ getValue }): string => {
        return getValue() === 'Admin' ? 'Administrador' : 'Empleado'
      }
    },
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
                    setIsCreate(false)
                    setUserObjectInfo(row.original)
                    navigateTo('/users/form')
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
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const tableUser = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterUsers
    },
    onGlobalFilterChange: setFilterUsers
  })

  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
    setIsCreate(true)
    setUserObjectInfo(null)
    navigateTo('/users/form')
  }

  useEffect(() => {
    tableUser.setPageSize(7)
  }, [])

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
              <h2 className="text-2xl font-inter font-bold">USUARIOS REGISTRADOS EN EL SISTEMA</h2>
            </div>
            <div>
              <Button
                onClick={onCreateNewUser}
                className="bg-[#00CAEF] text-white"
                variant={'ghost'}
              >
                <UserPlus className="mr-2" />
                Usuario
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex flex-col justify-center align-middle mx-8">
            <div className="max-w-96 my-3">
              <h2 className="font-inter text-xl mb-2">Busqueda</h2>
              <Input
                type="text"
                placeholder="Buscar por nombre"
                value={filterUsers}
                onChange={(e) => setFilterUsers(e.target.value)}
              />
            </div>
            <Table className="border">
              <TableHeader>
                {tableUser.getHeaderGroups().map((headerGrup) =>
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
                {tableUser.getRowModel().rows.map((row, index) => (
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

            <div className="mt-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      disabled={!tableUser.getCanPreviousPage}
                      variant={'ghost'}
                      onClick={() => tableUser.previousPage()}
                    >
                      <ChevronLeft className="mr-1" />
                      Anterior
                    </Button>
                  </PaginationItem>

                  {/* Mostrar el número anterior si no estamos en la primera página */}
                  {tableUser.getState().pagination.pageIndex > 0 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() =>
                          tableUser.setPageIndex(tableUser.getState().pagination.pageIndex - 1)
                        }
                      >
                        {tableUser.getState().pagination.pageIndex}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Mostrar el número actual */}
                  <PaginationItem>
                    <PaginationLink
                      isActive={true} // Establece isActive a true para la página actual
                      onClick={() =>
                        tableUser.setPageIndex(tableUser.getState().pagination.pageIndex)
                      }
                    >
                      {tableUser.getState().pagination.pageIndex + 1}
                    </PaginationLink>
                  </PaginationItem>

                  {/* Mostrar el número siguiente si no estamos en la última página */}
                  {tableUser.getState().pagination.pageIndex < tableUser.getPageCount() - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() =>
                          tableUser.setPageIndex(tableUser.getState().pagination.pageIndex + 1)
                        }
                      >
                        {tableUser.getState().pagination.pageIndex + 2}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  {/* Mostrar el símbolo "..." si hay más de dos páginas antes del número actual */}
                  {tableUser.getPageCount() > 3 &&
                    tableUser.getState().pagination.pageIndex > 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                  {/* Mostrar el número de la última página si no estamos en la última página */}
                  {tableUser.getState().pagination.pageIndex < tableUser.getPageCount() - 1 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => tableUser.setPageIndex(tableUser.getPageCount() - 1)}
                      >
                        {tableUser.getPageCount()}
                      </PaginationLink>
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <Button
                      variant={'ghost'}
                      disabled={!tableUser.getCanNextPage}
                      onClick={() => {
                        if (
                          tableUser.getState().pagination.pageIndex ===
                          tableUser.getPageCount() - 1
                        ) {
                          tableUser.getPageCount() - 1
                        } else {
                          tableUser.nextPage()
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
            <DelateUserModal
              isOpen={isOpenModalDelete}
              idUser={idUserToDelete}
              name={nameUserToDelete}
            />
          </div>
        </div>
      )}
    </div>
  )
}
