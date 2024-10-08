import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PayComponent } from '../components/PayComponent'

export const PayScreen: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-bold mb-1 font-inter text-[1.5rem] ml-1" id="development-heading">
            INFORMACIÓN DEL PACIENTE Y EXÁMENES REGISTRADOS
          </h1>
        </div>
        <Button onClick={() => navigate(-1)} className="font-inter" variant={'outline'}>
          <ArrowLeft className="mr-1" />
          Regresar
        </Button>
      </div>

      <PayComponent />
    </div>
  )
}
