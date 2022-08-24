import { SubmitHandler } from 'react-hook-form'

export type FormData = { email: string }
export type Props = {
  onFormSubmit: SubmitHandler<FormData>
  loading: boolean
}
