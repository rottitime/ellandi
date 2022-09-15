import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Alert, Box, CircularProgress, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { verifyEmail } from '@/service/auth'

const Preloader = styled(Box)`
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(p) => p.theme.spacing(3)};
`

const EmailVerifyPage = () => {
  const router = useRouter()
  const { code, user_id } = router.query
  const enabled = !!code && !!user_id

  const { isLoading, data, error } = useQuery<boolean, Error>(
    'verifyEmail',
    () => verifyEmail((user_id || '').toString(), (code || '').toString()),
    {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      enabled
    }
  )

  return (
    <>
      {isLoading && (
        <Preloader data-testid="page-loading">
          <CircularProgress />
          <Typography sx={{ mb: 4 }}>Please wait</Typography>
        </Preloader>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 3 }} data-testid="page-error">
          Error: {error.message}
        </Alert>
      )}

      {!!data && (
        <Box data-testid="page-success">
          <Typography>Success</Typography>
        </Box>
      )}
    </>
  )
}

export default EmailVerifyPage
EmailVerifyPage.getLayout = (page) => (
  <CardLayout title="Email Verify Page">{page}</CardLayout>
)
