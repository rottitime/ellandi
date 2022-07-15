import { SubmitHandler } from 'react-hook-form'

export type StandardRegisterProps<t> = {
  backUrl: string
  onFormSubmit: SubmitHandler<t>
  loading?: boolean
  defaultValues?: Record<string, unknown>
}
