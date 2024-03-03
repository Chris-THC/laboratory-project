import { UsersInterface } from '@renderer/interfaces/users/user'
import { create } from 'zustand'

interface UserSelectedById {
  isCreate: boolean
  setIsCreate: (isCreate: boolean) => void
  userObjectInfo?: UsersInterface | null
  setUserObjectInfo: (user: UsersInterface) => void
}

export const useUserIdSelected = create<UserSelectedById>((set) => ({
  isCreate: true,
  setIsCreate: (isCreate: boolean): void =>
    set(() => ({
      isCreate: isCreate
    })),

  userObjectInfo: null,
  setUserObjectInfo: (user: UsersInterface): void => {
    return set(() => ({
      userObjectInfo: user
    }))
  }
}))
