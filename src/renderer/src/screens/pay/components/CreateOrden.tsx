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
        <DialogContent>
          <PayCard
            ordenData={dataTest}
            moreDataByOrder={morDataInfo}
            nameCustomer={customerName}
            txtButon="Agregar"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
