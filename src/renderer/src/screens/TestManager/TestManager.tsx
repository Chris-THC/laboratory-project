import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useAllTestByIdCustomer } from '@renderer/hooks/res/clientRes/UseClientTest'
import { ArrowLeft, FileInput } from 'lucide-react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PatientCard } from './PatientCrad'
import { TestCard, TestNewCard } from './TestCard'

export const TestManagerHome: React.FC = () => {
  const navigate = useNavigate()
  const { clientObjectInfo } = useClientIdSelected()
  const { data } = useAllTestByIdCustomer(clientObjectInfo!.idCustomer)

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
      <section>
        <PatientCard />
      </section>
      <Card className="mt-5">
        <CardHeader>
          <div className="flex flex-row justify-between  align-middle">
            <CardTitle className="py-2">Exámenes Registrados</CardTitle>
            <Button
              onClick={() => console.log('Al PDF')}
              className="font-inter px-1 bg-[#0074cc]"
              variant={'default'}
            >
              <FileInput className="mr-2" />
              Generar PDF
            </Button>
          </div>
          <Separator className="my-5" />
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-4 gap-5">
            {data?.map((testInfo, index) => (
              <TestCard
                key={index}
                idCustomer={testInfo.idCustomer}
                idCusrtomerTest={testInfo.idCustomersTests}
                idTest={testInfo.idTest}
                nameCostumer={clientObjectInfo?.name}
                nameTest={testInfo.testDTO.testName}
                status={testInfo.status}
              />
            ))}
            <TestNewCard />
          </section>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}
