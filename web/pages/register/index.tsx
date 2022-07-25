import CardLayout from '@/components/Layout/CardLayout'
import { Box } from '@mui/material'
import LinkButton from '@/components/LinkButton'

//TODO: Convert all steps to single dynamic page

const RegisterPage = () => (
  <Box sx={{ textAlign: 'center' }}>
    <LinkButton href="/register/step/0" variant="contained" fullWidth sx={{ mt: 4 }}>
      Start now
    </LinkButton>
  </Box>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout
    showPromo={true}
    title={
      <>
        Registering takes around <br />5 - 10 minutes
      </>
    }
  >
    {page}
  </CardLayout>
)
