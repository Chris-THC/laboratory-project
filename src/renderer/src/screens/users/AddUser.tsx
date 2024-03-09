import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useUserIdSelected } from '@renderer/context/userContext/UserContext'
import { useCreateNewUser, useUpdateUserById } from '@renderer/hooks/res/usersRes/UseUsersAPI'
import { UsersInterface } from '@renderer/interfaces/users/user'
import { changeRole } from '@renderer/context/userContext/EnumUser'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe de tener al menos 2 caracteres'
    })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s.,]+$/, {
      message: 'El nombre solo puede contener letras y espacios'
    }),
  age: z
    .string()
    .min(1, {
      message: 'La edad no debe de tener al menos 1 digito'
    })
    .max(2, { message: 'La edad no puede tener más de 3 dígitos' })
    .regex(/^[0-9]+$/, {
      message: 'Este campo solo puede contener números'
    }),

  phoneNumber: z
    .string()
    .min(10, {
      message: 'El número de teléfono debe de tener al menos 10 dígitos'
    })
    .max(10, { message: 'El número de teléfono no debe de tener más de 10 dígitos' })
    .regex(/^[0-9]+$/, {
      message: 'Este campo solo puede contener números'
    }),
  address: z.string().min(2, {
    message: 'La direccion debe de tener al menos 2 caracteres'
  }),
  password: z.string().min(2, {
    message: 'La contraseña debe de tener al menos 2 caracteres'
  }),
  role: z.string({
    required_error: 'El valor es requerido'
  })
})

export const AddUser: React.FC = () => {
  const navigateTo = useNavigate()
  const creteNewUser = useCreateNewUser()
  const { userObjectInfo, isCreate, setIsCreate, setUserObjectInfo } = useUserIdSelected()
  const updateUser = useUpdateUserById()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: !userObjectInfo
      ? {
          name: '',
          age: '',
          phoneNumber: '',
          address: '',
          password: '',
          role: ''
        }
      : {
          name: userObjectInfo.name,
          age: userObjectInfo.age.toString(),
          phoneNumber: userObjectInfo.phoneNumber,
          address: userObjectInfo.address,
          password: userObjectInfo.address,
          role: userObjectInfo.role.toString() === 'Admin' ? '0' : '1'
        },
    mode: 'all'
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    // Todo: Create a new User
    if (isCreate === true) {
      const infoUserCreate: UsersInterface = {
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        password: data.password,
        role: parseInt(data.role)
      }
      creteNewUser.mutate(infoUserCreate)
      setIsCreate(!isCreate)
    } else {
      // Todo: Editar a un usuario
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const UserId: any = userObjectInfo?.idUser
      const infoUserUpdate: UsersInterface = {
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        role: parseInt(data.role)
      }

      updateUser.mutate({ userInfo: infoUserUpdate, idUser: UserId })
      setIsCreate(!isCreate)
    }
    setUserObjectInfo(null)
    navigateTo('/users')
  }

  return (
    <Card className="mx-40 my-10">
      <CardHeader className="flex flex-col justify-center align-middle">
        <CardTitle className="text-center">
          {!userObjectInfo ? 'Agregar Nuevo Usuario' : 'Editar Usuario'}
        </CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="flex justify-center align-middle">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Agregar un nombre" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormDescription className="text-red-500">
                      {fieldState.error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Agregar un número de teléfono" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormDescription className="text-red-500">
                      {fieldState.error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Número de teléfono</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Agregar un número de teléfono" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormDescription className="text-red-500">
                      {fieldState.error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Agregue su dirección" {...field} />
                  </FormControl>
                  {fieldState.error && (
                    <FormDescription className="text-red-500">
                      {fieldState.error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <div>
              {!isCreate ? (
                <div></div>
              ) : (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contrseña</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Agrega una contraseña" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <FormDescription className="text-red-500">
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="role"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Rol del usuario</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={
                      userObjectInfo === null
                        ? ''
                        : changeRole(userObjectInfo?.role.toString()) ?? ''
                    }
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona el rol del usuario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Roles Disponibles</SelectLabel>
                        <SelectItem value="0">Administrador</SelectItem>
                        <SelectItem value="1">Empleado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FormDescription className="text-red-500">
                      {fieldState.error.message}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-center align-middle">
              <div className="mx-3">
                <Button variant={'default'} className="bg-[#4472c4]" type="submit">
                  {!userObjectInfo ? 'Agregar' : 'Editar'}
                </Button>
              </div>
              <div className="mx-3">
                <Button
                  className="bg-[#e32940]"
                  variant={'destructive'}
                  type="button"
                  onClick={() => {
                    setUserObjectInfo(null)
                    navigateTo('/users')
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
