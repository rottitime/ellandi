import ResetPasswordForm from '@/components/Form/ResetPasswordForm/ResetPasswordForm'
import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { FormData } from '@/components/Form/ResetPasswordForm/types'
import { Alert, Fade, Typography } from '@mui/material'
import Router, { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { resetUpdatePassword } from '@/service/auth'
import { ResetUpdatePasswordType } from '@/service/types'

const ResetPasswordPage = () => {
  const router = useRouter()
  const { code } = router.query
  const { isLoading, error, ...mutate } = useMutation<
    ResetUpdatePasswordType,
    Error,
    FormData
  >(({ password }) => resetUpdatePassword({ password, resetcode: code.toString() }), {
    onSuccess: async () => Router.push('/signin/reset/complete')
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
