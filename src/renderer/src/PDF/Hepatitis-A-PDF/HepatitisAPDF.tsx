import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import { FilePDF } from './FilePDF'

export const HepatitisAPDF: React.FC = () => {
  const RenderPDF: React.FC = () => {
    return (
      <PDFViewer height={700} width={'100%'}>
        <FilePDF />
      </PDFViewer>
    )
  }

  return (
    <div>
      {/* <h1>HepatitisAPDF</h1> */}
      <RenderPDF />
    </div>
  )
}
