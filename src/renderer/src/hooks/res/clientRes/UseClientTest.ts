import { CostumerTestAddInterface, CostumerTestInterface, PriceTestI } from '@renderer/interfaces/clients/costumersTest'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'
import apiConection from '../../../api/ConnectionAPI'


const notifyCreatedSucces = (): string => {
  return toast.success('Agregado Exitosamente..!')
}

const notifyDeleteSucces = (): string => {
  return toast.error('Examen eliminado..!')
}

const notifyUpdatedSucces = (): string => {
  return toast.success('Estatus editado..!')
}

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
      toast.error('No se pudo agregar el examen')
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

//TODO: Update user
export const useUpdateTestCustomers = (): UseMutationResult<CostumerTestAddInterface,Error,{ CostumerTestInfo: CostumerTestAddInterface; idCustomerTest: number },unknown> => {
  const queryClient = useQueryClient()
  const updateClient = async ({CostumerTestInfo , idCustomerTest}: {CostumerTestInfo: CostumerTestAddInterface, idCustomerTest: number
  }): Promise<CostumerTestAddInterface> => {
    const { data } = await apiConection.patch<CostumerTestAddInterface>(`/customertest/${idCustomerTest}`, CostumerTestInfo)
    return data
  }

  return useMutation({
    mutationFn: (variables: { CostumerTestInfo: CostumerTestAddInterface; idCustomerTest: number }) =>
      updateClient(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
      notifyUpdatedSucces()
    },
    onError: () => {
      toast.error('No se pudo actualizar el estatus')
    }
  })
}

// * This section is to update the price by test
const updatePriceTest = async (idCustomerTest:number, testPrice: PriceTestI): Promise<PriceTestI> => {
  const { data } = await apiConection.patch<PriceTestI>(`/customertest/${idCustomerTest}`, testPrice);
  return data;
};

export const useUpdatePriceTest = (): UseMutationResult<PriceTestI, Error, { idCustomerTest: number, testPrice: PriceTestI }> => {
  const queryClient = useQueryClient();
  return useMutation<PriceTestI, Error, { idCustomerTest: number, testPrice: PriceTestI }>({
    mutationFn: ({ idCustomerTest, testPrice }) => updatePriceTest(idCustomerTest, testPrice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contentResults'] });
      console.log("Se ha actualizado..!");
    },
    onError: () => {
      console.log("No se pudo actualizar el campo..!");
    }
  });
};