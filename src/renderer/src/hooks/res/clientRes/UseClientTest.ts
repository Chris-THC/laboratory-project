import { CostumerTestInterface } from '@renderer/interfaces/clients/costumersTest'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

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
