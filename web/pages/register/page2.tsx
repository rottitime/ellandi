import Page from '@/components/GenericPage2'
import Highlight from '@/components/Highlight'
import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import { useRouter } from 'next/router'

const RegisterPage = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <Page
      title={
        <>
          Register in just <Highlight>10 minutes</Highlight>
        </>
      }
    >
      <Box sx={{ textAlign: 'center' }}>
        <LoadingButton
          onClick={() => {
            setLoading(true)
            setTimeout(() => {
              router.push('/register/page3')
            }, 3000)
          }}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          fullWidth
          sx={{ mb: 5, maxWidth: '200px' }}
        >
          Start now
        </LoadingButton>
      </Box>
      <Typography variant="h3" gutterBottom>
        Before you start
      </Typography>
      <Typography gutterBottom>
        You'll be asked to upload your CV. If you don't have a CV available you can add
        one later by going to your Profile.
      </Typography>
    </Page>
  )
}

export default RegisterPage
