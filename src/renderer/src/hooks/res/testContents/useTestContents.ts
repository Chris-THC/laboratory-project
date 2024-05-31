import apiConection from '../../../api/ConnectionAPI'
import { TestContentsInterface } from '@renderer/interfaces/testContest/testContents'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const getAllTestContestRequest = async (idTest: number): Promise<TestContentsInterface[]> => {
  const { data } = await apiConection.get(`/testcontents/test/${idTest}`)
  return data
}

export const useTestContestByIdTest = (idTest: number): UseQueryResult<TestContentsInterface[]> => {
  return useQuery({
    queryKey: ['testContentsRequest'],
    queryFn: () => getAllTestContestRequest(idTest)
  })
}
