import { TestInterface } from '../tests/test'

export interface CostumerTestInterface {
  idCustomersTests: number
  idCustomer: number
  idTest: number
  testDTO: TestInterface
  status: string
}

export interface CostumerTestAddInterface {
  idCustomer: number | null | undefined
  idTest: number
  status: string
}
