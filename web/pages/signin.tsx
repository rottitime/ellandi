import GenericPage from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Typography } from '@mui/material'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import router from 'next/router'

const SigninPage = () => {
  return (
    <>
      <Typography variant="subtitle1">
        If this is the first time you have used this website, you will need to{' '}
        <Link href="/register">create an account</Link>.
      </Typography>

      <SignInForm
        onFormSubmit={(data) => {
          // eslint-disable-next-line no-console
          console.log({ data })
          router.push('/account')
        }}
      />
    </>
  )
}

export default SigninPage
SigninPage.getLayout = (page) => <GenericPage title="Sign in">{page}</GenericPage>
