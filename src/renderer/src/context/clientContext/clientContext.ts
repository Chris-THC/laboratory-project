import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { create } from 'zustand'

interface ClientSelectedById {
  isClientCreate: boolean
  setIsClientCreate: (isClientCreate: boolean) => void
  clientObjectInfo?: ClientsInterface | null
  setClientObjectInfo: (client: ClientsInterface) => void
}

export const useClientIdSelected = create<ClientSelectedById>((set) => ({
  isClientCreate: true,
  setIsClientCreate: (isClientCreate: boolean): void =>
    set(() => ({
      isClientCreate: isClientCreate
    })),

  clientObjectInfo: null,
  setClientObjectInfo: (client: ClientsInterface | null): void => {
    return set(() => ({
      clientObjectInfo: client
    }))
  }
}))
