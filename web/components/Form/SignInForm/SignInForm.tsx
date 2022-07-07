import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string } from 'yup'
import FormFooter from '../FormFooter'

type SignInType = { email: string; password: string }
type Props = {
  onFormSubmit: SubmitHandler<SignInType>
}

const schema: SchemaOf<SignInType> = object().shape({
  email: string().email().required(),
  password: string().min(4).max(20).required()
})

const SignInForm: FC<Props> = ({ onFormSubmit }) => {
  const methods = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <TextFieldControlled
          name="email"
          type="email"
          label="Email address"
          placeholder="e.g. Joe.Bloggs@gmail.com"
        />

        <TextFieldControlled name="password" type="password" label="Password" />

        <FormFooter />
      </form>
    </FormProvider>
  )
}

export default SignInForm
