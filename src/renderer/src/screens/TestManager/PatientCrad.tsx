import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'

export const PatientCard: React.FC = () => {
  // Just call the customer selected into the table
  const { clientObjectInfo } = useClientIdSelected()
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información del paciente</CardTitle>
        <Separator className="my-5" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-1">
          <div className="flex flex-col space-y-1.5">
            <Label>Nombre</Label>
            <p>{clientObjectInfo?.name}</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Edad</Label>
            <p>{`${clientObjectInfo?.age} años`}</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Número de télefono</Label>
            <p>{clientObjectInfo?.phoneNumber}</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Direccion</Label>
            <p>{clientObjectInfo?.address}</p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label>Doctor</Label>
            <p>{clientObjectInfo?.doctorName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
