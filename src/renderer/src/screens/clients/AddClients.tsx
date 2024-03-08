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
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useClientIdSelected } from '@renderer/context/clientContext/clientContext'
import { useUpdateClientById } from '@renderer/hooks/res/clientRes/UseClientAPI'
import { ClientsInterface } from '@renderer/interfaces/clients/clients'

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

  dateOfBirth: z.date({
    required_error: 'A date of birth is required.'
  }),
  doctor: z.string({
    required_error: 'El nombre del doctor es requerido'
  }),
  exam: z.string({
    required_error: 'El valor es requerido'
  }),
  status: z.string({
    required_error: 'El valor es requerido'
  })
})

export const AddClients: React.FC = () => {
  const navigateTo = useNavigate()
  // const creteNewUser = useCreateNewClient()
  const { clientObjectInfo } = useClientIdSelected()
  const updateUser = useUpdateClientById()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: !clientObjectInfo
      ? {
          name: '',
          age: '',
          phoneNumber: '',
          dateOfBirth: new Date(),
          address: '',
          doctor: '',
          exam: '',
          status: ''
        }
      : {
          name: clientObjectInfo.name,
          age: clientObjectInfo.age.toString(),
          phoneNumber: clientObjectInfo.phoneNumber,
          dateOfBirth: new Date('2024-01-01'),
          address: clientObjectInfo.address,
          doctor: clientObjectInfo.doctor,
          exam: clientObjectInfo.exam.toString() === 'Sangre' ? '0' : '1',
          status: '1'
        }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    // const infoClient: ClientsInterface = {
    //   name: data.name,
    //   age: parseInt(data.age),
    //   phoneNumber: data.phoneNumber,
    //   dateOfBirth: data.dateOfBirth.toString(),
    //   address: data.address,
    //   doctor: data.doctor,
    //   exam: parseInt(data.exam),
    //   status: parseInt(data.status)
    // }

    console.log(data)

    // Todo: Create a new User
    // if (isClientCreate === true) {
    //   creteNewUser.mutate(infoClient)
    //   setIsClientCreate(!isClientCreate)
    // } else {
    //   // Todo: Editar a un usuario
    //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //   const clientId: any = clientObjectInfo?.idClient
    //   updateUser.mutate({ ClientInfo: infoClient, idClient: clientId })
    //   setIsClientCreate(!isClientCreate)
    // }

    // navigateTo('/users')
  } 

  return (
    <Card className="mx-40 my-10">
      <CardHeader className="flex flex-col justify-center align-middle">
        <CardTitle className="text-center">
          {!clientObjectInfo ? 'Agregar Nuevo Usuario' : 'Editar Usuario'}
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
              name="doctor"
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
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Estatus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value === 'Liquido' ? '0' : '1'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de examen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Liquido</SelectItem>
                      <SelectItem value="1">Solido</SelectItem>
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
              name="exam"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Examen</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value === 'Sangre' ? '0' : '1'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de examen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Sangre</SelectItem>
                      <SelectItem value="1">Orina</SelectItem>
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
                <Button type="submit">{!clientObjectInfo ? 'Agregar' : 'Editar'}</Button>
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
