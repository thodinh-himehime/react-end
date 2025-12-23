import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'
import styles from './FormField.module.css'

interface FormInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  registerOptions?: RegisterOptions<T, Path<T>>
  error?: string
}

const FormInput = <T extends FieldValues>({
  label,
  name,
  register,
  registerOptions,
  error,
  ...props
}: FormInputProps<T>) => {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input className={styles.input} {...register(name, registerOptions)} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}

export default FormInput
