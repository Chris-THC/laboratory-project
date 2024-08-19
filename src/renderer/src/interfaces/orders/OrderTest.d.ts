export interface AddOrderTestIn {
  orderTotal: number
  orderDeposit: number
  orderAmountPaid: number
  orderChange: number
  orderNotes: string
}

export interface MoreInfoAddOrder {
  idUsers: number
  idCustomers: number
  orderTimeStamp: string
}

export interface SendOrderInfo {
  idCustomers: number
  idUsers: number
  orderTimeStamp: string
  orderAmountPaid: number
  orderChange: number
  orderDeposit: number
  orderTotal: number
  orderNotes: string
  orderReminding: number
}

export interface OrderInterface {
  idOrders?: number
  idCustomers: number
  customer?: any
  idUsers: number
  user?: any
  orderTest?: any
  orderTimeStamp: string
  orderAmountPaid: number
  orderChange: number
  orderDeposit: number
  orderTotal: number
  orderNotes: string
}
