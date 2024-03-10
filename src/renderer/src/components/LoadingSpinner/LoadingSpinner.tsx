import React from 'react'
import loadingLoader from './../../assets/img/loading-loader.svg'

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center m-52 flex-col">
      <img className="w-20 h-20 animate-spin" src={loadingLoader} alt="Loading icon" />

      <p className="ml-2 text-gray-700 font-inter text-xl my-2">Conectándose al servidor...</p>
    </div>
  )
}
