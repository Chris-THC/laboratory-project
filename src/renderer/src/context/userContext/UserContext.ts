import { UsersInterface } from '@renderer/interfaces/users/user'
import { create } from 'zustand'

interface UserSelectedById {
  isCreate: boolean
  setIsCreate: (isCreate: boolean) => void
  userObjectInfo?: UsersInterface | null
<<<<<<< HEAD
  setUserObjectInfo: (user: UsersInterface) => void
=======
  setUserObjectInfo: (user: UsersInterface | null) => void
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
}

export const useUserIdSelected = create<UserSelectedById>((set) => ({
  isCreate: true,
  setIsCreate: (isCreate: boolean): void =>
    set(() => ({
      isCreate: isCreate
    })),

  userObjectInfo: null,
<<<<<<< HEAD
  setUserObjectInfo: (user: UsersInterface): void => {
=======
  setUserObjectInfo: (user: UsersInterface | null): void => {
>>>>>>> 12ae55fe847d822a403937460ccae1de40c83a8f
    return set(() => ({
      userObjectInfo: user
    }))
  }
}))
