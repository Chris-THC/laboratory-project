import { CashRegisterI } from '@renderer/interfaces/CashRegisterInterface/CashRegisterInterface'
import { SendOrderInfo } from '@renderer/interfaces/orders/OrderTest'
import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'
import toast from 'react-hot-toast'
import apiConection from '../../../api/ConnectionAPI'

const notifyCreatedSucces = (): string => {
  return toast.success('Ordern de pago creada exitosamente!')
}

const notifyDeleteSucces = (): string => {
  return toast.error('Cliente eliminado')
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

//TODO: Delete order byId
const deleteOrder = async (idOrder: number): Promise<HttpStatusCode> => {
  const { data } = await apiConection.delete<HttpStatusCode>(`/order/${idOrder}`)
  return data
}

export const useDeleteOrderById = (): UseMutationResult<HttpStatusCode, Error, { idOrder: number}, unknown> =>{
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ idOrder }) => deleteOrder(idOrder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orderInfoByApi'] })
      notifyDeleteSucces()
    },
    onError: () => {
      toast.error('No se pudo eliminar la orden')
    }
  })
}
