import { UsersInterface } from '@renderer/interfaces/users/user'
import {
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
  useMutation
} from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'

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

// TODO: Get user by id
const getUsersById = async (): Promise<UsersInterface> => {
  const { idUser } = useUserIdSelected()
  const { data } = await apiConection.get<UsersInterface>(`/user/${idUser}`)
  return data
}

export const useGetuserById = (): UseQueryResult<UsersInterface> => {
  return useQuery({
    queryKey: ['userById'],
    queryFn: getUsersById
  })
}

// TODO: Create a new user
export const postNewUser = async (newUserInfo: UsersInterface): Promise<UsersInterface> => {
  const { data } = await apiConection.post<UsersInterface>('/user', newUserInfo)
  return data
}

export const useCreateNewUser = (): UseMutationResult<
  UsersInterface,
  Error,
  UsersInterface,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postNewUser,
    onSuccess: () => {
      queryClient.invalidateQueries('userInfoAPI')
    }
  })
}

//TODO: Update user
const updateUerById = async (userInfo: UsersInterface): Promise<UsersInterface> => {
  const { idUser } = useUserIdSelected()
  const { data } = await apiConection.patch<UsersInterface>(`/user/${idUser}`, userInfo)
  return data
}

export const useUpdateTasksByuseUsers = (): UseMutationResult<
  UsersInterface,
  Error,
  UsersInterface,
  unknown
> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateUerById,
    onSuccess: () => {
      queryClient.invalidateQueries('userInfoAPI')
    }
  })
}
