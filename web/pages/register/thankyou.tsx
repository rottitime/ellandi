import CardLayout from '@/components/Layout/CardLayout/CardLayout'
import { Typography } from '@mui/material'
import FooterButtons from '@/components/UI/FooterButtons/FooterButtons'
import Button from '@/components/UI/Button/Button'
import router from 'next/router'

const nextPage = 8

const RegisterPage = () => (
  <>
    <Typography variant="subtitle1" sx={{ mb: 3 }}>
      We're now going to ask you about your skills, including:
    </Typography>

    <ul>
      <li>your language skills</li>
      <li>other skills that you already have</li>
      <li>skills that you would like to develop</li>
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
  <CardLayout title="Thank you for completing your details">{page}</CardLayout>
)
