import { zodResolver } from '@hookform/resolvers/zod'
import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'

interface PropsTestForm {
  contentsresults: ContentsResultsInterface[] | null | undefined
}

export const TestForm: React.FC<PropsTestForm> = ({ contentsresults }) => {
  const { testNameSelected } = useTestIdByTestContens()

  // Define FormSchema y form fuera de la condición
  const FormSchema = contentsresults
    ? z.object(
        Object.fromEntries(
          contentsresults.map((info) => [
            info.contentsDTO?.name,
            z.string().min(2, {
              message: `${info.contentsDTO?.name} must be at least 2 characters.`
            })
          ])
        )
      )
    : z.object({})

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true // Esto habilitará la validación automática al cambiar los valores de los campos
  })

  useEffect(() => {
    // Actualizar los valores del formulario cuando contentsresults cambie
    if (contentsresults) {
      const defaultValues = contentsresults.reduce(
        (values, field) => {
          values[field.contentsDTO!.name] = field.resultValue.toString() ?? '' // Usamos el nombre del campo como clave
          return values
        },
        {} as Record<string, string>
      )
      form.reset(defaultValues)
    }
  }, [contentsresults, form])

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(JSON.stringify(data, null, 2))
  }

  if (contentsresults === undefined) {
    return null // O cualquier otro JSX que desees renderizar en este caso
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
            <Card className="mt-5">
              <CardHeader>
                <CardTitle className="font-inter text-center text-[1rem]">{`PARÁMETROS PARA EL EXAMEN DE ${testNameSelected}`}</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <div className="grid grid-cols-4 gap-8">
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
                                <FormDescription>{`Resultados para ${contentResults.contentsDTO?.name}`}</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="bg-[#4472c4] mx-2" variant={'default'} type="submit">
                        Guaradar
                      </Button>
                      <Button
                        onClick={() => {
                          console.log('Hace otra wea')
                        }}
                        className="mx-2"
                        variant={'destructive'}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
