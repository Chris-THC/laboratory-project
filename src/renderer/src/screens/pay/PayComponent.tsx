/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QBIyfhZI2Zd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Pagar exámenes</h1>
          <p className="text-muted-foreground">Completa el pago de los exámenes registrados en tu cuenta.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Exámenes a pagar</CardTitle>
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
                <TableRow>
                  <TableCell>Examen de Matemáticas</TableCell>
                  <TableCell className="text-right">$50.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Examen de Física</TableCell>
                  <TableCell className="text-right">$60.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Examen de Química</TableCell>
                  <TableCell className="text-right">$55.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumen de pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div>$165.00</div>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <div>Total a pagar</div>
                <div>$165.00</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información de pago</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre en la tarjeta</Label>
                <Input id="name" placeholder="Nombre Apellido" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="card-number">Número de tarjeta</Label>
                <Input id="card-number" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiration">Vencimiento</Label>
                  <div className="flex gap-2">
                    <Select>
                      <SelectTrigger id="expiration-month">
                        <SelectValue placeholder="Mes" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01">Enero</SelectItem>
                        <SelectItem value="02">Febrero</SelectItem>
                        <SelectItem value="03">Marzo</SelectItem>
                        <SelectItem value="04">Abril</SelectItem>
                        <SelectItem value="05">Mayo</SelectItem>
                        <SelectItem value="06">Junio</SelectItem>
                        <SelectItem value="07">Julio</SelectItem>
                        <SelectItem value="08">Agosto</SelectItem>
                        <SelectItem value="09">Septiembre</SelectItem>
                        <SelectItem value="10">Octubre</SelectItem>
                        <SelectItem value="11">Noviembre</SelectItem>
                        <SelectItem value="12">Diciembre</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger id="expiration-year">
                        <SelectValue placeholder="Año" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                        <SelectItem value="2030">2030</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Pagar ${165}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}