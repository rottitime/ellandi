import { SubmitHandler } from 'react-hook-form'

export type FormData = { password: string; passwordConfirm: string }
export type Props = {
  onFormSubmit: SubmitHandler<FormData>
  loading: boolean
}
