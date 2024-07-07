import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { create } from 'zustand'

interface ContentsResultsContextInterface {
  resultsId: number
  setResultsId: (resultsId: number) => void

  contentResultsArray: ContentsResultsInterface[] | null | undefined
  setContentResultsArray: (contentResults: ContentsResultsInterface[] | null | undefined) => void
}

export const useContentResultWasSelect = create<ContentsResultsContextInterface>((set) => ({
  resultsId: -1,
  setResultsId: (resultsId: number): void =>
    set(() => ({
      resultsId: resultsId
    })),

  contentResultsArray: null,
  setContentResultsArray: (contentResults: ContentsResultsInterface[] | null | undefined): void => {
    return set(() => ({
      contentResultsArray: contentResults
    }))
  }
}))
