import React from 'react'
import imageMain from '../../assets/img/image.jpg'

export const ScreenPresentation: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <img src={imageMain} alt="img" className="h-[400px] w-[500px]" />
      <div className="bg-white bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800">
          Bienvenido a la aplicación Laboratorio Elisa
        </h1>
        <p className="mt-4 text-gray-600 text-center">
          Aquí podras realizar todas las operaciones sobre tus clientes y empleados.
        </p>
      </div>
    </div>
  )
}
