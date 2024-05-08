import { CostumerTestAddInterface, CostumerTestInterface } from '@renderer/interfaces/clients/costumersTest'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'
import { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'


const notifyCreatedSucces = (): string => {
  return toast.success('Agregado Exitosamente..!')
}

const notifyDeleteSucces = (): string => {
  return toast.error('Examen eliminado..!')
}

// const notifyUpdatedSucces = (): string => {
//   return toast.success('Cliente editado exitosamente!')
// }

const allTestByIdCustomer = async (idCustomer: number | null | undefined): Promise<CostumerTestInterface[]> => {
  const { data } = await apiConection.get<CostumerTestInterface[]>(
    `customertest/customer/${idCustomer}`
  )
  return data
}

export const useAllTestByIdCustomer = (idCustomer: number | null | undefined): UseQueryResult<CostumerTestInterface[]> => {
  return useQuery({
    queryKey: ['testByIdCustomer'],

    queryFn: () => {
      return allTestByIdCustomer(idCustomer)
    }
  })
}


// TODO: Create a new customerTest
export const addNewCostumerTest = async (customerTestInfoBody: CostumerTestAddInterface): Promise<CostumerTestAddInterface> => {
  const { data } = await apiConection.post<CostumerTestAddInterface>('/customertest', customerTestInfoBody)
  return data
}

export const useAddCustomerTest = (): UseMutationResult<CostumerTestAddInterface, Error, CostumerTestAddInterface, unknown> => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addNewCostumerTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
      notifyCreatedSucces()
    },
    onError: () => {
      toast.error('No se pudo crear al usuario')
    }
  })
}


//TODO: Delete costumer test
export const deleteCustomerTestFuntion = async (idCustomerTest: number): Promise<HttpStatusCode> => {
  const { data } = await apiConection.delete<HttpStatusCode>(`/customertest/${idCustomerTest}`)
  return data
}

export const useDeleteCustomerTest = (): UseMutationResult<HttpStatusCode, Error, number, unknown> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteCustomerTestFuntion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
      notifyDeleteSucces()
    },
    onError: () => {
      toast.error('No se pudo eliminar al cliente')
    }
  })
}