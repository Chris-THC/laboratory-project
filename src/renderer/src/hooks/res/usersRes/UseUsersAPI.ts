import { UsersInterface } from '@renderer/interfaces/users/user'
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'
import apiConection from '../../../api/ConnectionAPI'

const notifyCreatedSucces = (): string => {
  return toast.success('Usuario agregado exitosamente!')
}

const notifyUpdatedSucces = (): string => {
  return toast.success('Usuario editado exitosamente!')
}

const notifyDeleteSucces = (): string => {
  return toast.error('Usuario eliminado')
}

//Here we get all users list data
const getAllUsersFromApi = async (): Promise<UsersInterface[] | null | undefined> => {
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
// const getUsersById = async (idUser: number): Promise<UsersInterface> => {
//   const { data } = await apiConection.get<UsersInterface>(`/user/${idUser}`)
//   return data
// }

// export const useGetuserById = (idUser: number): UseQueryResult<UsersInterface> => {
//   return useQuery({
//     queryKey: ['userById'],
//     queryFn: () => {
//       return getUsersById(idUser)
//     }
//   })
// }

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
      queryClient.invalidateQueries({ queryKey: ['userInfoAPI'] })
      notifyCreatedSucces()
    },
    onError: () => {
      toast.error('No se pudo crear al usuario')
    }
  })
}

//TODO: Update user
export const useUpdateUserById = (): UseMutationResult<
  UsersInterface,
  Error,
  { userInfo: UsersInterface; idUser: number },
  unknown
> => {
  const queryClient = useQueryClient()
  const updateUser = async ({
    userInfo,
    idUser
  }: {
    userInfo: UsersInterface
    idUser: number
  }): Promise<UsersInterface> => {
    const { data } = await apiConection.patch<UsersInterface>(`/user/${idUser}`, userInfo)
    return data
  }

  return useMutation({
    mutationFn: (variables: { userInfo: UsersInterface; idUser: number }) => updateUser(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfoAPI'] })
      notifyUpdatedSucces()
    },
    onError: () => {
      toast.error('No se pudo actualizar al usuario')
    }
  })
}

//TODO: Delete user
export const deletUserFuntion = async (idUser: number): Promise<HttpStatusCode> => {
  const { data } = await apiConection.delete<HttpStatusCode>(`/user/${idUser}`)
  return data
}

export const useDelateUser = (): UseMutationResult<HttpStatusCode, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletUserFuntion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userInfoAPI'] })
      notifyDeleteSucces()
    },
    onError: () => {
      toast.error('No se pudo eliminar al usuario')
    }
  })
}
