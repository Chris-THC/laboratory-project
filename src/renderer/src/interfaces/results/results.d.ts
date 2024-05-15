export interface ResultsInterface {
  idResults?: number | null | undefined
  idCustomers: number | null | undefined 
  idTests: number
  resultTimeStamp: string
  resultNote: string
  contentsResultsInfo?: ContentsResultsInfo
}

interface ContentsResultsInfo {
  contResultId?: number | null | undefined
  resultId: number
  contId: number
  resValue: string
}
