import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { AlignLeft, UserCog, UserX } from 'lucide-react'
import React from 'react'
import { CradPlay } from './CradPay'

export const ShowMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-gray-800" variant="ghost">
          <AlignLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100%]">
        <DropdownMenuLabel>Selecciona una opción</DropdownMenuLabel>
        <Dialog>
          <DialogTrigger className="w-full">
            <DropdownMenuRadioItem
              onSelect={(e) => e.preventDefault()}
              value="Editar"
              className="text-[#15658d] font-bold px-1 w-full"
            >
              <UserCog color="#15658d" className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuRadioItem>
          </DialogTrigger>
          <DialogContent className="w-[100rem]">
            <CradPlay />
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
              <UserX color="#c80800" className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuRadioItem>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
