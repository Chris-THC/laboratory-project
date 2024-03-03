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

export const DelateUserModal: React.FC = () => {
  const navigateTo = useNavigate()
  const { userObjectInfo } = useUserIdSelected()
  const deleteUser = useDelateUser()
  const onDeleteUser = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const idUser: any = userObjectInfo?.idUser
    console.log(idUser)

    deleteUser.mutate(idUser)
    navigateTo('/users')
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
            ¿Está seguro de eliminar a este usuario?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">{`El usuario con el registrado con el nombre ${userObjectInfo?.name} se eliminará de la aplicación`}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center align-middle w-full">
            <AlertDialogAction onClick={onDeleteUser} className="bg-red-600 mx-3">
              Eliminar
            </AlertDialogAction>
            <AlertDialogCancel className="mx-3">Cancel</AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
