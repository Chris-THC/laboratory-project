export const changeStatus = (status: string | undefined | null): string | undefined | null => {
  const statusValues = {
    null: '',
    Reported: '0',
    Pending: '1',
    Delivered: '2'
  }
  return statusValues[status as keyof typeof statusValues] || ''
}

export const changeStatusTable = (status: string | undefined | null): string | undefined | null => {
  const statusValues = {
    null: '',
    Reported: 'Reportado',
    Pending: 'Pendiente',
    Delivered: 'Entregado'
  }
  return statusValues[status as keyof typeof statusValues] || ''
}

export const changeExamIndex = (status: string | undefined | null): string | undefined | null => {
  const statusValues = {
    null: '',
    Formato_unico_adultos: '0',
    Quimica_sanguinea_35: '1'
  }
  return statusValues[status as keyof typeof statusValues] || ''
}

export const changeExamIndexTable = (
  status: string | undefined | null
): string | undefined | null => {
  const statusValues = {
    null: '',
    Formato_unico_adultos: 'Formato único adultos',
    Quimica_sanguinea_35: 'Química sanguínea 35 elementos'
  }
  return statusValues[status as keyof typeof statusValues] || ''
}
