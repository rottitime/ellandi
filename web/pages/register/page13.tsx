import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import Link from '@/components/UI/Link'
import SkillsForm from '@/components/Form/Register/SkillsForm'
import router from 'next/router'

const RegisterPage = () => {
  return (
    <SkillsForm
      onFormSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log({ data })
        router.push('/account')
      }}
    />
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page
    title="Create a profile - Your current skills"
    footer={
      <Typography gutterBottom>
        <Link href="/account">Skip this step</Link>
      </Typography>
    }
    progress={90}
  >
    {page}
  </Page>
)
