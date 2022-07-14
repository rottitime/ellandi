import Link from '@/components/UI/Link'
import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import GradeForm from '@/components/Form/Register/GradeForm'
import router from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { fetchGrades } from '@/service/api'

const RegisterPage = () => (
  <GradeForm
    backUrl="/register/page5"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page7')
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('grades', fetchGrades)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <Page
    title="Grade"
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
