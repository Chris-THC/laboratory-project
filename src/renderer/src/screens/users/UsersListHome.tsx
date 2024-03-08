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
import { Toaster } from 'react-hot-toast'

<<<<<<< HEAD
=======
const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">No se pudo conectar con el servidor</h2>
        <p className="text-gray-700">Por favor, inténtelo de nuevo más tarde.</p>
      </div>
    </div>
  )
}

>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
export const UsersListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllUsers()
  const { setUserObjectInfo, setIsCreate } = useUserIdSelected()

  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
<<<<<<< HEAD
=======
    setIsCreate(true)
    setUserObjectInfo(null)
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
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
<<<<<<< HEAD
        <div></div>
=======
        <div>
          <ErrorPage />
        </div>
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
      ) : (
        <div className="flex justify-center align-middle mx-8 my-5">
          <Table>
            <TableHeader>
              <TableRow>
<<<<<<< HEAD
                <TableHead className="text-center w-[180px]">Nombre</TableHead>
                <TableHead className="text-center max-w-[300px]">Edad</TableHead>
                <TableHead className="text-center max-w-[100px]">Número de Teléfono</TableHead>
                <TableHead className="text-center max-w-[100px]">Direccion</TableHead>
                <TableHead className="text-center">Rol</TableHead>
=======
                <TableHead className="text-center w-[220px]">Nombre</TableHead>
                <TableHead className="text-center max-w-[50px]">Edad</TableHead>
                <TableHead className="text-center min-w-[60px]">Teléfono</TableHead>
                <TableHead className="text-center min-w-[200px]">Direccion</TableHead>
                <TableHead className="text-center max-w-[40px]">Rol</TableHead>
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
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
<<<<<<< HEAD
                    <TableCell className="text-center m-0 p-2">{userInfo.role}</TableCell>
=======
                    <TableCell className="text-center m-0 p-2">
                      {userInfo.role.toString() === 'Admin' ? 'Administrador' : 'Empleado'}
                    </TableCell>
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
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
          <Toaster />
        </div>
      )}
    </div>
  )
}
