import React from 'react'

export const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center font-inter ">
          No se pudo conectar con el servidor
        </h2>
        <p className="text-gray-700 text-center font-inter">
          Por favor, inténtelo de nuevo más tarde.
        </p>
      </div>
    </div>
  )
}
