import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import LinkButton from '@/components/LinkButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Footer } from '@/components/Form/FormFooter'

const nextPage = 9

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

    <Footer>
      <LinkButton href={`/register/step/${nextPage - 1}`} variant="outlined">
        Back
      </LinkButton>
      <LinkButton href={`/register/step/${nextPage}`}>Continue</LinkButton>
    </Footer>
  </>
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
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
  </Page>
)
