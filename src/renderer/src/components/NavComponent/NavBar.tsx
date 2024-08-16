import { Button } from '@/components/ui/button'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { DollarSign } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoImage from '../../assets/img/imageLogo1.png'
import { UserDropMenu } from './UserDropMenu'
import { getToken } from '@renderer/context/JWTContext/JWTContext';

export const NavBar: React.FC = () => {
  const navigateTo = useNavigate()
  const { setClientObjectInfo, setIsClientCreate } = useClientIdSelected()
  const token = getToken();
  
  return (
    <div className="bg-[#005da5] h-16 flex justify-between px-5">
      <div className="flex flex-row justify-between align-middle">
        <div className="flex flex-col justify-center align-middle">
          <img src={LogoImage} alt="logo" className="w-14 h-12 m-1" />
        </div>
        <div className="flex flex-col justify-center align-middle  ml-8">
          <h1
            onClick={() => {
              navigateTo('/')
            }}
            className="text-white font-bold text-2xl font-inter cursor-pointer"
          >
            LABORATORIO “ELISA”
          </h1>
        </div>
      </div>

      {token?(
      <div className="flex flex-row justify-center align-middle mr-1">
        
        <div className="flex flex-col justify-center align-middle">
          <Button
            onClick={() => {
              setIsClientCreate(true)
              setClientObjectInfo(null)
              navigateTo('/customer/form')
            }}
            variant={'ghost'}
            className="mx-2 text-white font-inter"
          >
            Inicio
          </Button>
        </div>
      <div className="flex flex-col justify-center align-middle">
         <Button
            onClick={() => {
              navigateTo('/customer')
            }}
            variant={'ghost'}
            className="mx-2 text-white font-inter"
          >
            Clientes
          </Button>
        </div>

        <div className="flex flex-col justify-center align-middle">
          <Button
            onClick={() => {
            navigateTo('/caja')
            }}
            variant={'ghost'}
            className="mx-2 text-white font-inter"
          >
            <DollarSign className="mr-2 text-sm" />
            Caja
          </Button>
        </div>
        <div className="flex flex-col justify-center align-middle mx-5">
          <UserDropMenu />
        </div>
      </div>
       ):(
        <div className="flex flex-col justify-center align-middle">
        <Button
          onClick={() => {
            setIsClientCreate(false)
            setClientObjectInfo(null)
            navigateTo('/')
          }}
          variant={'ghost'}
          className="mx-2 text-white font-inter"
        >
          Iniciar Sesión
        </Button>
      </div> 
       )}

    </div>
  )
}
