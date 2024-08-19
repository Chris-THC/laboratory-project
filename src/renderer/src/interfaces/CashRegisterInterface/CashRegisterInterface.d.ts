export interface CashRegisterI {
  idOrders: number
  idCustomers: number
  customer: Customer
  idUsers: number
  user: User
  orderTest: any
  orderTimeStamp: string
  orderAmountPaid: number
  orderChange: number
  orderDeposit: number
  orderTotal: number
  orderNotes: string
  orderReminding:number
}

interface Customer {
  idCustomer: number
  name: string
  age: number
  phoneNumber: string
  address: string
  dateOfBirth: string
  doctorName: string
}

interface User {
  idUser: number
  name: string
  age: number
  phoneNumber: string
  address: string
  role: string
}
