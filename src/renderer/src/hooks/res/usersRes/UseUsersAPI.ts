import { UsersInterface } from '@renderer/interfaces/users/user'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

//Here we get all users list data
const getAllUsersFromApi = async (): Promise<UsersInterface[]> => {
  const { data } = await apiConection.get<UsersInterface[]>('/user')
  return data
}

export const useGetAllUsers = (): UseQueryResult<UsersInterface[]> => {
  return useQuery({
    queryKey: ['userInfoAPI'],
    queryFn: getAllUsersFromApi
  })
}
