import { UsersInterface } from '@renderer/interfaces/users/user'
import { create } from 'zustand'

interface UserSelectedById {
  isCreate: boolean
  setIsCreate: (isCreate: boolean) => void
  userObjectInfo?: UsersInterface | null
  setUserObjectInfo: (user: UsersInterface | null) => void
}

export const useUserIdSelected = create<UserSelectedById>((set) => ({
  isCreate: true,
  setIsCreate: (isCreate: boolean): void =>
    set(() => ({
      isCreate: isCreate
    })),

  userObjectInfo: null,
  setUserObjectInfo: (user: UsersInterface | null): void => {
    return set(() => ({
      userObjectInfo: user
    }))
  }
}))
