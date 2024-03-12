import React from 'react';
import image from 'image.jpg'

const ScreenPresentation: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat">
        <img src={image} alt="" />
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800">Bienvenido a la aplicación Laboratorio Elisa</h1>
        <p className="mt-4 text-gray-600 text-center"> Aquí podras realizar todas las operaciones sobre tus clientes y empleados.</p>
      </div>
    </div>
  );
};

export default ScreenPresentation;