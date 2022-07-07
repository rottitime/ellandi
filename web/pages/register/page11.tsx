import Page, { FormFooter } from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const RegisterPage = () => {
  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        We're now going to ask you about your skills, including:
      </Typography>

      <ul>
        <li>Your language skills</li>
        <li>Other skills that you already have</li>
        <li>Skills that you'd like to develop</li>
      </ul>

      <FormFooter>
        <LinkButton href="/register/page10" variant="outlined">
          Back
        </LinkButton>

        <LinkButton href="/register/page12">Continue</LinkButton>
      </FormFooter>
    </>
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title={
      <>
        <CheckCircleIcon sx={{ display: 'block', margin: '0 auto', fontSize: '60px' }} />
        Thank you for completing your details
      </>
    }
    progress={70}
  >
    {page}
  </Page>
)
