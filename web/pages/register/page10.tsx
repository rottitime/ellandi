import Page from '@/components/Layout/GenericPage'

import router from 'next/router'
import ContractType from '@/components/Form/Register/ContractType'

const RegisterPage = () => (
  <ContractType
    backUrl="/register/page9"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/thankyou')
    }}
  />
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Current contract type" progress={70}>
    {page}
  </Page>
)
