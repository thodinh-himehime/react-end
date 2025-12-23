import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import styles from './FormField.module.css'

interface FormTextareaProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: string
}

const FormTextarea = <T extends FieldValues>({ label, name, register, error, ...props }: FormTextareaProps<T>) => {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea className={styles.textarea} {...register(name)} {...props} />
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  )
}

export default FormTextarea
