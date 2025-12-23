import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { AUTH_CREDENTIALS } from '../../constants/auth'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import styles from './Login.module.css'

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  remember: yup.boolean().required(),
})

type LoginFormValues = yup.InferType<typeof schema>

const LoginPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsSubmitting(true)
    setError('')
    await new Promise((resolve) => setTimeout(resolve, 400))

    if (data.email === AUTH_CREDENTIALS.email && data.password === AUTH_CREDENTIALS.password) {
      login({ email: data.email }, data.remember)
      const destination = (location.state as { from?: { pathname: string } })?.from?.pathname ?? ROUTES.dashboard
      navigate(destination)
    } else {
      setError('Invalid email or password.')
    }
    setIsSubmitting(false)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <label className={styles.remember}>
          <input type="checkbox" {...register('remember')} />
          Remember me
        </label>
        {error ? <div className={styles.error}>{error}</div> : null}
        <Button type="submit" disabled={!isValid || isSubmitting} isLoading={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default LoginPage
