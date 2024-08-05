import React from 'react'
import { Login } from '../Login/Login'

export const HomeContainer: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center m-0 p-0">
        <h2 className="font-inter text-base font-semibold">Página principal</h2>
      </div>
      <div className="flex flex-1 justify-center items-center content-center flex-col">
        <Login />
      </div>
    </div>
  )
}
