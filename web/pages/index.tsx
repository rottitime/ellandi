import GenericPage from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Alert, Fade, Typography } from '@mui/material'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import { loginWithEmailAndPassword } from '@/service/auth'
import router from 'next/router'
import { useState } from 'react'

const SigninPage = () => {
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        If this is the first time you have used this website, you will need to{' '}
        <Link href="/register/invite">create an account</Link>.
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
          console.log({ data })
          setFetching(true)

          try {
            const res = await loginWithEmailAndPassword(data)
            sessionStorage.setItem('token', res.token)
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
SigninPage.getLayout = (page) => <GenericPage title="Sign in">{page}</GenericPage>
