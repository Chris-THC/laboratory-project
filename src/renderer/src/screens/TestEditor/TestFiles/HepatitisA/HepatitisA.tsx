import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

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
import { FileCog, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
})

export function HepatitisA(): JSX.Element {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: 'NEGATIVO'
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>): void {
    console.log(data)
    navigate(-1)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="mb-1 font-inter">Información del examen</CardTitle>
          <Separator className="my-5" />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-1">Hepatitis A</FormLabel>
                      <FormControl>
                        <Input className="font-inter" placeholder="Hepatitis ‘A’" {...field} />
                      </FormControl>
                      <FormDescription className="font-inter ml-1">
                        Valor de referencia: NEGATIVO
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button className="mx-3 bg-[#054f87]" type="submit">
                  <FileCog className="mr-1" />
                  Guardar
                </Button>
                <Button
                  className="mx-3"
                  variant={'outline'}
                  onClick={() => {
                    navigate('/pdf/render')
                  }}
                  type="button"
                >
                  <FileText className="mr-1" />
                  Mostrar PDF
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
