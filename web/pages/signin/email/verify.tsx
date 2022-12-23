import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Box, Typography } from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { verifyEmail } from '@/service/auth'
import { AuthUser, Query, RegisterUserResponse } from '@/service/types'
import Router from 'next/router'
import getConfig from 'next/config'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'
import { isRegisterComplete } from '@/lib/profile-utils'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const isTokenInvalid = (message: string) => message.toLowerCase() === 'invalid token'

const EmailVerifyPage = () => {
  const router = useRouter()
  const { setToken, authFetch } = useAuth()
  const { setLoading } = useUiContext()
  const { code, user_id } = router.query
  const enabled = !!code && !!user_id

  useEffect(() => {
    setLoading(true)
    return () => setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { refetch } = useQuery<RegisterUserResponse>(Query.Me, () => authFetch(fetchMe), {
    enabled: false,
    onSuccess: (data) => {
      isRegisterComplete(data)
        ? Router.replace(urls.landingSignin)
        : Router.replace('/register/step/0/')
    }
  })

  const { error } = useQuery<AuthUser, Error>(
    Query.VerifyEmail,
    () => verifyEmail((user_id || '').toString(), (code || '').toString()),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled,
      onError: ({ message }) =>
        isTokenInvalid(message) &&
        Router.replace({
          pathname: urls.signin,
          query: { ecode: 4 }
        }),
      onSuccess: async ({ token }) => {
        setToken(token)
        await refetch()
      }
    }
  )

  if (error?.message && !isTokenInvalid(error.message)) {
    setLoading(false)
    return (
      <Box data-testid="page-error">
        <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
          {error.message}
        </Alert>
      </Box>
    )
  }
  return <Typography data-testid="page-loading">Please wait</Typography>
}

export default EmailVerifyPage
EmailVerifyPage.getLayout = (page) => (
  <CardLayout title="Confirming your email address" dark>
    {page}
  </CardLayout>
)
