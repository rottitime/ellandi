import GenericPage, { FormFooter } from '@/components/GenericPage'
import Link from '@/components/UI/Link'
import { Button, Typography } from '@mui/material'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import { SignInType } from '@/components/Form/SignInForm/types'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required()
})

const SigninPage = () => {
  const methods = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  // console.log('watch variable email', methods.watch('email'))

  const onFormSubmit: SubmitHandler<SignInType> = (data) => {
    console.log({ data })
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1">
          If this is the first time you have used this website, you will need to{' '}
          <Link href="/">create an account</Link>.
        </Typography>

        <SignInForm />

        <FormFooter>
          <Button variant="contained" type="submit">
            Continue
          </Button>
        </FormFooter>
      </form>
    </FormProvider>
  )
}

export default SigninPage
SigninPage.getLayout = (page) => <GenericPage title="Sign in">{page}</GenericPage>
