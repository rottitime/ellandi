import Page from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Typography } from '@mui/material'
import router from 'next/router'
import ContractForm from '@/components/Form/Register/ContractForm'

const RegisterPage = () => (
  <ContractForm
    backUrl="/register/page7"
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
    title="Contract type"
    footer={
      <Typography gutterBottom>
        <Link href="/register/page10">Skip this step</Link>
      </Typography>
    }
    progress={50}
  >
    {page}
  </Page>
)
