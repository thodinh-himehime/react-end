export const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export const validatePrice = (value: number) => {
  if (Number.isNaN(value)) return false
  if (value < 0.01 || value > 999999) return false
  const decimalPlaces = value.toString().split('.')[1]?.length ?? 0
  return decimalPlaces <= 2
}
