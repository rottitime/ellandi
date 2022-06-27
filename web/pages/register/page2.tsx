import Page from '@/components/GenericPage2'
import Highlight from '@/components/Highlight'
import LinkButton from '@/components/LinkButton'
import { Box, Typography } from '@mui/material'

const RegisterPage = () => (
  <Page
    title={
      <>
        Register in just <Highlight>10 minutes</Highlight>
      </>
    }
  >
    <Box sx={{ textAlign: 'center' }}>
      <LinkButton href="/register/page3" fullWidth sx={{ mb: 5, maxWidth: '200px' }}>
        Start now
      </LinkButton>
    </Box>
    <Typography variant="h3" gutterBottom>
      Before you start
    </Typography>
    <Typography gutterBottom>
      You'll be asked to upload your CV. If you don't have a CV available you can add one
      later by going to your Profile.
    </Typography>
  </Page>
)

export default RegisterPage
