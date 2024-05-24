import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface PropsTestForm {
  contentsresults: ContentsResultsInterface[] | null | undefined
}

export const TestForm: React.FC<PropsTestForm> = ({ contentsresults }) => {
  // Verificar si contentsresults es undefined y manejar el caso
  if (contentsresults === undefined) {
    return null; // O cualquier otro JSX que desees renderizar en este caso
  }

  const FormSchema = z.object(
    Object.fromEntries(
      contentsresults!.map((info) => [
        info.contentsDTO?.name,
        z.string().min(2, {
          message: `${info.contentsDTO?.name} must be at least 2 characters.`
        })
      ])
    )
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true // Esto habilitará la validación automática al cambiar los valores de los campos
  })

  useEffect(() => {
    // Actualizar los valores del formulario cuando contentsresults cambie
    if (contentsresults) {
      const defaultValues = contentsresults.reduce((values, field) => {
        values[field.contentsDTO!.name] = field.resultValue ?? '' // Usamos el nombre del campo como clave
        return values
      }, {})
      form.reset(defaultValues);
    }
  }, [contentsresults, form])

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <h1>Test Form</h1>

      <div>
        {contentsresults!.length === 0 ? (
          <div>
            <h1>Este examen aun no has seleccionado ningún parámetro</h1>
          </div>
        ) : (
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <div>
                  {contentsresults!.map((contentResults, index) => (
                    <div key={index}>
                      <FormField
                        control={form.control}
                        name={contentResults.contentsDTO!.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{contentResults.contentsDTO?.name}</FormLabel>
                            <FormControl>
                              <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
}

