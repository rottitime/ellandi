import GenericPage from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Button, Typography } from '@mui/material'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import { SchemaOf, object, string } from 'yup'
import { useRouter } from 'next/router'
import FormFooter from '@/components/Form/FormFooter'

type SignInType = { email: string; password: string }

const schema: SchemaOf<SignInType> = object().shape({
  email: string().email().required(),
  password: string().min(4).max(20).required()
})

const SigninPage = () => {
  const router = useRouter()

  const methods = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(schema)
  })

  const onFormSubmit: SubmitHandler<SignInType> = (data) => {
    // eslint-disable-next-line no-console
    console.log({ data })
    router.push('/account')
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onFormSubmit)} noValidate>
        <Typography variant="subtitle1">
          If this is the first time you have used this website, you will need to{' '}
          <Link href="/register">create an account</Link>.
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
