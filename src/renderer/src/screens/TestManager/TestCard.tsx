import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Atom, ClockIcon } from 'lucide-react'
import React from 'react'

export const TestCard: React.FC = () => {
  return (
    <div className="text-gray-900 m-2">
      <div className="flex justify-between space-x-8">
        <Card className="border-dashed border-2 border-gray-400   justify-center items-center p-4 w-72">
          <div className="flex items-center space-x-4 mb-5">
            <Atom className="text-[#15658d] h-12 w-12" />
            <div>
              <div className="font-semibold text-lg ">Glucosa</div>
              <div className="text-sm">
                <p>Jose Hernandez Herrera</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="px-1 bg-[#ff0f5d] rounded flex-col justify-center align-middle">
              <ClockIcon color="#fff" className="h-4 w-4 inline-block" />
              <span className="text-sm ml-1 font-bold text-[#fff]">Pendiente</span>
            </div>
          </div>

          <div className="flex items-center justify-center py-1 mt-2">
            <Button className="mr-3 max-w-28 text-[#15658d]" variant="outline">
              Editar
            </Button>
            <Button className="mr-3 max-w-28 text-[#c80800]" variant="outline">
              Eliminar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
