import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar'
import React from 'react'
import { UserDropMenu } from './UserDropMenu'

import { Button } from '@/components/ui/button'
import LogoImage from '../../assets/img/logo.png'

import { UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const NavBar: React.FC = () => {
  const navigateTo = useNavigate()

  return (
    <div className="bg-slate-900 h-16 flex justify-between px-5">
      <div className="flex flex-row justify-between align-middle">
        <div className="flex flex-col justify-center align-middle">
          <img src={LogoImage} alt="logo" className="w-12 h-12 m-1" />
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
      <div className="flex flex-row justify-center align-middle mr-1">
        <div className="flex flex-col justify-center align-middle">
          <ul className="flex space-x-5 justify-center items-center">
            <li>
              <Menubar className="bg-inherit border-none">
                <MenubarMenu>
                  <MenubarTrigger className="text-white font-semibold text-sm bg-transparent border-none font-inter cursor-pointer">
                    Clentes
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="font-inter cursor-pointer	">Nuevo Cliente</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem className="font-inter cursor-pointer	">
                      Lista de Cliente
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </li>
            <li>
              <Menubar className="bg-inherit border-none">
                <MenubarMenu>
                  <MenubarTrigger className="text-white font-semibold text-sm bg-transparent border-none font-inter cursor-pointer">
                    Más Opciones
                  </MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem className="font-inter cursor-pointer	">Caja</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center align-middle">
          <Button variant={'ghost'} className="mx-2 text-white font-inter">
            <UserPlus className="mr-2 text-sm" />
            Cliente
          </Button>
        </div>

        <div className="flex flex-col justify-center align-middle mx-5">
          <UserDropMenu />
        </div>
      </div>
    </div>
  )
}
