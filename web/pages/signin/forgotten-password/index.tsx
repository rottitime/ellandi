import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Fade, Typography } from '@mui/material'
import Router from 'next/router'
import ForgottenPasswordForm from '@/components/Form/ForgottenPasswordForm/ForgottenPasswordForm'
import { useMutation } from 'react-query'
import { resetEmailPassword } from '@/service/auth'
import { ResetEmailPasswordType } from '@/service/types'

const ForgottenPasswordPage = () => {
  const { isLoading, error, ...mutate } = useMutation<
    ResetEmailPasswordType,
    Error,
    ResetEmailPasswordType
  >((data) => resetEmailPassword(data), {
    onSuccess: async () => Router.push('/signin/reset/next')
  })

  return (
    <>
      <Typography sx={{ mb: 4 }}>
        Please enter your email address. You will receive a notification on how to create
        a new password.
      </Typography>

      {error && (
        <Fade in={!!error}>
          <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
            Error: {error.message}
          </Alert>
        </Fade>
      )}

      <ForgottenPasswordForm
        loading={isLoading}
        onFormSubmit={async (data) => mutate.mutate(data)}
      />
    </>
  )
}

export default ForgottenPasswordPage
ForgottenPasswordPage.getLayout = (page) => (
  <CardLayout title="Reset your password">{page}</CardLayout>
)
