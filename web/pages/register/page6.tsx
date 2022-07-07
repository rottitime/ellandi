import Link from '@/components/UI/Link'
import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'

import GradeForm from '@/components/Form/Register/GradeForm'
import { useRouter } from 'next/router'

const RegisterPage = () => {
  const router = useRouter()

  return (
    <GradeForm
      onFormSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log({ data })
        router.push('/register/page7')
      }}
    />
  )
}

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page
    title="Create a profile - Grade"
    footer={
      <Typography>
        <Link href="/register/page7">Skip this step</Link>
      </Typography>
    }
    progress={30}
  >
    {page}
  </Page>
)
