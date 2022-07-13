import Page from '@/components/Layout/GenericPage'
import { Box } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import { ChevronRight } from '@mui/icons-material'

//TODO: Convert all steps to single dynamic page

const RegisterPage = () => (
  <Box sx={{ textAlign: 'center' }}>
    <LinkButton
      href="/register/page3"
      endIcon={<ChevronRight />}
      variant="contained"
      sx={{ mt: 4 }}
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
        Registering takes around <br />5 - 10 minutes
      </>
    }
  >
    {page}
  </Page>
)
