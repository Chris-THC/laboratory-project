import { LogOut, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const UserDropMenu: React.FC = () => {
  const navigateTo = useNavigate()
  const { setIsCreate } = useUserIdSelected()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://avatars.githubusercontent.com/u/otraseas" /> */}
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
{/*
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
            <DropdownMenuShortcut>{'(Admin)'}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
*/}
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setIsCreate(true)
              navigateTo('/users')
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Gestionar Usuarios</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem('authToken');
            navigateTo('/')
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
