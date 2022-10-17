import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Box, CircularProgress, Typography, styled } from '@mui/material'
import { useUiContext } from '@/context/UiContext'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { verifyEmail } from '@/service/auth'
import { Query, RegisterUserResponse } from '@/service/types'
import Router from 'next/router'
import getConfig from 'next/config'
import { useEffect } from 'react'

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
  !!(typeof d.contact_preference === 'boolean')

const EmailVerifyPage = () => {
  const router = useRouter()
  const { setLoading } = useUiContext()
  const { code, user_id } = router.query
  const enabled = !!code && !!user_id

  setLoading(true)

  useEffect(() => {
    setLoading(true)
    return () => setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { isLoading, data, error } = useQuery<RegisterUserResponse, Error>(
    Query.Me,
    () => verifyEmail((user_id || '').toString(), (code || '').toString()),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled,
      onError: () => {
        Router.replace({
          pathname: urls.signin,
          query: { ecode: 4 }
        })
      },
      onSuccess: (data) => {
        Router.replace(urls.signin)
      }
    }
  )

  return (
    <>
      {error && <Box data-testid="page-error" />}
      {!!data?.id && <Box data-testid="page-success" />}
    </>
  )
}

export default EmailVerifyPage
EmailVerifyPage.getLayout = (page) => (
  <CardLayout title="Confirming your email address" dark>
    {page}
  </CardLayout>
)
