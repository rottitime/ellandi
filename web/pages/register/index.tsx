import CardLayout from '@/components/Layout/CardLayout'
import { Box } from '@mui/material'
import Button from '@/components/UI/Button/Button'

const RegisterPage = () => (
  <Box sx={{ textAlign: 'center' }}>
    <Button href="/register/step/0" variant="contained" fullWidth sx={{ mt: 4 }}>
      Start now
    </Button>
  </Box>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout showPromo={true} title="Registering takes around 5 - 10 minutes">
    {page}
  </CardLayout>
)
