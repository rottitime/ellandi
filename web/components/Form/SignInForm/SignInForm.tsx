import TextFieldControlled from '@/components/UI/TextFieldControlled/TextFieldControlled'
import { FC } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, object, string } from 'yup'
import Button from '@/components/UI/Button/Button'
import { Field } from '../Field/Field'
import { SignInType, Props } from './types'
import { Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

const schema: SchemaOf<SignInType> = object().shape({
  email: string()
    .email('Enter an email address in the correct format, like name@example.com')
    .required('This is a required field'),
  password: string().required('This is a required field')
})

const SignInForm: FC<Props> = ({ onFormSubmit, loading }) => {
  const methods = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onFormSubmit)}
        noValidate
        autoComplete="off"
        method="POST"
      >
        <Field>
          <TextFieldControlled name="email" type="email" label="Email address" />
        </Field>
        <Field>
          <TextFieldControlled name="password" type="password" label="Password" />
        </Field>

        <FooterButtons>
          <Typography sx={{ mt: 3 }} variant="body2">
            <Link href="/signin/forgotten-password">Forgotten your password?</Link>
          </Typography>

          <Button
            variant="contained"
            type="submit"
            loading={loading}
            size="large"
            data-testid="submit-button"
          >
            Continue
          </Button>
        </FooterButtons>
      </form>
    </FormProvider>
  )
}

export default SignInForm
