import { z } from 'zod'

export const FormSchemaPay = z.object({
  orderAmountPaid: z.string().regex(/^[0-9]+$/, {
    message: 'Este campo solo puede contener números'
  }),
  orderChange: z.string().regex(/^[0-9]+$/, {
    message: 'Este campo solo puede contener números'
  }),
  orderDeposit: z.string().regex(/^[0-9]+$/, {
    message: 'Este campo solo puede contener números'
  }),
  orderTotal: z.string().regex(/^[0-9]+$/, {
    message: 'Este campo solo puede contener números'
  }),
  orderNotes: z.string({
    message: 'La direccion debe de tener al menos 2 caracteres'
  })
})
