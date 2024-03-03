import { create } from 'zustand'

interface UserSelectedById {
  idUser?: number | null | undefined
  setIdUser: (idUser: number) => void
}

export const useUserIdSelected = create<UserSelectedById>((set) => ({
  idUser: 0,
  setIdUser: (idUserProp: number): void =>
    set(() => ({
      idUser: idUserProp
    }))
}))
