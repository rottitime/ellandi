import { FC, useEffect } from 'react'
import { Typography } from '@mui/material'
import { object, SchemaOf, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { StandardRegisterProps } from '@/components/Form/Register/types'
import { Field } from '@/components/Form/Field/Field'
import { CreateAccountType } from './types'
import useAuth from '@/hooks/useAuth'
import Form from '@/components/Form/Register/FormRegister/FormRegister'

const minPassword = 8
const defaultValues = { email: '', password: '', emailConfirm: '', passwordConfirm: '' }

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

const CreateAccountForm: FC<StandardRegisterProps<CreateAccountType>> = (props) => {
  const { logout, hasToken } = useAuth()

  useEffect(() => {
    hasToken() && logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const methods = useForm<CreateAccountType>({
    defaultValues,
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} defaultValues={defaultValues}>
        <Typography variant="subtitle1" gutterBottom>
          You need to create an account before using this service
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
          Email address
        </Typography>
        <Field>
          <TextFieldControlled name="email" label="Email address" />
        </Field>
        <Field>
          <TextFieldControlled name="emailConfirm" label="Confirm your email address" />
        </Field>

        <Typography variant="subtitle1" gutterBottom>
          Create password
        </Typography>

        <Typography gutterBottom>
          Your password should have at least {minPassword} characters and not include your
          name or email address
        </Typography>

        <Field>
          <TextFieldControlled name="password" label="Password" type="password" />
        </Field>
        <Field noMargin>
          <TextFieldControlled
            name="passwordConfirm"
            label="Confirm your password"
            type="password"
          />
        </Field>
      </Form>
    </FormProvider>
  )
}

export default CreateAccountForm
