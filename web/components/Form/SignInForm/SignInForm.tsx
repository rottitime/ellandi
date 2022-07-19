import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string } from 'yup'
import FormFooter from '../FormFooter'
import { Divider } from '@mui/material'
import { Field } from '../Field'

export type SignInType = { email: string; password: string }
type Props = {
  onFormSubmit: SubmitHandler<SignInType>
  loading: boolean
}

const schema: SchemaOf<SignInType> = object().shape({
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field'),
  password: string().max(20).required('This is a required field')
})

const SignInForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Divider variant="middle" sx={{ my: 3 }}>
          OR
        </Divider>

        <Field>
          <TextFieldControlled
            name="email"
            type="email"
            label="Email address"
            placeholder="e.g. Joe.Bloggs@gmail.com"
          />
        </Field>
        <Field>
          <TextFieldControlled name="password" type="password" label="Password" />
        </Field>

        <FormFooter buttonProps={{ loading, fullWidth: true }} submitText="Sign in" />
      </form>
    </FormProvider>
  )
}

export default SignInForm