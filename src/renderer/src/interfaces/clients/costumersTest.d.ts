import { TestInterface } from '../tests/test'

export interface CostumerTestInterface {
  idCustomersTests: number
  idCustomer: number
  idTest: number
  testDTO: TestInterface
  status: string
  priceByTest: number
}

export interface CostumerTestAddInterface {
  idCustomer: number | null | undefined
  idTest: number
  status: string
  priceByTest?: number
}

export interface PriceTestI {
  priceByTest: number
}
