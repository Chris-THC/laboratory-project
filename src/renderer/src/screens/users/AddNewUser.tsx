import React from 'react'
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
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate } from 'react-router-dom'

export interface InputsInterface {
  nameInput: string
  typeInput: string
  label: string
}

export const AddNewUser: React.FC = () => {
  const navigateTo = useNavigate()

  const inputsRequired: InputsInterface[] = [
    {
      nameInput: 'name',
      typeInput: 'text',
      label: 'Nombre'
    },
    {
      nameInput: 'age',
      typeInput: 'text',
      label: 'Edad'
    },
    {
      nameInput: 'phoneNumber',
      typeInput: 'text',
      label: 'Número de Teléfono '
    },
    {
      nameInput: 'address',
      typeInput: 'text',
      label: 'Dirección'
    },
    {
      nameInput: 'password',
      typeInput: 'password',
      label: 'Contraseña'
    }
  ]

  const FormSchema = z
    .object(
      Object.fromEntries(
        inputsRequired.map(({ nameInput, label }) => [
          nameInput,
          z.string().min(2, {
            message: `El campo ${label} debe tener al menos 2 caracteres.`
          })
        ])
      )
    )
    .merge(
      z.object({
        role: z
          .string({
            required_error: 'Por Selecciona un rol valido'
          })
          .toLowerCase()
      })
    )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...Object.fromEntries(Object.keys(FormSchema.shape).map((key) => [key, ''])),
      role: ''
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(data)
  }

  return (
    <div>
      <Label
        className="flex justify-center align-middle m-5 font-inter text-xl"
        style={{ fontSize: 25 }}
      >
        Agregar nuevo usuario
      </Label>
      <div className="flex justify-center align-middle m-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <div>
              {inputsRequired.map((inputs, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={inputs.nameInput}
                    render={({ field }) => (
                      <FormItem className="m-2">
                        <FormLabel className="my-10">{inputs.label}</FormLabel>
                        <FormControl>
                          <Input
                            type={inputs.typeInput}
                            placeholder={`Agregue su ${inputs.label}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}
            </div>

            <div className="mx-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
      </div>
    </div>
  )
}
