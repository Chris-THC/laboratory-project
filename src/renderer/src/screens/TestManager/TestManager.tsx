import { Separator } from '@/components/ui/separator'
import React from 'react'
import { PatientCard } from './PatientCrad'
import { TestCard, TestNewCard } from './TestCard'

export const TestManagerHome: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
      <h1 className="font-bold mb-4 font-inter text-lg ml-1" id="development-heading">
        EXÁMENES REGISTRADOS
      </h1>

      <section>
        <PatientCard />
      </section>
      <Separator className="my-5" />
      <section className="grid grid-cols-4 gap-5">
        <TestCard nameCostumer="Jose Hernandez Hernandez" nameTest="HEPATITIS B" status="Reportado" />
        <TestCard nameCostumer="Jose Hernandez Hernandez" nameTest="FOSFORO" status="Impreso" />
        <TestCard nameCostumer="Jose Hernandez Hernandez" nameTest="PERFIL SEROLOGICO DE ANTICUERPOS IgM e IgG SARS CoV-2" status="Entregado" />
        <TestNewCard />
      </section>
    </div>
  )
}
