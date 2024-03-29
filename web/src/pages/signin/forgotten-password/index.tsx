import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Fade, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import ForgottenPasswordForm from '@/components/Form/ForgottenPasswordForm/ForgottenPasswordForm'
import { useMutation } from '@tanstack/react-query'
import { resetEmailPassword } from '@/service/auth'
import { ResetEmailPasswordType } from '@/service/types'

const ForgottenPasswordPage = () => {
  const router = useRouter()
  const { isLoading, error, ...mutate } = useMutation<
    boolean,
    Error,
    ResetEmailPasswordType
  >((data) => resetEmailPassword(data), {
    onSuccess: async () =>
      router.push({
        pathname: '/signin/forgotten-password/next'
      })
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
  <CardLayout title="Reset your password" dark>
    {page}
  </CardLayout>
)
