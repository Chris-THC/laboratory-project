export interface TestContentsInterface {
  testContentId: number
  testId: number
  contentId: number
  contentsDTO?: ContentsDto
}

interface ContentsDto {
  contentId: number
  name: string
}
