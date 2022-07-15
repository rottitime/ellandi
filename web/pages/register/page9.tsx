import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { fetchFunctions, Query } from '@/service/api'
import FunctionTypeForm from '@/components/Form/Register/FunctionTypeForm'

const page = 9

const RegisterPage = () => (
  <FunctionTypeForm
    backUrl={`/register/page${page - 1}`}
    onFormSubmit={(_data) => {
      router.push(`/register/page${page + 1}`)
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(Query.Functions, fetchFunctions)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <Page title="Function" progress={50}>
    {page}
  </Page>
)
