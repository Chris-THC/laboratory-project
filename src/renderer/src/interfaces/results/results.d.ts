export interface ResultsInterface {
  idResults?: number
  idCustomers: number
  idTests: number
  resultTimeStamp: string
  resultNote?: string
  contentsResultsInfo?: ContentsResultsInfo
}

interface ContentsResultsInfo {
  contResultId?: number
  resultId: number
  contId: number
  resValue: string
}
