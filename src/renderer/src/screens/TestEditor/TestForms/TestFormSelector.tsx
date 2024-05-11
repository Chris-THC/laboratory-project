import React from 'react'
import { useTestContestByIdTest } from '@renderer/hooks/res/testContents/useTestContents'
import { LoadingSpinner } from '@renderer/components/LoadingSpinner/LoadingSpinner'
import { ErrorPage } from '@renderer/components/PageNotFound/ErrorPage'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'

export const TestFormsEditor: React.FC = () => {
  const { idTestByTestContent } = useTestIdByTestContens()
  const { isLoading, data } = useTestContestByIdTest(idTestByTestContent)

  console.log(idTestByTestContent);
  
  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {!data ? (
        <ErrorPage />
      ) : (
        <div>
          {data.map((testContent, index) => (
            <div key={index}>{testContent.contentsDTO?.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}
