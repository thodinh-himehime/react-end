import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import styles from './FormField.module.css'

interface FormSelectProps<T extends FieldValues> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: string
}

const FormSelect = <T extends FieldValues>({
  label,
  name,
  register,
  error,
  children,
  ...props
}: FormSelectProps<T>) => {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <select className={styles.select} {...register(name)} {...props}>
        {children}
      </select>
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}

export default FormSelect
