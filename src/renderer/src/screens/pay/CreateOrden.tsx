import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { PayCard } from './PayCard'
import { AddOrderTestIn, MoreInfoAddOrder } from '@renderer/interfaces/orders/OrderTest'
import { getDateToday } from '@renderer/utils/dates/GetDate'

interface CreateOrdenProps {
  totalPrice: number
  customerName: string
}

const dataTest: AddOrderTestIn = {
  orderTotal: '1500',
  orderDeposit: '1000',
  orderAmountPaid: '500',
  orderChange: '0',
  orderNotes: ''
}
const morDataInfo: MoreInfoAddOrder = {
  idUsers: 1,
  idCustomers: 1,
  orderTimeStamp: getDateToday()
}

export const CreateOrden: React.FC<CreateOrdenProps> = ({ totalPrice, customerName }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-lg  px-6 py-2 text-xl font-medium text-[#111] shadow-lg">
          <p>{`$${totalPrice}`}</p>
        </DialogTrigger>
        <DialogContent className="w-[90rem] h-[33rem] max-w-[65%] max-h-[100%] m-10 flex justify-center align-middle content-center">
          <PayCard ordendata={dataTest} moreDataByOrder={morDataInfo} nameCustomer={customerName} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
