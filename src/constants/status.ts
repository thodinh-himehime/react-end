export const PRODUCT_STATUS = {
  active: 'active',
  inactive: 'inactive',
} as const

export const ORDER_STATUS = {
  pending: 'pending',
  processing: 'processing',
  completed: 'completed',
  cancelled: 'cancelled',
} as const

export const PRODUCT_STATUS_LABELS: Record<string, string> = {
  [PRODUCT_STATUS.active]: 'Active',
  [PRODUCT_STATUS.inactive]: 'Inactive',
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
  [ORDER_STATUS.pending]: 'Pending',
  [ORDER_STATUS.processing]: 'Processing',
  [ORDER_STATUS.completed]: 'Completed',
  [ORDER_STATUS.cancelled]: 'Cancelled',
}
