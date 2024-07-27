import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useTestArrayList } from '@renderer/context/testByUser/testArrayByUser'
import { useAllTestByIdCustomer } from '@renderer/hooks/res/clientRes/UseClientTest'
import { getContentsResultByIdResut } from '@renderer/hooks/res/contentsResultsRes/useContentsResultsRes'
import { getResultsByIdTestAndIdCustomer } from '@renderer/hooks/res/resultsRes/useResults'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import { ArrowLeft, FileInput } from 'lucide-react'
import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { PatientCard } from './PatientCrad'
import { TestCard, TestNewCard } from './TestCard'
import { PricesCard } from './PricesCard'

export const TestManagerHome: React.FC = () => {
  const navigate = useNavigate()
  const { clientObjectInfo } = useClientIdSelected()
  const { data } = useAllTestByIdCustomer(clientObjectInfo!.idCustomer)
  const { setTestArrayList, testArrayList, setContentsArrayTestToPDF } = useTestArrayList()

  useEffect(() => {
    setTestArrayList(data)
  }, [data])

  const getListContenteResults = async (
    idTest: number,
    idCustomer: number
  ): Promise<ContentsResultsInterface[] | null> => {
    const dataResults = await getResultsByIdTestAndIdCustomer(idTest, idCustomer)
    const listContentsResults = await getContentsResultByIdResut(dataResults![0].idResults!)
    return listContentsResults
    // setContentResultsArray(listContentsResults)
  }

  const handelgeneretePDF = async (): Promise<void> => {
    try {
      const arrayPromises =
        testArrayList?.map(async (info) => {
          return await getListContenteResults(info.idTest, info.idCustomer)
        }) || []

      // Espera a que todas las promesas se resuelvan
      const results = await Promise.all(arrayPromises)

      // Combina todos los resultados en un solo array y filtra los valores null
      const combinedArray = results
        .flat()
        .filter((item): item is ContentsResultsInterface => item !== null)

      setContentsArrayTestToPDF(combinedArray)
      navigate('/pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
      setContentsArrayTestToPDF(null)
    }
  }

  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <div className="mb-2">
        <div className="flex flex-row justify-center align-middle">
          <h1 className="font-bold mb-1 font-inter text-[1.5rem] ml-1" id="development-heading">
            INFORMACIÓN DEL PACIENTE Y EXÁMENES REGISTRADOS
          </h1>
        </div>
        <Button onClick={() => navigate('/customer')} className="font-inter" variant={'outline'}>
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
              onClick={handelgeneretePDF}
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

      <section className="my-5">
        <Card>
          <CardHeader>
            <CardTitle>Productos a pagar</CardTitle>
            <Separator className="my-5" />
          </CardHeader>
          <CardContent>
            <PricesCard />
          </CardContent>
        </Card>
      </section>
      <Toaster />
    </div>
  )
}
