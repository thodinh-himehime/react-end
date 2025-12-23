import { format } from 'date-fns'

export const formatDate = (isoDate: string, pattern = 'dd/MM/yyyy HH:mm') => {
  if (!isoDate) return ''
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return ''
  return format(date, pattern)
}
