import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import React from 'react'

export const CradPlay: React.FC = () => {
  return (
    <Card className="w-full h-[23rem] align-middle justify-center my-3">
      <CardHeader className="bg-[#004185] text-primary-foreground rounded-tl-[10px] rounded-tr-[10px]">
        <CardTitle className="font-inter text-xl font-bold">Transacción</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-6 px-8 py-3">
        <div className="space-y-1">
          <Label htmlFor="customer-name">Nombre del cliente</Label>
          <Input id="customer-name" placeholder="Ingrese el nombre" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="total-price">Precio Total</Label>
          <Input id="total-price" type="text" placeholder="0.00" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="money-received">Dinero recibido</Label>
          <Input id="money-received" type="text" placeholder="0.00" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="deposit">Depósito</Label>
          <Input id="deposit" type="text" placeholder="0.00" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="change">Cambio</Label>
          <Input id="change" type="text" placeholder="0.00" />
        </div>
        <div className="col-span-2 space-y-1">
          <Label htmlFor="notes">Notas</Label>
          <Textarea id="notes" placeholder="Ingrese notas adicionales" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 px-8">
        <DialogClose asChild>
          <Button type="button" variant="destructive">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={()=>{
            console.log("guardado")
          }} variant="outline" type="submit">
            Guardar
          </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  )
}
