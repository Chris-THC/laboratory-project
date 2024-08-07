import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { PayCard } from './PayCard'

interface CreateOrdenProps {
  totalPrice: number
}

export const CreateOrden: React.FC<CreateOrdenProps> = ({ totalPrice }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="rounded-lg  px-6 py-2 text-xl font-medium text-[#111] shadow-lg">
          <p>{`$${totalPrice}`}</p>
        </DialogTrigger>
        <DialogContent className="w-[90rem] h-[33rem] max-w-[65%] max-h-[100%] m-10 flex justify-center align-middle content-center">
          <PayCard />
        </DialogContent>
      </Dialog>
    </div>
  )
}
