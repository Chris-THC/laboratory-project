import { CashRegisterI } from '@renderer/interfaces/CashRegisterInterface/CashRegisterInterface'
import { SendOrderInfo } from '@renderer/interfaces/orders/OrderTest'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import apiConection from '../../../api/ConnectionAPI'

const notifyCreatedSucces = (): string => {
  return toast.success('Ordern de pago creada exitosamente!')
}

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

const AddOrderFn = async (orderBody: SendOrderInfo): Promise<SendOrderInfo> => {
  const { data } = await apiConection.post<SendOrderInfo>(`/order`, orderBody)
  return data
}

export const useAddNewOrder = (): UseMutationResult<SendOrderInfo, Error, { orderBody: SendOrderInfo }> => {
  const queryClient = useQueryClient();
  return useMutation<SendOrderInfo, Error, {orderBody: SendOrderInfo }>({
    mutationFn: ({ orderBody }) => AddOrderFn(orderBody),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderInfoByApi'] });
      notifyCreatedSucces()
    },
    onError: () => {
      toast.error('No se pudo crear la orden')
    }
  });
};

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
