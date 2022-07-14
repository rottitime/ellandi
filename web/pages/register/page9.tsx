import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { fetchFunctions } from '@/service/api'
import FunctionTypeForm from '@/components/Form/Register/FunctionTypeForm'

const RegisterPage = () => (
  <FunctionTypeForm
    backUrl="/register/page8"
    onFormSubmit={(_data) => {
      router.push('/register/page10')
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
  <Page title="Function" progress={50}>
    {page}
  </Page>
)
