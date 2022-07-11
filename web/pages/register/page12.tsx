import Link from '@/components/UI/Link'
import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import LanguageForm from '@/components/Form/Register/LanguageForm'
import router from 'next/router'

const RegisterPage = () => (
  <LanguageForm
    backUrl="/register/thankyou"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page13')
    }}
  />
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title="Language skills"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page13">Skip this step</Link>
      </Typography>
    }
    progress={80}
  >
    {page}
  </Page>
)
