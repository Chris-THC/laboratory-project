import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { create } from 'zustand'

interface ContentsResultsContextInterface {
  resultsId: number
  setResultsId: (resultsId: number) => void

  contentResults: ContentsResultsInterface | null | undefined
  setContentResults: (contentResults: ContentsResultsInterface) => void
}

export const useContentResultWasSelect = create<ContentsResultsContextInterface>((set) => ({
  resultsId: -1,
  setResultsId: (resultsId: number): void =>
    set(() => ({
      resultsId: resultsId
    })),

  contentResults: null,
  setContentResults: (contentResults: ContentsResultsInterface | null | undefined): void => {
    return set(() => ({
      contentResults: contentResults
    }))
  }
}))
