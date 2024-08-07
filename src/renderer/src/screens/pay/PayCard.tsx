import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

export const PayCard = () => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Registro de Compra</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="grid gap-4 mt-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Cliente</Label>
            <Input id="name" placeholder="Ingrese el nombre" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total">Total de la Compra</Label>
            <Input id="total" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="received">Dinero Recibido</Label>
            <Input id="received" type="number" placeholder="0.00" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="deposit">Depósito</Label>
            <Input id="deposit" type="number" placeholder="0.00" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="change">Cambio</Label>
            <Input id="change" type="number" placeholder="0.00" readOnly />
          </div>
        </div>
        <div className="space-y-2">
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
          <Button
            onClick={() => {
              console.log('guardado')
            }}
            variant="outline"
            type="submit"
          >
            Guardar
          </Button>
        </DialogClose>
      </CardFooter>
    </Card>
  )
}
