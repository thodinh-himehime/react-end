import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { Product } from '../../api/productsApi'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'
import styles from './ProductForm.module.css'

const schema = yup.object({
  name: yup.string().trim().required('Name is required').max(100, 'Max 100 characters'),
  description: yup.string().required('Description is required').min(10).max(500),
  price: yup.number().typeError('Price is required').min(0.01).max(999999).required(),
  stock: yup.number().typeError('Stock is required').integer('Stock must be an integer').min(0).required(),
  imageUrl: yup.string().url('Must be a valid URL').required('Image URL is required'),
  status: yup.string().oneOf(['active', 'inactive']).required(),
})

export type ProductFormValues = yup.InferType<typeof schema>

interface ProductFormProps {
  defaultValues?: Partial<Product>
  onSubmit: (data: ProductFormValues) => void
  isSubmitting: boolean
}

const ProductForm = ({ defaultValues, onSubmit, isSubmitting }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<ProductFormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      status: 'active',
      ...defaultValues,
    },
  })

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name ?? '',
        description: defaultValues.description ?? '',
        price: defaultValues.price ?? 0,
        stock: defaultValues.stock ?? 0,
        imageUrl: defaultValues.imageUrl ?? '',
        status: defaultValues.status ?? 'active',
      })
    }
  }, [defaultValues, reset])

  const imageUrl = watch('imageUrl')

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <FormInput<ProductFormValues> label="Name" name="name" register={register} error={errors.name?.message} />
      <FormTextarea<ProductFormValues>
        label="Description"
        name="description"
        register={register}
        error={errors.description?.message}
      />
      <FormInput
        label="Price"
        name="price"
        type="number"
        step="0.01"
        register={register}
        registerOptions={{ valueAsNumber: true }}
        error={errors.price?.message}
      />
      <FormInput
        label="Stock"
        name="stock"
        type="number"
        register={register}
        registerOptions={{ valueAsNumber: true }}
        error={errors.stock?.message}
      />
      <FormInput<ProductFormValues>
        label="Image URL"
        name="imageUrl"
        register={register}
        error={errors.imageUrl?.message}
      />
      {imageUrl ? <img className={styles.preview} src={imageUrl} alt="Preview" /> : null}
      <FormSelect<ProductFormValues> label="Status" name="status" register={register} error={errors.status?.message}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </FormSelect>
      <button className={styles.submit} type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}

export default ProductForm
