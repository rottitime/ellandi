import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import CvForm from '@/components/Form/Register/CvForm'
import router from 'next/router'

const RegisterPage = () => (
  <CvForm
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page10')
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page
    title="Create an account - Upload your CV"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page10">Skip this step</Link>
      </Typography>
    }
    progress={60}
  >
    {page}
  </Page>
)
