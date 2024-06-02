import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileDown, Printer } from 'lucide-react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import { FilePDF } from './FilePDF/FilePDF'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'

export const HomePDF: React.FC = () => {
  const { clientObjectInfo } = useClientIdSelected()

  const navigate = useNavigate()

  // This funtion is Just to open a box and print, I think so
  const handlePrint = (): void => {
    window.print()
  }

  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-semibold mb-1 font-inter text-[1.4rem] ml-1" id="development-heading">
            VISTA PREVIA DEL PDF Y OPCIONE DE DESCARGA
          </h1>
        </div>

        <div className="flex flex-row justify-between">
          <Button onClick={() => navigate(-1)} className="font-inter" variant={'outline'}>
            <ArrowLeft className="mr-1" />
            Regresar
          </Button>

          <div className="flex flex-row space-x-3">
            <PDFDownloadLink
              document={<FilePDF customerInfo={clientObjectInfo} />}
              fileName="Test.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button variant={'outline'}>
                    <FileDown className="mr-1" />
                    Cargando...
                  </Button>
                ) : (
                  <Button variant={'outline'}>
                    <FileDown className="mr-1" />
                    Descargar PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
            <div>
              <Button variant={'outline'} onClick={handlePrint}>
                <Printer className="mr-1" />
                Imprimir
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-2" />

      <div>
        <div className="flex justify-center align-middle m-5">
          <PDFViewer height={600} width={'90%'}>
            <FilePDF customerInfo={clientObjectInfo} />
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}
