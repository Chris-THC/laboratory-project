import { create } from 'zustand'

interface TestIdSelectedByTestContentsInterface {
  idTestByTestContent: number
  setIdTestByTestContent: (idTestByTestContent: number) => void
  testNameSelected: string
  setTestNameSelected: (testNameSelected: string) => void
}

export const useTestIdByTestContens = create<TestIdSelectedByTestContentsInterface>((set) => ({
  idTestByTestContent: 0,
  setIdTestByTestContent: (idTestByTestContent: number): void =>
    set(() => ({
      idTestByTestContent: idTestByTestContent
    })),
  testNameSelected: '',
  setTestNameSelected: (TestName: string): void =>
    set(() => ({
      testNameSelected: TestName
    }))
}))
