import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'
import { useGetResultsByIdTestAndIdCustomer } from '@renderer/hooks/res/resultsRes/useResults'
import { useTestContestByIdTest } from '@renderer/hooks/res/testContents/useTestContents'
import React from 'react'
import { AvailableParametersByTest } from './AvailableParametersByTest'

export const TestFormsEditor: React.FC = () => {
  const { idTestByTestContent, testNameSelected, idCustomerByTestContent } =
    useTestIdByTestContens()
  const { isLoading, data } = useTestContestByIdTest(idTestByTestContent)
  const { data: dataResults } = useGetResultsByIdTestAndIdCustomer(
    idTestByTestContent,
    idCustomerByTestContent
  )
  
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {!data ? (
        <ErrorPage />
      ) : (
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-inter font-medium text-[1.05rem]">
                {`SELECCIONA LOS PARÁMETROS QUE NECESITES PARA ESTE EXAMEN [${testNameSelected}]`}
              </AccordionTrigger>
              <AccordionContent>
                <AvailableParametersByTest
                  testContents={data}
                  resultsByIdTestAndIdCustomer={dataResults}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}
