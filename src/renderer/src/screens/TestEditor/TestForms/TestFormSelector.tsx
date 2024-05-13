import React from 'react'
import { useTestContestByIdTest } from '@renderer/hooks/res/testContents/useTestContents'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { AvailableParametersByTest } from './AvailableParametersByTest'

export const TestFormsEditor: React.FC = () => {
  const { idTestByTestContent } = useTestIdByTestContens()
  const { isLoading, data } = useTestContestByIdTest(idTestByTestContent)

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
              <AccordionTrigger className="font-inter font-semibold text-[1.05rem]">
                SELECCIONA LOS PARÁMETROS QUE NECESITES PARA ESTE EXAMEN
              </AccordionTrigger>
              <AccordionContent>
                {/* {data.map((testContent, index) => (
                  <div key={index}>{testContent.contentsDTO?.name}</div>
                ))} */}

                <AvailableParametersByTest testContents={data} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  )
}
