import CardLayout from '@/components/Layout/CardLayout'
import Link from '@/components/UI/Link'
import { Alert, Fade, Typography } from '@mui/material'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import router from 'next/router'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'

const SigninPage = () => {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()

  return (
    <>
      <Typography gutterBottom>
        If this is the first time you have used this website, you will need to{' '}
        <Link href="/register">create an account</Link>.
      </Typography>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            {error}
          </Alert>
        </Fade>
      )}

      <SignInForm
        loading={fetching}
        onFormSubmit={async (data) => {
          // eslint-disable-next-line no-console
          setFetching(true)

          try {
            await login(data)
            router.push('/account')
          } catch (err) {
            setError(err.message)
          }

          setFetching(false)
        }}
      />
    </>
  )
}

export default SigninPage
SigninPage.getLayout = (page) => <CardLayout title="Sign in">{page}</CardLayout>
