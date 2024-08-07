import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTestArrayList } from '@renderer/context/testByUser/testArrayByUser'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PricesCard: React.FC = () => {
  const navigateTo = useNavigate()
  const { testArrayList } = useTestArrayList()
  const [prices, setPrices] = useState<number[]>([])

  useEffect(() => {
    if (testArrayList) {
      setPrices(testArrayList.map((testInfo) => testInfo.testDTO.testPrice))
    }
  }, [testArrayList])

  const handlePriceChange = (index: number, value: number) => {
    const newPrices = [...prices]
    newPrices[index] = value
    setPrices(newPrices)
  }

  const totalTest = prices.reduce((acc, price) => acc + price, 0)

  return (
    <div className="container mx-auto px-4 md:px-6">
      {!testArrayList || testArrayList.length === 0 ? (
        <p>No hay datos</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {testArrayList!.map((testInfo, index) => {
              return (
                <div
                  key={index}
                  className="rounded-lg bg-card p-4 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mt-4">
                    <h3 className="text-base font-medium">{testInfo.testDTO.testName}</h3>

                    <div className="mt-1 flex items-center justify-between">
                      <div className="text-muted-foreground flex flex-row items-center h-[30px]">
                        <p className="text-base font-inter mr-2">{'Precio sugerido $'}</p>
                        <Input
                          type="text"
                          defaultValue={prices[index]}
                          onChange={(e) => handlePriceChange(index, parseFloat(e.target.value))}
                          className="w-24 border-b border-muted-foreground bg-transparent text-muted-foreground focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-8 flex justify-end">
            <div>
              <h3 className="text-base font-medium font-inter mb-2">Registrar transacción</h3>
              <Button
                onClick={() => navigateTo('/caja')}
                variant={'outline'}
                className="rounded-lg  px-6 py-4 text-xl font-medium text-[#111] shadow-lg"
              >
                Total: ${totalTest}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
