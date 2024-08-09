import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogClose } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddNewOrder } from '@renderer/hooks/res/CashRegister/UserCashRegister'
import {
  AddOrderTestIn,
  MoreInfoAddOrder,
  OrderInterface
} from '@renderer/interfaces/orders/OrderTest'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormSchemaPay } from '../schema/FormSchemaPay'
import { useNavigate } from 'react-router-dom'

interface PayReqData {
  ordendata: AddOrderTestIn
  moreDataByOrder: MoreInfoAddOrder
  nameCustomer: string
}

export const PayCard: React.FC<PayReqData> = ({ ordendata, moreDataByOrder, nameCustomer }) => {
  const createOrder = useAddNewOrder()
  const navigateTo = useNavigate()

  const form = useForm<z.infer<typeof FormSchemaPay>>({
    resolver: zodResolver(FormSchemaPay),
    defaultValues: ordendata,
    mode: 'all'
  })

  const onSubmit = (data: z.infer<typeof FormSchemaPay>): void => {
    const orderInfo: OrderInterface = {
      ...data,
      ...moreDataByOrder
    }
    createOrder.mutate({ orderBody: orderInfo })
    navigateTo('/caja')
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{`Orden a nombre de ${nameCustomer}`}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 mt-3">
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="orderTotal"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Total de la orden</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Total" {...field} />
                        </FormControl>
                        {fieldState.error && (
                          <FormDescription className="text-red-500">
                            {fieldState.error.message}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="orderAmountPaid"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Dinero Recibido</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Dinero Recibido" {...field} />
                        </FormControl>
                        {fieldState.error && (
                          <FormDescription className="text-red-500">
                            {fieldState.error.message}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="orderDeposit"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Depósito</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Depósito" {...field} />
                        </FormControl>
                        {fieldState.error && (
                          <FormDescription className="text-red-500">
                            {fieldState.error.message}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="orderChange"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Cambio</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Cambio" {...field} />
                        </FormControl>
                        {fieldState.error && (
                          <FormDescription className="text-red-500">
                            {fieldState.error.message}
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderNotes"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Notas</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Notas" {...field} />
                      </FormControl>
                      {fieldState.error && (
                        <FormDescription className="text-red-500">
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <div className="mx-3">
                <DialogClose asChild>
                  <Button className="bg-[#4472c4]" type="submit">
                    Agregar
                  </Button>
                </DialogClose>
              </div>
              <div className="mx-3">
                <DialogClose asChild>
                  <Button
                    variant={'destructive'}
                    type="button"
                    className="bg-[#e32940]"
                    onClick={() => {
                      // setClientObjectInfo(null)
                      // navigateTo('/customer')
                    }}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
