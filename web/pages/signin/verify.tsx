import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Typography } from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { verifyEmail } from '@/service/auth'
import { AuthUser, Query, RegisterUserResponse } from '@/service/types'
import Router from 'next/router'
import getConfig from 'next/config'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { fetchMe } from '@/service/me'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const isRegisterComplete = (d: RegisterUserResponse): boolean =>
  !!d.first_name &&
  !!d.last_name &&
  !!d.job_title &&
  !!d.business_unit &&
  !!d.location &&
  !!d.line_manager_email &&
  !!(d.grade || d.grade_other) &&
  !!(d.function || d.function_other) &&
  !!(d.contract_type || d.contract_type_other) &&
  !!d.primary_profession &&
  typeof d.contact_preference === 'boolean' &&
  !!d.skills.length

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
    'verify-email',
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

  if (error?.message && !isTokenInvalid(error.message))
    return (
      <Alert severity="error" sx={{ mt: 3, mb: 3 }} data-testid="page-error">
        {error.message}
      </Alert>
    )
  return <Typography data-testid="page-loading">Please wait</Typography>
}

export default EmailVerifyPage
EmailVerifyPage.getLayout = (page) => (
  <CardLayout title="Confirming your email address" dark>
    {page}
  </CardLayout>
)
