export interface TestContentsInterface {
  testContentId: number
  testId: number
  contentId: number
  contentsDTO?: ContentsDto
}

interface ContentsDto {
  contentId: number
  name: string
  units: string
  referencesDTO: ReferencesDto[]
}

interface ReferencesDto {
  referencesId: number
  contentId: number
  vmax: string
  vrefText: any
  vmin: string
}
