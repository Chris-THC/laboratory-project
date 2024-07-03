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
import { zodResolver } from '@hookform/resolvers/zod'
import { useContentResultWasSelect } from '@renderer/context/contentResults/contentsResultContext'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'
import { useUpdateContentResults } from '@renderer/hooks/res/contentsResultsRes/useContentsResultsRes'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export const TestForm: React.FC = () => {
  const { contentResultsArray: contentsresults } = useContentResultWasSelect()

  const { testNameSelected } = useTestIdByTestContens()

  const updateContentResults = useUpdateContentResults()

  const navigateToBack = useNavigate()

  const FormSchema = contentsresults
    ? z.object(Object.fromEntries(contentsresults.map((info) => [info.contResultId, z.string()])))
    : z.object({})

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    shouldUnregister: true
  })

  useEffect(() => {
    if (contentsresults) {
      const defaultValues = contentsresults.reduce(
        (values, field) => {
          values[field.contResultId!] = field.resultValue.toString() ?? ''
          return values
        },
        {} as Record<string, string>
      )

      // Check if defaultValues are actually different before resetting the form
      const currentValues = form.getValues()
      const shouldReset = Object.keys(defaultValues).some(
        (key) => defaultValues[key] !== currentValues[key]
      )

      if (shouldReset) {
        form.reset(defaultValues)
      }
    }
  }, [contentsresults, form])

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    Object.keys(data).map((idResults) => {
      const contenido = data[idResults]
      updateContentResults.mutate({
        contentResultId: parseInt(idResults),
        contentBody: { resultValue: contenido }
      })
    })
    navigateToBack(-1)
  }

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    navigateToBack(-1)
  }

  if (contentsresults === undefined) {
    return null
  }

  return (
    <div>
      <div>
        {contentsresults!.length === 0 ? (
          <div>
            <h1>Este examen aun no has seleccionado ningún parámetro</h1>
          </div>
        ) : (
          <div>
            <Card className="mt-5">
              <CardHeader>
                <CardTitle className="font-inter text-center text-[1rem]">{`PARÁMETROS PARA EL EXAMEN DE ${testNameSelected.toUpperCase()}`}</CardTitle>
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
                            name={contentResults.contResultId!.toString()}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{contentResults.contentsDTO?.name}</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  {contentResults.contentsDTO?.units === null
                                    ? 'Ingresa solo los valores'
                                    : `Referencia unidades en ${contentResults.contentsDTO?.units}`}
                                </FormDescription>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button className="bg-[#4472c4] mx-2" variant={'default'} type="submit">
                        Guardar
                      </Button>
                      <Button onClick={handleCancel} className="mx-2" variant={'destructive'}>
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
