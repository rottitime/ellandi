import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Fade, Typography } from '@mui/material'
import Router from 'next/router'
import ResetPasswordForm from '@/components/Form/ResetPasswordForm/ResetPasswordForm'
import { useMutation } from 'react-query'
import { resetPasswordCode } from '@/service/auth'
import { ResetPasswordType } from '@/service/types'

const ResetPasswordPage = () => {
  const { isLoading, error, ...mutate } = useMutation<
    ResetPasswordType,
    Error,
    ResetPasswordType
  >((data) => resetPasswordCode(data), {
    onSuccess: async () => Router.push('/signin/reset/next')
  })

  return (
    <>
      <Typography sx={{ mb: 4 }}>
        Your password should have at least 8 characters and not include your name or email
        address
      </Typography>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            Error: {error.message}
          </Alert>
        </Fade>
      )}

      <ResetPasswordForm
        loading={isLoading}
        onFormSubmit={async (data) => mutate.mutate(data)}
      />
    </>
  )
}

export default ResetPasswordPage
ResetPasswordPage.getLayout = (page) => (
  <CardLayout title="Reset your password">{page}</CardLayout>
)
