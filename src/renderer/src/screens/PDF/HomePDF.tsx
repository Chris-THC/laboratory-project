import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { ArrowLeft, FileDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FilePDF } from './FilePDF/FilePDF'
import { useTestArrayList } from '@renderer/context/testByUser/testArrayByUser'

export const HomePDF: React.FC = () => {
  const { contentsArrayTestToPDF } = useTestArrayList()
  const { clientObjectInfo } = useClientIdSelected()
  const [date, setDate] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const formatDate = (): void => {
      const date = new Date()
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth() devuelve un valor de 0 a 11
      const year = date.getFullYear().toString()

      setDate(`${day}/${month}/${year}`)
    }

    formatDate()
  }, [])

  const nameFile: string = `${clientObjectInfo?.name}.pdf`

  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-semibold mb-1 font-inter text-[1.4rem] ml-1" id="development-heading">
            VISTA PREVIA DEL PDF Y OPCIONE DE DESCARGA
          </h1>
        </div>

        <div className="flex flex-row justify-between">
          <Button onClick={() => navigate("/tests")} className="font-inter" variant={'outline'}>
            <ArrowLeft className="mr-1" />
            Regresar
          </Button>

          <div className="flex flex-row space-x-3">
            <PDFDownloadLink
              document={
                <FilePDF
                  testResults={contentsArrayTestToPDF}
                  customerInfo={clientObjectInfo}
                  currentDate={date}
                />
              }
              fileName={nameFile}
            >
              {({ loading }) =>
                loading ? (
                  <Button className="bg-[#4861b8]">
                    <FileDown className="mr-1" />
                    Cargando...
                  </Button>
                ) : (
                  <Button className="bg-[#4861b8]">
                    <FileDown className="mr-1" />
                    Descargar PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
      <Separator className="my-2" />

      <div>
        <div className="flex justify-center align-middle m-5">
          <PDFViewer height={600} width={'90%'}>
            <FilePDF
              testResults={contentsArrayTestToPDF}
              customerInfo={clientObjectInfo}
              currentDate={date}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  )
}
