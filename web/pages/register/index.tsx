import Page from '@/components/Layout/GenericPage'
import Highlight from '@/components/Highlight'
import { Box } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { ChevronRight } from '@mui/icons-material'

const RegisterPage = () => (
  <Box sx={{ textAlign: 'center' }}>
    <LinkButton
      href="/register/page3"
      endIcon={<ChevronRight />}
      variant="contained"
      sx={{ mb: 5 }}
    >
      Start now
    </LinkButton>
  </Box>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    showPromo={true}
    title={
      <>
        Registering takes around <Highlight newLine>5 - 10 minutes</Highlight>
      </>
    }
  >
    {page}
  </Page>
)
