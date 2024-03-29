import { SubmitHandler } from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StandardRegisterProps<T, I = any> = {
  backUrl?: string
  onFormSubmit: SubmitHandler<T>
  skipUrl?: string
  buttonLoading?: boolean
  defaultValues?: T & I
  onCancel?: () => void
}
