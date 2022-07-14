import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm'
import { dehydrate, QueryClient } from 'react-query'
import { fetchCountries } from '@/service/api'

const RegisterPage = () => (
  <RegisterDetailsForm
    backUrl="/register/page4"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page6')
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('countries', fetchCountries)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

RegisterPage.getLayout = (page) => (
  <Page title="Your details" progress={20}>
    {page}
  </Page>
)
