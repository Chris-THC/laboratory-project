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
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { FormSchemaPay } from '../schema/FormSchemaPay'

interface PayReqData {
  ordenData: AddOrderTestIn
  moreDataByOrder: MoreInfoAddOrder
  nameCustomer: string
  txtButon: string
}

export const PayCard: React.FC<PayReqData> = ({
  ordenData,
  moreDataByOrder,
  nameCustomer,
  txtButon
}) => {
  const createOrder = useAddNewOrder()
  const navigateTo = useNavigate()

  const form = useForm<z.infer<typeof FormSchemaPay>>({
    resolver: zodResolver(FormSchemaPay),
    defaultValues: ordenData,
    mode: 'all'
  })

  const { watch, setValue } = form

  const orderTotal = Number(watch('orderTotal'))
  const orderAmountPaid = Number(watch('orderAmountPaid'))
  const orderDeposit = Number(watch('orderDeposit'))
  const [orderReminding, setOrderReminding] = useState<number>(0)
  const [changeMoney, setChangeMoney] = useState<number>(0)

  useEffect(() => {
    let orderChange = 0

    // The section is to return orderChange
    if (orderAmountPaid > orderDeposit) {
      orderChange = orderAmountPaid - orderDeposit
    }

    setChangeMoney(orderChange)
    const valueTest = orderTotal - orderDeposit
    setOrderReminding(valueTest)

    const message = valueTest === 0 ? `Pagado` : `Quedó a deber $${valueTest}`

    setValue('orderNotes', message, { shouldValidate: true, shouldDirty: true })
  }, [orderTotal, orderAmountPaid, orderDeposit, setValue])

  const onSubmit = (data: z.infer<typeof FormSchemaPay>): void => {
    const orderInfo: OrderInterface = {
      ...data,
      ...moreDataByOrder
    }
    if (txtButon === 'Agregar') {
      createOrder.mutate({
        orderBody: { ...orderInfo, orderReminding: changeMoney, orderChange: changeMoney }
      })
      navigateTo('/caja')
    } else if (txtButon === 'Editar') {
      createOrder.mutate({
        orderBody: { ...orderInfo, orderReminding: changeMoney, orderChange: changeMoney }
      })
    }
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="font-inter font-semibold text-[1.2rem]">{`Orden a nombre de ${nameCustomer}`}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-base font-inter">Total a pagar</div>
            <div className="text-base font-inter">{`$${ordenData.orderTotal}`}</div>
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-base font-inter">Depósito</div>
            <div className="text-base font-inter">{`$${orderDeposit}`}</div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="text-base font-inter">Restante</div>
            <div className="text-base font-inter">{`$${orderReminding}`}</div>
          </div>
        </div>

        <Separator className="my-5" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
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
              </div>

              <div className="space-y-1">
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

              <div className="flex items-center justify-between">
                <div className="text-lg font-medium">Cambio</div>
                <div className="text-lg font-medium">{`$${changeMoney}`}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-1 mt-5">
              <div className="mx-3">
                <DialogClose asChild>
                  <Button className="bg-[#4472c4]" type="submit">
                    {txtButon}
                  </Button>
                </DialogClose>
              </div>
              <div className="mx-3">
                <DialogClose asChild>
                  <Button variant={'destructive'} type="button" className="bg-[#e32940]">
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
