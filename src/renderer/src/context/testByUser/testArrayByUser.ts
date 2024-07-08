import { CostumerTestInterface } from '@renderer/interfaces/clients/costumersTest'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { create } from 'zustand'

interface ArrayTestList {
  testArrayList: CostumerTestInterface[] | null | undefined
  setTestArrayList: (testArrayListItem: CostumerTestInterface[] | null | undefined) => void

  contentsArrayTestToPDF: ContentsResultsInterface[] | null | undefined
  setContentsArrayTestToPDF: (
    testArrayListItem: ContentsResultsInterface[] | null | undefined
  ) => void
}

export const useTestArrayList = create<ArrayTestList>((set) => ({
  testArrayList: null,
  setTestArrayList: (testArrayListItem: CostumerTestInterface[] | null | undefined): void => {
    return set(() => ({
      testArrayList: testArrayListItem
    }))
  },
  contentsArrayTestToPDF: null,
  setContentsArrayTestToPDF: (contenItem: ContentsResultsInterface[] | null | undefined): void => {
    return set(() => ({
      contentsArrayTestToPDF: contenItem
    }))
  }
}))
