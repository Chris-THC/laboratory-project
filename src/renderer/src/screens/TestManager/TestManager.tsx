import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useAllTestByIdCustomer } from '@renderer/hooks/res/clientRes/UseClientTest'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
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
          <h1 className="font-bold mb-1 font-inter text-lg ml-1" id="development-heading">
            EXÁMENES REGISTRADOS
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
      {/* <Separator className="my-5" /> */}
      <Card className="mt-5">
        <CardHeader>
          <CardTitle className="font-inter">Lista de exámenes registrados </CardTitle>
          <Separator className="my-5" />
        </CardHeader>
        <CardContent>
          <section className="grid grid-cols-4 gap-5">
            {data?.map((testInfo, index) => (
              <TestCard
                key={index}
                nameCostumer={clientObjectInfo?.name}
                nameTest={testInfo.testDTO.testName}
                status={testInfo.status}
              />
            ))}
            <TestNewCard />
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
