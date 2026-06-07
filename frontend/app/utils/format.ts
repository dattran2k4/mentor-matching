export const formatPrice = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value)

export const formatShortBookingDate = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit'
  }).format(new Date(value))

export const formatTimeRange = (startTime: string, endTime: string) => `${startTime} - ${endTime}`

export const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
