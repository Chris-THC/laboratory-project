import React from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useDelateUser } from '@renderer/hooks/res/usersRes/UseUsersAPI'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
import { useModalDelete } from '@renderer/context/ModalDeleteContext/IsOpenModalDelete'
interface DelateUserModalProps {
  idUser: number
  name: string
  isOpen:boolean
}

export const DelateUserModal: React.FC<DelateUserModalProps> = ({ idUser, name, isOpen }) => {
  const navigateTo = useNavigate()
  const { setUserObjectInfo, setIsCreate } = useUserIdSelected()
  const { isOpenModalDelete, setIsOpenModalDelete } = useModalDelete()

  const deleteUser = useDelateUser()

  const onDeleteUser = (userId: number): void => {
    console.log(`==> ${userId}`)

    deleteUser.mutate(userId)
    setUserObjectInfo(null)
    setIsCreate(true)
    navigateTo('/users')
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
                onDeleteUser(idUser)
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
