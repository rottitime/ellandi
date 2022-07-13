import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { fetchFunctions } from '@/service/api'
import FunctionForm from '@/components/Form/Register/FunctionForm'

const RegisterPage = () => (
  <FunctionForm
    backUrl="/register/page5"
    onFormSubmit={(_data) => {
      router.push('/register/page8')
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('functions', fetchFunctions)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <Page title="Function" progress={30}>
    {page}
  </Page>
)
