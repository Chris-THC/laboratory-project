import { create } from 'zustand'

interface ModalDeleteInterface {
  isOpenModalDelete: boolean
  setIsOpenModalDelete: (isOpenModalDelete: boolean) => void
}

export const useModalDelete = create<ModalDeleteInterface>((set) => ({
  isOpenModalDelete: false,
  setIsOpenModalDelete: (isOpenModalDelete: boolean): void =>
    set(() => ({
      isOpenModalDelete: isOpenModalDelete
    }))
}))
