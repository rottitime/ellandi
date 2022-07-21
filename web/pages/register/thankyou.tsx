import CardLayout from '@/components/Layout/CardLayout'
import { Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'

const RegisterPage = () => (
  <>
    <Typography variant="h3" gutterBottom>
      We're now going to ask you about your skills, including:
    </Typography>

    <ul>
      <li>your language skills</li>
      <li>other skills that you already have</li>
      <li>skills that you'd like to develop</li>
    </ul>

    <FooterButtons>
      <LinkButton href="/register/page10" variant="outlined">
        Back
      </LinkButton>
      <LinkButton href="/register/page12">Continue</LinkButton>
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
        Thank you for completing your details
      </>
    }
    progress={70}
  >
    {page}
  </CardLayout>
)
