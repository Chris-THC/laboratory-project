import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
export const PatientCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del paciente</CardTitle>
        <Separator className="my-5" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-1">
          <div className="flex flex-col space-y-1.5">
            <Label>Name</Label>
            <p>Jose Hernandez Herrera</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Edad</Label>
            <p>50</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Número de télefono</Label>
            <p>2721907289</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Direccion</Label>
            <p>Esta es una direccion que se puede editar</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Nombre del doctor</Label>
            <p>Axel Perez Perez</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
