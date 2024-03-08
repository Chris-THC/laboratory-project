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
import { UserCog, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// import { DelateUserModal } from './DeleteUser'
import { useGetAllClient } from '@renderer/hooks/res/clientRes/UseClientAPI'
import { Toaster } from 'react-hot-toast'
import { DelateClientsModal } from './DelteClients'

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

export const ClientsListHome = (): JSX.Element => {
  const { data, isLoading } = useGetAllClient()

  const navigateTo = useNavigate()
  const onCreateNewUser = (): void => {
    navigateTo('/customer/add')
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
          <h2 className="text-2xl font-inter font-bold">CLIENTES REGISTRADOS EN EL SISTEMA</h2>
        </div>
        <div>
          <Button onClick={onCreateNewUser} className="bg-sky-700 text-white" variant={'ghost'}>
            <UserPlus className="mr-2" />
            Cliente
          </Button>
        </div>
      </div>

      <Separator />

      {!data ? (
        <div>
          <ErrorPage />
        </div>
      ) : (
        <div className="flex justify-center align-middle mx-8 my-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[220px]">Nombre</TableHead>
                <TableHead className="text-center max-w-[50px]">Edad</TableHead>
                <TableHead className="text-center min-w-[60px]">Teléfono</TableHead>
                <TableHead className="text-center min-w-[200px]">Direccion</TableHead>
                <TableHead className="text-center max-w-[40px]">Estatus</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((clientInfo, index) => {
                return (
                  <TableRow className="m-0 p-0" key={index}>
                    <TableCell className="text-center font-medium m-0 p-2">
                      {clientInfo.name}
                    </TableCell>
                    <TableCell className="text-center m-0 p-2">{clientInfo.age}</TableCell>
                    <TableCell className="text-center m-0 p-2">{clientInfo.phoneNumber}</TableCell>
                    <TableCell className="text-center Fm-0 p-2">{clientInfo.address}</TableCell>
                    <TableCell className="text-center m-0 p-2">{clientInfo.status}</TableCell>
                    <TableCell className="flex justify-center items-center m-0 p-2">
                      <Button
                        className="bg-cyan-600 mr-1"
                        // onClick={() => {
                        //   setIsCreate(false)
                        //   setUserObjectInfo(userInfo)
                        //   navigateTo('/users/form')
                        // }}
                      >
                        <UserCog />
                      </Button>

                      <Button
                        onClick={() => {
                          //   setUserObjectInfo(userInfo)
                        }}
                        className="p-0 m-0"
                        variant={'destructive'}
                      >
                        <DelateClientsModal />
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
