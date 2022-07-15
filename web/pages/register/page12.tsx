import Link from '@/components/UI/Link'
import Page from '@/components/Layout/GenericPage'
import { Typography } from '@mui/material'
import LanguageForm from '@/components/Form/Register/LanguageForm'
import router from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { fetchLanguages, Query } from '@/service/api'

const page = 12

const RegisterPage = () => (
  <LanguageForm
    backUrl={`/register/page${page - 1}`}
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push(`/register/page${page + 1}`)
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(Query.Languages, fetchLanguages)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <Page
    title="Language skills"
    footer={
      <Typography gutterBottom>
        <Link href={`/register/page${page + 1}`}>Skip this step</Link>
      </Typography>
    }
    progress={80}
  >
    {page}
  </Page>
)
