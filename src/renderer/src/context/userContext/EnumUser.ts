export const changeRole = (role: string | undefined | null): string | undefined | null => {
  const statusValues = {
    null: '',
    Admin: '0',
    Receptionist: '1'
  }
  return statusValues[role as keyof typeof statusValues] || ''
}
