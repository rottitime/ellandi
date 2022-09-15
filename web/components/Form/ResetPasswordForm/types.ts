import { SubmitHandler } from 'react-hook-form'

export type FormData = { new_password: string; new_password_confirm: string }
export type Props = {
  onFormSubmit: SubmitHandler<FormData>
  loading: boolean
}
