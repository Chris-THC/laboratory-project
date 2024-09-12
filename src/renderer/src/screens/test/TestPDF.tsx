import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import { NewFilePDF } from '../PDF/FilePDF/NewFile'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'

const pdfDate: ContentsResultsInterface[] = [
  {
    contResultId: 85,
    resultId: 36,
    contentId: 4094,
    resultValue: '1',
    contentsDTO: {
      contentId: 4094,
      name: 'Calcio',
      units: 'mmol/L',
      referencesDTO: [
        {
          referencesId: 1084,
          contentId: 4094,
          vmax: '1.11',
          vmin: '0.91',
          vrefText: null
        }
      ]
    }
  },
  {
    contResultId: 86,
    resultId: 37,
    contentId: 4095,
    resultValue: '2',
    contentsDTO: {
      contentId: 4095,
      name: 'Magnesio',
      units: 'mg/dL',
      referencesDTO: [
        {
          referencesId: 1085,
          contentId: 4095,
          vmax: '2.50',
          vmin: '1.70',
          vrefText: null
        }
      ]
    }
  },
  {
    contResultId: 87,
    resultId: 38,
    contentId: 4096,
    resultValue: '3',
    contentsDTO: {
      contentId: 4096,
      name: 'Sodio',
      units: 'mmol/L',
      referencesDTO: [
        {
          referencesId: 1086,
          contentId: 4096,
          vmax: '145',
          vmin: '135',
          vrefText: null
        }
      ]
    }
  },
  {
    contResultId: 88,
    resultId: 39,
    contentId: 4097,
    resultValue: '4',
    contentsDTO: {
      contentId: 4097,
      name: 'Potasio',
      units: 'mmol/L',
      referencesDTO: [
        {
          referencesId: 1087,
          contentId: 4097,
          vmax: '5.0',
          vmin: '3.5',
          vrefText: null
        }
      ]
    }
  },
  {
    contResultId: 89,
    resultId: 40,
    contentId: 4098,
    resultValue: '5',
    contentsDTO: {
      contentId: 4098,
      name: 'Cloruro',
      units: 'mmol/L',
      referencesDTO: [
        {
          referencesId: 1088,
          contentId: 4098,
          vmax: '107',
          vmin: '97',
          vrefText: null
        }
      ]
    }
  }
]

const clientObjectInfo: ClientsInterface = {
  idCustomer: 123,
  name: 'Juan Pérez',
  age: 45,
  phoneNumber: '123-456-7890',
  address: 'Calle Falsa 123, Ciudad de México',
  dateOfBirth: '1979-05-12',
  doctorName: 'Dra. Ana Gómez'
}

export const TestPDF: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center align-middle m-5">
        <PDFViewer height={1000} width={'90%'}>
          <NewFilePDF
            testResults={pdfDate}
            customerInfo={clientObjectInfo}
            currentDate={'8/09/2024'}
          />
        </PDFViewer>
      </div>
    </div>
  )
}
