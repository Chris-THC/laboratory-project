import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface DeleteModalProps {
  handlerDelate: () => void
}

export const DelateTransaction: React.FC<DeleteModalProps> = ({ handlerDelate }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>¡Atención!</DialogTitle>
        <Separator />
        <h3 className="font-inter font-normal text-sm">
          Esta acción es irreversible. La información seleccionada será eliminada permanentemente.
        </h3>
      </DialogHeader>
      <div className="mt-4 flex justify-end space-x-4">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="destructive" className="bg-[#e32940]" onClick={() => handlerDelate()}>
            Eliminar
          </Button>
        </DialogClose>
      </div>
    </DialogContent>
  )
}
