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
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useCreateNewClient, useUpdateClientById } from '@renderer/hooks/res/clientRes/UseClientAPI'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'

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

  dateOfBirth: z.string({
    required_error: 'A date of birth is required.'
  }),
  doctorName: z
    .string()
    .min(2, {
      message: 'El nombre debe de tener al menos 2 caracteres'
    })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s.,]+$/, {
      message: 'El nombre solo puede contener letras y espacios'
    })
})

export const AddClients: React.FC = () => {
  const navigateTo = useNavigate()
  const creteNewUser = useCreateNewClient()
  const { clientObjectInfo, isClientCreate, setIsClientCreate, setClientObjectInfo } =
    useClientIdSelected()

  const updateUser = useUpdateClientById()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: !clientObjectInfo
      ? {
          name: '',
          age: '',
          phoneNumber: '',
          dateOfBirth: '',
          address: '',
          doctorName: ''
        }
      : {
          name: clientObjectInfo.name,
          age: clientObjectInfo.age.toString(),
          phoneNumber: clientObjectInfo.phoneNumber,
          dateOfBirth: clientObjectInfo.dateOfBirth,
          address: clientObjectInfo.address,
          doctorName: clientObjectInfo.doctorName
        },
    mode: 'all'
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    if (isClientCreate === true) {
      const createNewClient: ClientsInterface = {
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        doctorName: data.doctorName
      }
      creteNewUser.mutate(createNewClient)
      setIsClientCreate(!isClientCreate)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clientId: any = clientObjectInfo?.idCustomer
      const infoClientUpdate: ClientsInterface = {
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        doctorName: data.doctorName
      }
      updateUser.mutate({ ClientInfo: infoClientUpdate, idClient: clientId })
      setIsClientCreate(!isClientCreate)
    }
    setClientObjectInfo(null)
    navigateTo('/customer')
  }

  return (
    <Card className="mx-40 my-10">
      <CardHeader className="flex flex-col justify-center align-middle">
        <CardTitle className="text-center">
          {!clientObjectInfo ? 'Agregar Nuevo Cliente' : 'Editar Cliente'}
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
              name="dateOfBirth"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Agregar fecha de nacimiento" {...field} />
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
              name="doctorName"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre del doctor</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Agregar el nombre del doctor" {...field} />
                  </FormControl>
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
                <Button className="bg-[#4472c4]" type="submit">
                  {!clientObjectInfo ? 'Agregar' : 'Editar'}
                </Button>
              </div>
              <div className="mx-3">
                <Button
                  variant={'destructive'}
                  type="button"
                  className="bg-[#e32940]"
                  onClick={() => {
                    setClientObjectInfo(null)
                    navigateTo('/customer')
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
