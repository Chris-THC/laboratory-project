import { create } from 'zustand'

interface TestIdSelectedByTestContentsInterface {
  idTestByTestContent: number
  setIdTestByTestContent: (idTestByTestContent: number) => void
}

export const useTestIdByTestContens = create<TestIdSelectedByTestContentsInterface>((set) => ({
  idTestByTestContent: 0,
  setIdTestByTestContent: (idTestByTestContent: number): void =>
    set(() => ({
      idTestByTestContent: idTestByTestContent
    }))
}))
