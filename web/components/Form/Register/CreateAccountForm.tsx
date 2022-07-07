import { FC } from 'react'
import { Typography } from '@mui/material'
import { object, SchemaOf, string, ref } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import FormFooter from '../FormFooter'

type CreateAccountType = {
  email: string
  emailConfirm: string
  password: string
  passwordConfirm: string
}

type Props = {
  onFormSubmit: SubmitHandler<CreateAccountType>
}

const schema: SchemaOf<CreateAccountType> = object().shape({
  email: string().email().required(),
  emailConfirm: string()
    .oneOf([ref('email'), null], 'Does not match with email')
    .required('this is a required field'),

  password: string().min(8).max(20).required(),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Does not match with password')
    .required('this is a required field')
})

const CreateAccountForm: FC<Props> = ({ onFormSubmit }) => {
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

        <Typography variant="h3">Enter your email address</Typography>

        <TextFieldControlled name="email" label="Email address" />
        <TextFieldControlled name="emailConfirm" label="Confirm your email address" />

        <Typography variant="h3" gutterBottom>
          Create a password
        </Typography>

        <Typography gutterBottom>
          Your password should have at least 8 characters and not include your name or
          email address
        </Typography>

        <TextFieldControlled name="password" label="Password" type="password" />
        <TextFieldControlled
          name="passwordConfirm"
          label="Confirm your password"
          type="password"
        />

        <FormFooter backUrl="/register/page2" />
      </form>
    </FormProvider>
  )
}

export default CreateAccountForm
