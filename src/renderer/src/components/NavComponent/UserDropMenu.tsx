import { LogOut, User, UserCog, UserPlus, UserX } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React from 'react'

export const UserDropMenu: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F0a%2F42%2F4c%2F0a424cdfc9f93b5685ecd711e6591446.jpg&f=1&nofb=1&ipt=041a80d49f56cf00307a4b00dc96d0af1aa4e180c7cfb0cd771ae126bbff07ac&ipo=images" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>

        {/* <Button variant="outline">Open</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
            <DropdownMenuShortcut>{'(Admin)'}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Agregar Usuario</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Agregar</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserX className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
