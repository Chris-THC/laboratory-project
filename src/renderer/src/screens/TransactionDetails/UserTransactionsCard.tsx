import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from 'react-router-dom'
import { ArrowLeft} from 'lucide-react'

export const UserTransactionsCard: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-white text-gray-900 mx-8 mt-4">
    <div className="mb-2">
      <div className="flex flex-row justify-center align-middle">
        <h1 className="font-bold mb-1 font-inter text-[1.5rem] ml-1" id="development-heading">
          CAJA
        </h1>
      </div>
      <Button onClick={() => navigate(-1)} className="font-inter" variant={'outline'}>
        <ArrowLeft className="mr-1" />
        Regresar
      </Button>
    </div>
    <Card>
      <CardHeader>
        <CardTitle>Ver detalles de las transacciones, incluyendo ingresos y retiros de dinero de la caja.</CardTitle>
       </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Precio Total</TableHead>
              <TableHead>Pagó con</TableHead>
              <TableHead>Cantidad pagada</TableHead>
              <TableHead>Cambio</TableHead>
              <TableHead>Deposito</TableHead>
              <TableHead>Comentarios</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Liam Johnson</div>
              </TableCell>
              <TableCell>Acme Inc</TableCell>
              <TableCell>
                <div>Wireless Earbuds</div>
                <div>Noise-Cancelling Headphones</div>
              </TableCell>
              <TableCell>$149.98</TableCell>
              <TableCell>$100.00</TableCell>
              <TableCell>$149.98</TableCell>
              <TableCell>$49.98</TableCell>
              <TableCell>
                <Button size="sm">Deposit</Button>
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Add comments here" rows={2} />
              </TableCell>
              <TableCell>2023-06-23 12:34:56</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Olivia Smith</div>
              </TableCell>
              <TableCell>Globex Corp</TableCell>
              <TableCell>
                <div>Vintage Pocket Watch</div>
                <div>Leather Briefcase</div>
                <div>Luxury Fountain Pen</div>
              </TableCell>
              <TableCell>$199.97</TableCell>
              <TableCell>$200.00</TableCell>
              <TableCell>$199.97</TableCell>
              <TableCell>$0.03</TableCell>
              <TableCell>
                <Button size="sm">Deposit</Button>
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Add comments here" rows={2} />
              </TableCell>
              <TableCell>2023-06-24 15:22:11</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Noah Williams</div>
              </TableCell>
              <TableCell>Stark Industries</TableCell>
              <TableCell>
                <div>Classic Leather Shoes</div>
                <div>Luxury Silk Tie</div>
              </TableCell>
              <TableCell>$99.98</TableCell>
              <TableCell>$100.00</TableCell>
              <TableCell>$99.98</TableCell>
              <TableCell>$0.02</TableCell>
              <TableCell>
                <Button size="sm">Deposit</Button>
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Add comments here" rows={2} />
              </TableCell>
              <TableCell>2023-06-25 09:45:23</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="font-medium">Emma Brown</div>
              </TableCell>
              <TableCell>Stark Industries</TableCell>
              <TableCell>
                <div>Designer Handbag</div>
                <div>Luxury Sunglasses</div>
              </TableCell>
              <TableCell>$179.98</TableCell>
              <TableCell>$180.00</TableCell>
              <TableCell>$179.98</TableCell>
              <TableCell>$0.02</TableCell>
              <TableCell>
                <Button size="sm">Deposit</Button>
              </TableCell>
              <TableCell>
                <Textarea className="w-full" placeholder="Add comments here" rows={2} />
              </TableCell>
              <TableCell>2023-06-26 14:08:42</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
    
  )
}
