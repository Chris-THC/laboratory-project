import { ContentsResultsInterface } from '@renderer/interfaces/contentsResults/contentsResults'
import React from 'react'
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
    console.log(contentsresults)
  
  const FormSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.'
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ''
    }
  })

  const onSubmit = (data: z.infer<typeof FormSchema>): void => {
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <h1>Test Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <div>
        {contentsresults && contentsresults.length === 0 ? (
          <div>
            <h1>Este examen aun no has seleccionado ningún parámetro</h1>
          </div>
        ) : (
          <div>
            {contentsresults?.map((contentResults, index) => {
              return (
                <div key={index}>
                  <h1>{`Nombre: ${contentResults.contentsDTO?.name}`}</h1>
                  <h1>{`Valor: ${contentResults.resultValue}`}</h1>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
