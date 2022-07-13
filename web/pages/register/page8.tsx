import Page from '@/components/Layout/GenericPage'
import Link from '@/components/UI/Link'
import { Typography } from '@mui/material'
import router from 'next/router'
import ContractTypeForm from '@/components/Form/Register/ContractTypeForm'
import { dehydrate, QueryClient } from 'react-query'
import { fetchContractTypes } from '@/service/api'

const RegisterPage = () => (
  <ContractTypeForm
    backUrl="/register/page7"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page10')
    }}
  />
)

export default RegisterPage

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('contract-types', fetchContractTypes)
  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

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
