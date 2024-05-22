import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'

interface PropsTestForm {
  contentsresults: ContentsResultsInterface[] | null | undefined
}

export const TestForm: React.FC<PropsTestForm> = ({ contentsresults }) => {


  return (
    <div>
      <h1>Test Form</h1>
      <p>{
        contentsresults?.map((contentResults,index)=>{
          return <div key={index}>
            <h1>{`Nombre: ${contentResults.contentsDTO?.name}`}</h1>
            <h1>{`Valor: ${contentResults.resultValue}`}</h1>
          </div>
        })
        }</p>
    </div>
  )
}
