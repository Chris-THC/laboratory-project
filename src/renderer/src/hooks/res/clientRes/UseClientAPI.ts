import { ClientsInterface } from "@renderer/interfaces/clients/clients";
import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'
import { HttpStatusCode } from 'axios'

//Here we get all users list data
const getAllClientFromApi = async (): Promise<ClientsInterface[]> => {
  const { data } = await apiConection.get<ClientsInterface[]>('/customer')
  return data
}

export const useGetAllClient = (): UseQueryResult<ClientsInterface[]> => {
  return useQuery({
    queryKey: ['clientInfoAPI'],
    queryFn: getAllClientFromApi
  })
}


// TODO: Create a new user
export const postNewClient = async (newClientInfo: ClientsInterface): Promise<ClientsInterface> => {
  const { data } = await apiConection.post<ClientsInterface>('/customer', newClientInfo)
  return data
}

export const useCreateNewClient = (): UseMutationResult<
  ClientsInterface,
  Error,
  ClientsInterface,
  unknown
> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postNewClient,
    onSuccess: () => {
      queryClient.invalidateQueries('clientInfoAPI')
    }
  })
}

//TODO: Update user
export const useUpdateClientById = (): UseMutationResult<ClientsInterface, Error,{ ClientInfo: ClientsInterface; idClient: number },unknown> => {
  const queryClient = useQueryClient()
  const updateClient = async ({ ClientInfo, idClient }: { ClientInfo: ClientsInterface; idClient: number }):Promise<ClientsInterface> => {
    const { data } = await apiConection.patch<ClientsInterface>(`/customer/${idClient}`, ClientInfo)
    return data
  }

  return useMutation({
    mutationFn: (variables: { ClientInfo: ClientsInterface; idClient: number }) => updateClient(variables),
    onSuccess: () => {
      queryClient.invalidateQueries('clientInfoAPI')
    },
    onError: () => {
      alert("Hay un error")
    }
  })
}

//TODO: Delete user
export const deleteClientFuntion = async (idClient: number): Promise<HttpStatusCode> => {
  const { data } = await apiConection.delete<HttpStatusCode>(`/customer/${idClient}`)
  return data
}

export const useDelateClient = (): UseMutationResult<HttpStatusCode, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteClientFuntion,
    onSuccess: () => {
      queryClient.invalidateQueries('clientInfoAPI')
    }
  })
}
