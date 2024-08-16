import { LogOut, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToken } from '@renderer/context/JWTContext/JWTContext';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '@renderer/context/JWTContext/JWTContext';
import { decodeToken } from 'react-jwt'

export const UserDropMenu: React.FC = () => {
  const navigateTo = useNavigate()
  const { setIsCreate } = useUserIdSelected()
  const { setToken } = useToken();
  const token = getToken();
  const decodedToken: { [key: string]: any } = decodeToken(token)!;
  const userRole = decodedToken.role as string;
  const userName = decodedToken.userName as string;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {/* <AvatarImage src="https://avatars.githubusercontent.com/u/otraseas" /> */}
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2">
        <DropdownMenuLabel>{userName}</DropdownMenuLabel>
       {userRole === 'Admin'&&(
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
        )}
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setToken('');
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
