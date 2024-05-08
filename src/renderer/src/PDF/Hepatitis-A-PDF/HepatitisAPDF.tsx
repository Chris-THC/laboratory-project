import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { FilePDF } from './FilePDF'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const HepatitisAPDF: React.FC = () => {
  const navigate = useNavigate()

  const RenderPDF: React.FC = () => {
    return (
      <PDFViewer height={600} width={'100%'}>
        <FilePDF />
      </PDFViewer>
    )
  }

  return (
    <div className=" text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-bold mb-1 font-inter text-lg " id="development-heading">
            Visualizador de PDF
          </h1>
        </div>
        <Button onClick={() => navigate(-1)} className="font-inter" variant={'outline'}>
          <ArrowLeft className="mr-1" />
          Regresar
        </Button>
      </div>
      <RenderPDF />
    </div>
  )
}
