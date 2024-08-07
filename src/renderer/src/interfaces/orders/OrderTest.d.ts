export interface OrderTestIn {
  idOrders: number
  idCustomers: number
  customer?: Customer
  idUsers: number
  user?: User
  orderTest: any
  orderTimeStamp: string
  orderAmountPaid: number
  orderChange: number
  orderDeposit: number
  orderTotal: number
  orderNotes: string
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

export interface AddOrderTestIn {
  orderTotal: string
  orderDeposit: string
  orderAmountPaid: string
  orderChange: string
  orderNotes: string
}

export interface MoreInfoAddOrder {
  idUsers: number
  idCustomers: number
  orderTimeStamp: string
}
