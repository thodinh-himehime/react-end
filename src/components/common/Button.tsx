import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}

const Button = ({ isLoading, variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  )
}

export default Button
