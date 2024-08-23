import { z } from 'zod'

export const FormSchemaPay = z.object({
  orderAmountPaid: z.preprocess(
    (val) => Number(val),
    z.number({ message: 'Este campo solo puede contener números' })
  ),
  orderChange: z.preprocess(
    (val) => Number(val),
    z.number({ message: 'Este campo solo puede contener números' })
  ),
  orderDeposit: z.preprocess(
    (val) => Number(val),
    z.number({ message: 'Este campo solo puede contener números' })
  ),
  orderTotal: z.preprocess(
    (val) => Number(val),
    z.number({ message: 'Este campo solo puede contener números' })
  ),
  orderNotes: z.string({
    message: 'Notas requeridas'
  }),
  // orderReminding: z.preprocess(
  //   (val) => Number(val),
  //   z.number({ message: 'Este campo solo puede contener números' })
  // )
})
