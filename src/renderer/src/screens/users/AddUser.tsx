import React from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { UsersInterface } from '@renderer/interfaces/users/user'
import { useCreateNewUser } from '@renderer/hooks/res/usersRes/UseUsersAPI'

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe de tener al menos 2 caracteres'
  }),
  age: z
    .string()
    .min(1, {
      message: 'La edad no debe de tener al menos 1 digito'
    })
    .max(2, { message: 'La edad no puede tener más de 3 dígitos' }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'El número de teléfono debe de tener al menos 10 dígitos'
    })
    .max(10, { message: 'El número de teléfono no debe de tener más de 10 dígitos' }),
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
  const { mutate } = useCreateNewUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      age: '',
      phoneNumber: '',
      address: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    const createNewUser: UsersInterface = {
      name: data.name,
      age: parseInt(data.age),
      phoneNumber: data.phoneNumber,
      address: data.address,
      password: data.password,
      role: parseInt(data.role)
    }
    // TODO: Add a new user
    mutate(createNewUser)
    console.log(createNewUser)
    navigateTo('/users')
  }

  return (
    <Card className="mx-40 my-10">
      <CardHeader className="flex flex-col justify-center align-middle">
        <CardTitle className="text-center">Agregar nuevo usuario</CardTitle>
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
                    <Input type="number" placeholder="Agregar un número de teléfono" {...field} />
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
                    <Input type="number" placeholder="Agregar un número de teléfono" {...field} />
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

            <FormField
              control={form.control}
              name="role"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Rol del usuario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el rol del usuario" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Administrador</SelectItem>
                      <SelectItem value="1">Empleado</SelectItem>
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
                <Button type="submit">Agregar</Button>
              </div>
              <div className="mx-3">
                <Button
                  variant={'destructive'}
                  type="button"
                  onClick={() => {
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
