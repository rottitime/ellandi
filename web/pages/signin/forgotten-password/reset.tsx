import ResetPasswordForm from '@/components/Form/ResetPasswordForm/ResetPasswordForm'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { FormData } from '@/components/Form/ResetPasswordForm/types'
import { Alert, Fade, Typography } from '@mui/material'
import Router, { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { isValidUserToken, resetUpdatePassword } from '@/service/auth'
import { Query, ValidUserToken } from '@/service/types'
import { useEffect } from 'react'
import getConfig from 'next/config'
import ContentSkeleton from '@/components/UI/Skeleton/ContentSkeleton'
import { useUiContext } from '@/context/UiContext'

const {
  publicRuntimeConfig: { urls }
} = getConfig()

const ResetPasswordPage = () => {
  const router = useRouter()
  const { code, user_id } = router.query
  const { setLoading } = useUiContext()

  const { isLoading, isSuccess, data } = useQuery<ValidUserToken, Error>(
    [Query.ValidUserToken, user_id, code],
    () => isValidUserToken(user_id as string, code as string, 'password-reset'),
    {
      staleTime: Infinity,
      enabled: !!router.isReady && !!code && !!user_id,
      onSuccess: ({ valid }) => {
        if (!valid) redirectWithError()
      },
      onError: () => redirectWithError()
    }
  )

  useEffect(() => {
    setLoading(isLoading)
    return () => {
      setLoading(false)
    }
  }, [isLoading, setLoading])

  useEffect(() => {
    if (!!router.isReady && !code && !user_id) redirectWithError()
  }, [code, router.isReady, user_id])

  const {
    isLoading: isMutating,
    error,
    ...mutate
  } = useMutation<boolean, Error, FormData>(
    ({ new_password }) =>
      resetUpdatePassword({ new_password }, user_id.toString(), code.toString()),
    {
      onSuccess: async () => Router.push('/signin/forgotten-password/complete')
    }
  )

  const redirectWithError = () =>
    Router.push({
      pathname: urls.signin,
      query: { ecode: 4 }
    })

  if (!!isSuccess && !!data.valid)
    return (
      <>
        <Typography sx={{ mb: 4 }}>
          Your password should have at least 8 characters and not include your name or
          email address
        </Typography>

        {error && (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
              {error.message}
            </Alert>
          </Fade>
        )}

        <ResetPasswordForm
          loading={isMutating}
          onFormSubmit={async (data) => mutate.mutate(data)}
        />
      </>
    )

  return <ContentSkeleton />
}

export default ResetPasswordPage
ResetPasswordPage.getLayout = (page) => (
  <CardLayout title="Reset your password" dark>
    {page}
  </CardLayout>
)
