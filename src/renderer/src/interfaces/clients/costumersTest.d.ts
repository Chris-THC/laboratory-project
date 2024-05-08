import { TestInterface } from '../tests/test'

export interface CostumerTestInterface {
  idCustomersTests: number
  idCustomer: number
  idTest: number
  testDTO: TestInterface
  status: string
}
