import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { PayCard } from './PayCard'
import { AddOrderTestIn, MoreInfoAddOrder } from '@renderer/interfaces/orders/OrderTest'
import { getDateToday } from '@renderer/utils/dates/GetDate'

interface CreateOrdenProps {
  totalPrice: number
  customerName: string
  idCustomers: number
}

export const CreateOrden: React.FC<CreateOrdenProps> = ({
  totalPrice,
  customerName,
  idCustomers
}) => {
  const dataTest: AddOrderTestIn = {
    orderTotal: totalPrice,
    orderDeposit: 0,
    orderAmountPaid: 0,
    orderChange: 0,
    orderNotes: ''
  }
  const morDataInfo: MoreInfoAddOrder = {
    idUsers: 1,
    idCustomers: idCustomers,
    orderTimeStamp: getDateToday()
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-lg  px-6 py-2 text-xl font-medium text-[#111] shadow-lg">
          <p>{`$${totalPrice}`}</p>
        </DialogTrigger>
        <DialogContent className="w-[90rem] h-[26rem] max-w-[65%] max-h-[90%] m-10 flex justify-center align-middle content-center">
          <PayCard ordendata={dataTest} moreDataByOrder={morDataInfo} nameCustomer={customerName} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
