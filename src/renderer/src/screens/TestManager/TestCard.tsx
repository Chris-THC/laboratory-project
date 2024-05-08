import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDeleteCustomerTest } from '@renderer/hooks/res/clientRes/UseClientTest'
import { Atom, ClockIcon, Plus } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface CardTestProps {
  idCusrtomerTest: number
  nameCostumer: string | undefined
  nameTest: string
  status: string
}

export const TestCard: React.FC<CardTestProps> = ({
  nameCostumer,
  nameTest,
  status,
  idCusrtomerTest
}) => {
  const navigateTo = useNavigate()
  const deteleCustomerTest = useDeleteCustomerTest()

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Reportado':
        return 'bg-[#ff0000]'
      case 'Impreso':
        return 'bg-[#ffe52b]'
      case 'Entregado':
        return 'bg-[#4dd12d]'
      default:
        return 'bg-[#ff0000]'
    }
  }

  const DeleteModalCustomerTest: React.FC = () => {
    return (
      <AlertDialog>
        <AlertDialogTrigger>Eliminar</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Deseas continuar?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la tarea de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deteleCustomerTest.mutate(idCusrtomerTest)
              }}
              className="bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <div className="text-gray-900 my-2 max-h-70">
      <div className="flex justify-center">
        <div className="w-80 h-44">
          <Card className="border-dashed border-2 border-gray-400 p-1 flex flex-col">
            <div className="flex items-center space-x-4">
              <Atom className="text-[#15658d] h-10 w-10" />
              <div>
                <div className="font-semibold">
                  {nameTest.length > 20 ? nameTest.substring(0, 20) + '...' : nameTest}
                </div>
              </div>
            </div>
            <div className="text-sm overflow-ellipsis text-center my-1">
              <p>{nameCostumer}</p>
            </div>
            <div className="flex items-center justify-center my-1">
              <div className={`px-2 py-1 rounded flex items-center ${getStatusColor(status)}`}>
                <ClockIcon color="#fff" className="h-4 w-4 mr-1" />
                <span className="text-sm font-bold text-white">{status}</span>
              </div>
            </div>

            <div className="flex items-center justify-center py-1">
              <Button
                onClick={() => {
                  navigateTo('/tests/editor')
                }}
                className="mr-3 max-w-28 text-[#15658d]"
                variant="outline"
              >
                Editar
              </Button>
              <Button className="mr-3 max-w-28 text-[#c80800]" variant="outline">
                <DeleteModalCustomerTest />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const TestNewCard: React.FC = () => {
  const navigateTo = useNavigate()

  return (
    <div className="text-gray-900 my-3 max-h-70">
      <div className="flex justify-center">
        <div className="w-80 h-44">
          <Card className="border-dashed border-2 border-gray-400 flex flex-col justify-center h-40">
            <Button
              onClick={() => {
                navigateTo('/tests/add')
              }}
              variant={'ghost'}
              className="text-[#15658d]"
            >
              <Plus color="#15658d" className="mx-1" />
              Agregar
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
