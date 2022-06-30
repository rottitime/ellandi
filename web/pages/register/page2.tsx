import Page from '@/components/GenericPage'
import Highlight from '@/components/Highlight'
import { Box, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import LinkButton from '@/components/LinkButton'

const RegisterPage = () => {
  return (
    <>
      <Box sx={{ textAlign: 'center' }}>
        <LinkButton
          href="/register/page3"
          endIcon={<SendIcon />}
          variant="contained"
          fullWidth
          sx={{ mb: 5, maxWidth: '200px' }}
        >
          Start now
        </LinkButton>
      </Box>
      <Typography variant="h3" gutterBottom>
        Before you start
      </Typography>
      <Typography gutterBottom>
        You'll be asked to upload your CV. If you don't have a CV available you can add
        one later by going to your Profile.
      </Typography>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title={
      <>
        Register in just <Highlight>10 minutes</Highlight>
      </>
    }
  >
    {page}
  </Page>
)
