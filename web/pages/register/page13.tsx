import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import SkillsForm from '@/components/Form/Register/SkillsForm'
import router from 'next/router'

const page = 13

const RegisterPage = () => {
  return (
    <SkillsForm
      backUrl={`/register/page${page - 1}`}
      onFormSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log({ data })
        router.push('/register/complete')
      }}
    />
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title="Current skills"
    footer={
      <Typography gutterBottom>
        <Link href="/register/complete">Skip this step</Link>
      </Typography>
    }
    progress={90}
  >
    {page}
  </Page>
)
