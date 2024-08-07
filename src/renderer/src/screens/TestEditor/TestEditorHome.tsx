import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { TestFormsEditor } from './TestForms/TestFormSelector'
import { TestForm } from './TestForms/form/TestForm'

export const TestEditorHome: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-bold mb-1 font-inter text-lg ml-1" id="development-heading">
            EDITAR EXÁMENES
          </h1>
        </div>
        <Button onClick={() => navigate(-1)} className="font-inter" variant={'outline'}>
          <ArrowLeft className="mr-1" />
          Regresar
        </Button>
      </div>

      <div>
        <TestFormsEditor />
      </div>

      <div>
        <TestForm />
      </div>

      <Toaster />
    </div>
  )
}
