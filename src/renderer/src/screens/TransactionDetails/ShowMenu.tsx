import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useDeleteOrderById } from '@renderer/hooks/res/CashRegister/UserCashRegister'
import { CashRegisterI } from '@renderer/interfaces/CashRegisterInterface/CashRegisterInterface'
import { Row } from '@tanstack/react-table'
import { AlignLeft, FileSliders, Trash2 } from 'lucide-react'
import React from 'react'
import { DelateTransaction } from './DelateTransaction'
import { PayCard } from '../pay/components/PayCard'
import { AddOrderTestIn, MoreInfoAddOrder } from '@renderer/interfaces/orders/OrderTest'
import { getDateToday } from '@renderer/utils/dates/GetDate'

interface ShowMenuProps {
  row: Row<CashRegisterI>
}

export const ShowMenu: React.FC<ShowMenuProps> = ({ row }) => {
  const deleteOrder = useDeleteOrderById()

  // Funciones para eliminar la orden
  const handlerDelate = (): void => {
    deleteOrder.mutate({ idOrder: row.original.idOrders })
  }

  const dataTest: AddOrderTestIn = {
    orderTotal: row.original.orderReminding,
    orderDeposit: 0,
    orderAmountPaid: 0,
    orderChange: 0,
    orderNotes: ''
  }
  const moreData: MoreInfoAddOrder = {
    idUsers: 1,
    idCustomers: row.original.idCustomers,
    orderTimeStamp: getDateToday()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-gray-800" variant="ghost">
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Selecciona una opción</DropdownMenuLabel>
        <Dialog>
          <DialogTrigger className="w-full">
            <DropdownMenuRadioItem
              onSelect={(e) => e.preventDefault()}
              value="Editar"
              className="text-[#15658d] font-bold px-1 w-full"
            >
              <FileSliders color="#15658d" className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuRadioItem>
          </DialogTrigger>
          <DialogContent className="w-[90rem] h-[30rem] max-w-[70%] max-h-[90%] m-5">
            <PayCard
              ordenData={dataTest}
              moreDataByOrder={moreData}
              nameCustomer={row.original.user.name}
              txtButon="Editar"
            />
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <Dialog>
          <DialogTrigger className="w-full">
            <DropdownMenuRadioItem
              onSelect={(e) => e.preventDefault()}
              value="Eliminar"
              className="text-[#c80800] font-bold px-1"
            >
              <Trash2 color="#c80800" className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuRadioItem>
          </DialogTrigger>
          <DelateTransaction handlerDelate={handlerDelate} />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
