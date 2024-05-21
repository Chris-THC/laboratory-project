import React from 'react'
import { useTestContestByIdTest } from '@renderer/hooks/res/testContents/useTestContents'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'
import {Accordion, AccordionContent, AccordionItem,AccordionTrigger} from '@/components/ui/accordion'
import { AvailableParametersByTest } from './AvailableParametersByTest'
import { TestForm } from './form/TestForm'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useGetResultsByIdTestAndIdCustomer } from '@renderer/hooks/res/resultsRes/useResults'

export const TestFormsEditor: React.FC = () => {
  const { idTestByTestContent, testNameSelected } = useTestIdByTestContens()
  const { clientObjectInfo } = useClientIdSelected()
  const { isLoading, data } = useTestContestByIdTest(idTestByTestContent)
  const { data: dataResults } = useGetResultsByIdTestAndIdCustomer(idTestByTestContent, clientObjectInfo?.idCustomer)

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
                <AvailableParametersByTest testContents={data} resultsByIdTestAndIdCustomer={dataResults} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div>
            <TestForm />
          </div>
          
        </div>
      )}
    </div>
  )
}
