import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useGetAllUsers } from '@renderer/hooks/res/usersRes/UseUsersAPI'
// import { useUpdateTasksByuseUsers } from '@renderer/hooks/useUpdate'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const UsersListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllUsers()
  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
    navigateTo('/users/create')
  }

  if (isLoading) {
    return (
      <div>
        <h1>Is loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="m-9 flex flex-row justify-around">
        <div>
          <h2 className="text-2xl font-inter font-bold">USUARIOS REGISTRADOS EN EL SISTEMA</h2>
        </div>
        <div>
          <Button onClick={onCreateNewUser} className="bg-sky-700 text-white" variant={'ghost'}>
            <UserPlus className="mr-2" />
            Usuario
          </Button>
        </div>
      </div>
      {!data ? (
        <div></div>
      ) : (
        <div className="flex justify-center align-middle mx-8 my-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[180px]">Nombre</TableHead>
                <TableHead className="text-center max-w-[300px]">Edad</TableHead>
                <TableHead className="text-center max-w-[100px]">Número de Teléfono</TableHead>
                <TableHead className="text-center max-w-[100px]">Direccion</TableHead>
                <TableHead className="text-center">Rol</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((userInfo, index) => {
                return (
                  <TableRow className="m-0 p-0" key={index}>
                    <TableCell className="text-center font-medium m-0 p-2">
                      {userInfo.name}
                    </TableCell>
                    <TableCell className="text-center m-0 p-2">{userInfo.age}</TableCell>
                    <TableCell className="text-center m-0 p-2">{userInfo.phoneNumber}</TableCell>
                    <TableCell className="text-center m-0 p-2">{userInfo.address}</TableCell>
                    <TableCell className="text-center m-0 p-2">{userInfo.role}</TableCell>
                    <TableCell className="flex justify-center items-center m-0 p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
