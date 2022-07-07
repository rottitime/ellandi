import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import ProfessionForm from '@/components/Form/Register/ProfessionForm'
import router from 'next/router'

const RegisterPage = () => (
  <ProfessionForm
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page8')
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page
    title="Create an account - Current profession"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page8">Skip this step</Link>
      </Typography>
    }
    progress={40}
  >
    {page}
  </Page>
)
