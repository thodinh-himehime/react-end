import type { ChangeEvent } from 'react'
import { ORDER_STATUS } from '../../constants/status'

interface StatusUpdateDropdownProps {
  status: string
  onUpdate: (status: string) => void
}

const StatusUpdateDropdown = ({ status, onUpdate }: StatusUpdateDropdownProps) => {
  const options: Record<string, string[]> = {
    [ORDER_STATUS.pending]: [ORDER_STATUS.processing, ORDER_STATUS.cancelled],
    [ORDER_STATUS.processing]: [ORDER_STATUS.completed, ORDER_STATUS.cancelled],
    [ORDER_STATUS.completed]: [],
    [ORDER_STATUS.cancelled]: [],
  }

  const nextOptions = options[status] ?? []

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!event.target.value) return
    onUpdate(event.target.value)
  }

  return (
    <select value="" onChange={handleChange} disabled={!nextOptions.length}>
      <option value="">Update status</option>
      {nextOptions.map((next) => (
        <option key={next} value={next}>
          {next}
        </option>
      ))}
    </select>
  )
}

export default StatusUpdateDropdown
