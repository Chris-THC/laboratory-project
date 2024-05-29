import { Button } from '@/components/ui/button'
import { useContentResultWasSelect } from '@renderer/context/contentResults/contentsResultContext'
import { useListContentsResultsByIdResults } from '@renderer/hooks/res/contentsResultsRes/useContentsResultsRes'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TestFormsEditor } from './TestForms/TestFormSelector'
import { TestForm } from './TestForms/form/TestForm'
import { Toaster } from 'react-hot-toast'

export const TestEditorHome: React.FC = () => {
  // const { idTestByTestContent, idCustomerByTestContent } = useTestIdByTestContens()
  const { resultsId } = useContentResultWasSelect()

  const { data: contentsresults } = useListContentsResultsByIdResults(resultsId)

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
        {/* <HepatitisA /> */}
      </div>

      <div>
        <TestForm contentsresults={contentsresults} />
      </div>

      <Toaster />
    </div>
  )
}
