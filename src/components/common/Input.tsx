import { forwardRef } from 'react'
import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input ref={ref} className={styles.input} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
})

Input.displayName = 'Input'

export default Input
