import { FC } from 'react'
import { Typography } from '@mui/material'
import { object, SchemaOf, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import FormFooter from '@/components/Form/FormFooter'
import { StandardRegisterProps } from './types'
import { Field } from '@/components/Form/Field'

type CreateAccountType = {
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
}
const minPassword = 8

const schema: SchemaOf<CreateAccountType> = object().shape({
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field'),
  emailConfirm: string()
    .oneOf([ref('email'), null], 'Does not match with email')
    .required('This is a required field'),

  password: string()
    .min(minPassword, `Password must be ${minPassword} characters or more`)
    .max(20)
    .required('This is a required field'),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Does not match with password')
    .required('This is a required field')
})

const CreateAccountForm: FC<StandardRegisterProps<CreateAccountType>> = ({
  backUrl,
  onFormSubmit,
  loading
}) => {
  const methods = useForm<CreateAccountType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1" gutterBottom>
          You need to create an account before using this service
        </Typography>

        <Typography variant="h4" gutterBottom>
          Enter your email address
        </Typography>
        <Field>
          <TextFieldControlled name="email" label="Email address" />
        </Field>
        <Field>
          <TextFieldControlled name="emailConfirm" label="Confirm your email address" />
        </Field>

        <Typography variant="h4" gutterBottom>
          Create a password
        </Typography>

        <Typography gutterBottom>
          Your password should have at least {minPassword} characters and not include your
          name or email address
        </Typography>

        <Field>
          <TextFieldControlled name="password" label="Password" type="password" />
        </Field>
        <Field>
          <TextFieldControlled
            name="passwordConfirm"
            label="Confirm your password"
            type="password"
          />
        </Field>

        <FormFooter backUrl={backUrl} buttonProps={{ loading }} />
      </form>
    </FormProvider>
  )
}

export default CreateAccountForm