import CardLayout from '@/components/Layout/CardLayout'
import { Typography } from '@mui/material'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import Button from '@/components/UI/Button/Button'
import router from 'next/router'

const nextPage = 9

const RegisterPage = () => (
  <>
    <Typography variant="subtitle1" gutterBottom>
      We're now going to ask you about your skills, including:
    </Typography>

    <ul>
      <li>your language skills</li>
      <li>other skills that you already have</li>
      <li>skills that you'd like to develop</li>
    </ul>

    <FooterButtons>
      <Button variant="outlined" size="small" onClick={() => router.back()}>
        Back
      </Button>
      <Button variant="contained" href={`/register/step/${nextPage}`}>
        Continue
      </Button>
    </FooterButtons>
  </>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout title="Thank you for completing your details" progress={70}>
    {page}
  </CardLayout>
)
