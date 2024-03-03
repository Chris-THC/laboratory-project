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
import { UserCog, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { DelateUserModal } from './DeleteUser'

export const UsersListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllUsers()
  const { setUserObjectInfo, setIsCreate } = useUserIdSelected()

  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
    navigateTo('/users/form')
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
      <div className="mt-9 mx-9 mb-3 flex flex-row justify-around">
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

      <Separator />

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
                      <Button
                        className="bg-cyan-600 mr-1"
                        onClick={() => {
                          setIsCreate(false)
                          setUserObjectInfo(userInfo)
                          navigateTo('/users/form')
                        }}
                      >
                        <UserCog />
                      </Button>

                      <Button
                        onClick={() => {
                          setUserObjectInfo(userInfo)
                        }}
                        className="p-0 m-0"
                        variant={'destructive'}
                      >
                        <DelateUserModal />
                      </Button>
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
