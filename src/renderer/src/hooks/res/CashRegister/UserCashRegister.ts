import { CashRegisterI } from '@renderer/interfaces/CashRegisterInterface/CashRegisterInterface'
import { ResultsInterface } from '@renderer/interfaces/results/results'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import apiConection from '../../../api/ConnectionAPI'

//Here we get all users list data
const getOrderList = async (): Promise<CashRegisterI[]> => {
  const { data } = await apiConection.get<CashRegisterI[]>('/order')
  return data
}

export const useGetOrderList = (): UseQueryResult<CashRegisterI[]> => {
  return useQuery({
    queryKey: ['orderInfoByApi'],
    queryFn: getOrderList
  })
}

// const addResultByCustomer = async (resultsBody: ResultsInterface): Promise<ResultsInterface> => {
//   const { data } = await apiConection.post<ResultsInterface>('/result', resultsBody)
//   return data
// }

// export const useAddResults = (): UseMutationResult<ResultsInterface, Error, ResultsInterface, unknown> => {
//     const queryClient = useQueryClient()

//     return useMutation({
//       mutationFn: addResultByCustomer,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
//         // notifyCreatedSucces()
//         console.log("Se agrego un test");

//       },
//       onError: (err:Error) => {
//         // toast.error('No se pudo crear al usuario')
//         console.log(`Hay un error: ${err}`);

//       }
//     })
//   }

//TODO: Delete costumer test
// const deleteResultByIdTestAndIdCustomer = async (idTest: number, idCustomer:number): Promise<HttpStatusCode> => {
//   const { data } = await apiConection.delete<HttpStatusCode>(`/result/test/delete/${idTest}/${idCustomer}`)
//   return data
// }

// export const useDeleteResult = (): UseMutationResult<HttpStatusCode, Error, { idTest: number, idCustomer: number }, unknown> =>{
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: ({ idTest, idCustomer }) => deleteResultByIdTestAndIdCustomer(idTest, idCustomer),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['testByIdCustomer'] })
//       console.log(`Se ha eliminado un resultado`);
//     },
//     onError: () => {
//       console.log(`Ha ocurrido un error`);
//     }
//   })
// }

// TODO: In this sectio is to get Results info by idTest and IdCustomer

export const getResultsByIdTestAndIdCustomer = async (
  idTest: number | undefined | null,
  idCustomer: number | undefined | null
): Promise<ResultsInterface[]> => {
  const { data } = await apiConection.get<ResultsInterface[]>(
    `/result/customer/${idTest}/${idCustomer}`
  )
  return data
}

export const useGetResultsByIdTestAndIdCustomer = (
  idTest: number | undefined | null,
  idCustomer: number | undefined | null
): UseQueryResult<ResultsInterface[]> => {
  return useQuery({
    queryKey: ['getResultsByIdTestnIdCustomer'],
    queryFn: () => getResultsByIdTestAndIdCustomer(idTest, idCustomer)
  })
}
