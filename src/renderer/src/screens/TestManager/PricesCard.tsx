import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'


export const PricesCard : React.FC = () =>{
  const [prices, setPrices] = useState([
    { id: 1, price: 49.99 },
    { id: 2, price: 99.99 },
    { id: 3, price: 149.99 },
    { id: 4, price: 199.99 },
  ])
  const handlePriceChange = (id, newPrice) => {
    setPrices((prevPrices) =>
      prevPrices.map((product) => (product.id === id ? { ...product, price: newPrice } : product)),
    )
  }
  const totalPrice = prices.reduce((total, product) => total + product.price, 0)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos a pagar</CardTitle>
        <Separator className="my-5" />
      </CardHeader>
      <CardContent>
  
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {prices.map((product) => (
            <div
              key={product.id}
              className="rounded-lg bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Acme Gadget {product.id}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-muted-foreground">
                    <Input
                      type="number"
                      value={product.price}
                      onChange={(e) => handlePriceChange(product.id, parseFloat(e.target.value))}
                      className="w-24 rounded-md border-none bg-transparent text-muted-foreground"
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
        <Button className="rounded-lg bg-primary px-6 py-4 text-2xl font-bold text-primary-foreground shadow-lg">
            Total: ${totalPrice.toFixed(2)}
          </Button>
        </div>
      </div>
  
    </CardContent>
    </Card>
  )
}