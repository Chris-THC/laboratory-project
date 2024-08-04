import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useTestArrayList } from '@renderer/context/testByUser/testArrayByUser'
import { useUpdatePriceTest } from '@renderer/hooks/res/clientRes/UseClientTest'

import React from 'react'

export const PayComponent: React.FC = () => {
  const { testArrayList } = useTestArrayList()
  const updatePrice = useUpdatePriceTest()

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8">
      {!testArrayList || testArrayList.length === 0 ? (
        <div>
          <p>No hay datos</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-inter text-xl">Resumen de pago</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Examen</TableHead>
                    <TableHead className="text-right">Precio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testArrayList.map((testInfo, index) => {
                    const GetTestPrice = (): number => {
                      if (testInfo.priceByTest === 0 || testInfo.priceByTest === 0.0) {
                        return testInfo.testDTO.testPrice
                      } else if (testInfo.priceByTest === null) {
                        return testInfo.testDTO.testPrice
                      } else {
                        return testInfo.priceByTest!
                      }
                    }

                    return (
                      <TableRow key={index}>
                        <TableCell className="font-inter">{testInfo.testDTO.testName}</TableCell>
                        <TableCell className="flex justify-end align-bottom content-end font-inter text-base">
                          <Input
                            type="text"
                            defaultValue={GetTestPrice()}
                            onChange={(e) => {
                              updatePrice.mutate({
                                idCustomerTest: testInfo.idCustomersTests,
                                testPrice: { priceByTest: parseFloat(e.target.value) }
                              })
                            }}
                            className="w-28 border-b border-muted-foreground bg-transparent text-muted-foreground focus:outline-none text-right"
                          />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>

              <div className="grid gap-4">
                <Separator />
                <div className="flex items-center justify-between font-medium mx-2">
                  <h3 className="text-base font-inter">Total a pagar</h3>
                  <Button
                    onClick={async () => {
                      // updatePrice.mutate({ idCustomerTest: 1, testPrice: { priceByTest: 123 } })
                    }}
                    variant={'outline'}
                    className="rounded-lg  px-6 py-4 text-xl font-medium text-[#111] shadow-lg"
                  >
                    Total: ${100}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
