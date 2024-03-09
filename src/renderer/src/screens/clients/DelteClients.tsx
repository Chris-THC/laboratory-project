import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useDelateClient } from '@renderer/hooks/res/clientRes/UseClientAPI'
import { UserX } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DelateClientsModal: React.FC = () => {
  const navigateTo = useNavigate()
  const { clientObjectInfo, setClientObjectInfo, setIsClientCreate } = useClientIdSelected()

  const deleteClient = useDelateClient()
  const onDeleteUser = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const idClient: any = clientObjectInfo?.idCustomer
    console.log(idClient)

    deleteClient.mutate(idClient)
    setClientObjectInfo(null)
    setIsClientCreate(true)
    navigateTo('/customer')
    console.log('Eliminar')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-inherit font-inter" variant="ghost">
          <UserX />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row justify-center align-middle">
            ¿Está seguro de eliminar a este cliente?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">{`El cliente registrado con el nombre ${clientObjectInfo?.name} se eliminará de la aplicación`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center align-middle w-full">
            <AlertDialogAction onClick={onDeleteUser} className="bg-red-600 mx-3">
              Eliminar
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                console.log('NO se elimino')
              }}
              className="mx-3"
            >
              Cancel
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
