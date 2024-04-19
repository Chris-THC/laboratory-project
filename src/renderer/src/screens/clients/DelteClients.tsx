import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useModalDelete } from '@renderer/context/ModalDeleteContext/IsOpenModalDelete'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useDelateClient } from '@renderer/hooks/res/clientRes/UseClientAPI'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface DelateUserModalProps {
  idCostumer: number
  name: string
  isOpen: boolean
}

export const DelateClientsModal: React.FC<DelateUserModalProps> = ({
  idCostumer,
  name,
  isOpen
}) => {
  const navigateTo = useNavigate()
  const { setClientObjectInfo, setIsClientCreate } = useClientIdSelected()
  const { isOpenModalDelete, setIsOpenModalDelete } = useModalDelete()

  const deleteClient = useDelateClient()
  const onDeleteUser = (idCostumer: number): void => {
    deleteClient.mutate(idCostumer)
    setClientObjectInfo(null)
    setIsClientCreate(true)
    navigateTo('/customer')
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row justify-center align-middle">
            ¿Está seguro de eliminar a este cliente?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">{`El cliente registrado con el nombre ${name} se eliminará de la aplicación`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center align-middle w-full">
            <AlertDialogAction
              onClick={() => {
                onDeleteUser(idCostumer)
                setIsOpenModalDelete(!isOpenModalDelete)
              }}
              className="bg-red-600 mx-3"
            >
              Eliminar
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                setIsOpenModalDelete(!isOpenModalDelete)
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
