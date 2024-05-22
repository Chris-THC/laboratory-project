import { zodResolver } from '@hookform/resolvers/zod'
import { TestContentsInterface } from '@renderer/interfaces/testContest/testContents'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { useTestIdByTestContens } from '@renderer/context/testContentsContext/testContentContext'
import { ResultsInterface } from '@renderer/interfaces/results/results'
import { useNewContentResult } from '@renderer/hooks/res/contentsResultsRes/useContentsResultsRes'

interface PropsTestContents {
  testContents: TestContentsInterface[]
  resultsByIdTestAndIdCustomer: ResultsInterface[] | undefined | null
}

interface Item {
  id: string
  label: string
}

export const AvailableParametersByTest: React.FC<PropsTestContents> = ({
  testContents,
  resultsByIdTestAndIdCustomer
}) => {
  const { testNameSelected } = useTestIdByTestContens()
  const newContentsInfo = useNewContentResult()


  const items: Item[] = testContents.map((testInfo) => ({
    id: testInfo.contentsDTO!.contentId.toString(),
    label: testInfo.contentsDTO!.name
  }))

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: 'Debe seleccionar al menos un elemento'
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: []
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    console.log(JSON.stringify(data, null, 2))
    const infoCustomer = resultsByIdTestAndIdCustomer![0]
    data.items.map((info) => {
      const contentBody = {
        resultId: infoCustomer.idResults,
        contentId: parseInt(info),
        resultValue: " "
      }
      newContentsInfo.mutate(contentBody)
      // console.log(contentBody);
      
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <Card>
                <CardHeader>
                  <CardTitle className="font-inter text-[1.05rem]">{testNameSelected}</CardTitle>
                  <h2 className="text-[1rem]">Seleccione los elementos que desea agregar</h2>
                  <Separator className="my-2" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-1">
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  defaultChecked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== item.id)
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </CardContent>

                <Separator className="my-3" />

                <CardFooter className="flex justify-start">
                  <Button
                    variant={'outline'}
                    type="submit"
                    className="bg-[#0a95ed] text-white mx-2"
                  >
                    Aceptar
                  </Button>
                  <Button
                    variant={'outline'}
                    className="bg-red-600 text-white mx-2"
                    onClick={(event) => {
                      event.preventDefault()
                      console.log('Cancelar')
                    }}
                  >
                    Cancelar
                  </Button>
                </CardFooter>
              </Card>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
