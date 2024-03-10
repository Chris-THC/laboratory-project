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
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { UserX } from 'lucide-react'
import { useDelateUser } from '@renderer/hooks/res/usersRes/UseUsersAPI'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
interface DelateUserModalProps {
  idUser: number
  name: string
}

export const DelateUserModal: React.FC<DelateUserModalProps> = ({ idUser, name }) => {
  const navigateTo = useNavigate()
  const { setUserObjectInfo, setIsCreate } = useUserIdSelected()

  const deleteUser = useDelateUser()

  const onDeleteUser = (userId: number): void => {
    console.log(`==> ${userId}`)

    deleteUser.mutate(userId)
    setUserObjectInfo(null)
    setIsCreate(true)
    navigateTo('/users')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-inherit font-inter bg-red-600" variant="destructive">
          <UserX />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-row justify-center align-middle">
            ¿Está seguro de eliminar a este usuario?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">{`El usuario con el registrado con el nombre ${name} se eliminará de la aplicación`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center align-middle w-full">
            <AlertDialogAction
              onClick={() => {
                onDeleteUser(idUser)
              }}
              className="bg-red-600 mx-3"
            >
              Eliminar
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                setIsCreate(true)
                setUserObjectInfo(null)
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
