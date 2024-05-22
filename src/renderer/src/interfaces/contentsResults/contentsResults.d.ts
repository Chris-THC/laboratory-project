export interface ContentsResultsInterface {
  contResultId?: number | undefined | null
  resultId?: number | undefined | null
  contentId: number
  resultValue: string | number
  contentsDTO?: ContentsDto
}

interface ContentsDto {
  contentId: number
  name: string
}
