import React from 'react'
import { Login } from '../Login/Login'

export const HomeContainer: React.FC = () => {
  return (
    <div>
      <div className="flex flex-1 justify-center items-center content-center flex-col m-10">
        <Login />
      </div>
    </div>
  )
}
