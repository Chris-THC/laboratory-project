import { Button } from '@/components/ui/button'
import { FilePlus } from 'lucide-react'
import React from 'react'
import { TestCard } from './TestCard'
import { Separator } from '@/components/ui/separator'

export const TestManagerHome: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 p-8">
      <h1 className="text-lg font-semibold mb-4" id="development-heading">
        Gestor de examenes
      </h1>

      <div>
        <Button variant={'outline'} className="bg-gray-200 text-[#15658d]">
          <FilePlus color="#15658d" className="mx-1" />
          Agregar
        </Button>
      </div>
      <Separator className="my-5" />
      <div className="flex flex-row">
        <TestCard />
        <TestCard />
      </div>
    </div>
  )
}
