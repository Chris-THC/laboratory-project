import { create } from 'zustand'

interface TestIdSelectedByTestContentsInterface {
  idTestByTestContent: number
  setIdTestByTestContent: (idTestByTestContent: number) => void
  testNameSelected: string
  setTestNameSelected: (testNameSelected: string) => void
  idCustomerByTestContent: number
  setIdCustomerByTestContent: (idCustomerByTestContent: number) => void
}

export const useTestIdByTestContens = create<TestIdSelectedByTestContentsInterface>((set) => ({
  idTestByTestContent: -1,
  setIdTestByTestContent: (idTestByTestContent: number): void =>
    set(() => ({
      idTestByTestContent: idTestByTestContent
    })),
  testNameSelected: '',
  setTestNameSelected: (TestName: string): void =>
    set(() => ({
      testNameSelected: TestName
    })),
  idCustomerByTestContent: -1,
  setIdCustomerByTestContent: (idCustomerByTestContent: number): void =>
    set(() => ({
      idCustomerByTestContent: idCustomerByTestContent
    }))
}))
