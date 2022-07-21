import { SubmitHandler } from 'react-hook-form'

export type SignInType = { email: string; password: string }
export type Props = {
  onFormSubmit: SubmitHandler<SignInType>
  loading: boolean
}
