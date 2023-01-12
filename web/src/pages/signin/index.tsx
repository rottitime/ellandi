import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import Link from '@/components/UI/Link'
import { Alert, Fade, Typography } from '@mui/material'
import SignInForm from '@/components/Form/SignInForm/SignInForm'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const SigninPage = () => {
  const router = useRouter()
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()

  return (
    <>
      <Typography sx={{ mb: 4 }}>
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
          setFetching(true)

          try {
            await login(data)
            router.push({
              pathname: publicRuntimeConfig.urls.landingSignin
            })
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
SigninPage.getLayout = (page) => (
  <CardLayout title="Sign in" dark>
    {page}
  </CardLayout>
)
