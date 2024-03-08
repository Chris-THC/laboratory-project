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
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'
import { DateTime } from 'luxon'
import { useCreateNewClient, useUpdateClientById } from '@renderer/hooks/res/clientRes/UseClientAPI'

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'El nombre debe de tener al menos 2 caracteres'
    })
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
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
    .regex(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
      message: 'El nombre solo puede contener letras y espacios'
    }),
  idTests: z.string({
    required_error: 'El valor es requerido'
  }),
  status: z.string({
    required_error: 'El valor es requerido'
  }),
  notes: z.string({
    required_error: 'El valor es requerido'
  })
})

export const AddClients: React.FC = () => {
  const navigateTo = useNavigate()
  const creteNewUser = useCreateNewClient()
  const { clientObjectInfo, isClientCreate, setIsClientCreate, setClientObjectInfo} = useClientIdSelected()
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
          doctorName: '',
          idTests: '',
          status: '',
          notes: ''
        }
      : {
          name: clientObjectInfo.name,
          age: clientObjectInfo.age.toString(),
          phoneNumber: clientObjectInfo.phoneNumber,
          dateOfBirth: clientObjectInfo.dateOfBirth,
          address: clientObjectInfo.address,
          doctorName: clientObjectInfo.doctorName,
          idTests: clientObjectInfo.idTests,
          status: '1',
          notes: clientObjectInfo.notes
        },
    mode: 'all'
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    const dateNow: DateTime = DateTime.now()

    if(isClientCreate === true){
      const createNewClient: ClientsInterface = {
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        status: parseInt(data.status),
        pdfTimestamp: dateNow.toISODate(),
        doctorName: data.doctorName,
        idTests: data.idTests,
        notes: data.notes
      }
      creteNewUser.mutate(createNewClient)
      setIsClientCreate(!isClientCreate)
    }else{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clientId: any = clientObjectInfo?.idCustomer
      const infoClientUpdate: ClientsInterface={
        name: data.name,
        age: parseInt(data.age),
        phoneNumber: data.phoneNumber,
        address: data.address,
        dateOfBirth: data.dateOfBirth,
        status: parseInt(data.status),
        pdfTimestamp: dateNow.toISODate(),
        doctorName: data.doctorName,
        idTests: data.idTests,
        notes: data.notes
      }
      updateUser.mutate({ClientInfo:infoClientUpdate, idClient:clientId})
      setIsClientCreate(!isClientCreate)
    }
    setClientObjectInfo(null)
    navigateTo('/customers')

    

    // alert(JSON.stringify(createNewClient))
    

    // Todo: Create a new User
    //if (isClientCreate === true) {
    //   creteNewUser.mutate(infoClient)
    //   setIsClientCreate(!isClientCreate)
    // } else {
    //   // Todo: Editar a un usuario
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   const clientId: any = clientObjectInfo?.idClient
    //   updateUser.mutate({ ClientInfo: infoClient, idClient: clientId })
    //   setIsClientCreate(!isClientCreate)
    //}

    // navigateTo('/costumer')
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

            {/* <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={'outline'}>
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: Date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription>
                </FormItem>
              )}
            /> */}

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

            <FormField
              control={form.control}
              name="status"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Estatus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={isCreate === true ? '' : getFieldValue(field.value)}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona el status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estatus</SelectLabel>
                        <SelectItem value="0">Reportado</SelectItem>
                        <SelectItem value="1">Impreso</SelectItem>
                        <SelectItem value="2">Entregado</SelectItem>
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

            <FormField
              control={form.control}
              name="idTests"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Examen</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={isCreate === true ? '' : getFieldValue(field.value)}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona el examen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Examenes Disponibles</SelectLabel>
                        <SelectItem value="0">Orina</SelectItem>
                        <SelectItem value="1">Glucosa</SelectItem>
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

            <FormField
              control={form.control}
              name="notes"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Agregue una nota" {...field} />
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
                <Button type="submit">{!clientObjectInfo ? 'Agregar' : 'Editar'}</Button>
              </div>
              <div className="mx-3">
                <Button
                  variant={'destructive'}
                  type="button"
                  onClick={() => {
                    navigateTo('/uscustomerers')
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
