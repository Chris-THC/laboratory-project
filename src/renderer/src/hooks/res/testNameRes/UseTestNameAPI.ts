import { TestInterface } from '@renderer/interfaces/tests/test'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

//Here we get all users list data
const allTestList = async (): Promise<TestInterface[] | null | undefined> => {
  const { data } = await apiConection.get<TestInterface[]>('/test')
  return data
}

export const useGetTestList = (): UseQueryResult<TestInterface[]> => {
  return useQuery({
    queryKey: ['userTestListAPI'],
    queryFn: allTestList
  })
}
