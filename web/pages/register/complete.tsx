import CardLayout from '@/components/Layout/CardLayout'
import { Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

const RegisterPage = () => (
  <>
    <Typography variant="subtitle1" gutterBottom>
      You will now be taken to your dashboard where you can navigate around the service
    </Typography>

    <FooterButtons>
      <LinkButton href="/account" fullWidth>
        Continue
      </LinkButton>
    </FooterButtons>
  </>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout
    title={
      <>
        <CheckCircleIcon
          sx={{ display: 'block', margin: '0 auto', fontSize: '60px', color: '#44D600' }}
        />
        Congratulations You are signed up for Civil Service Skills and Learning
      </>
    }
  >
    {page}
  </CardLayout>
)
