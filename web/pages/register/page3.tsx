import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import CreateAccountForm from '@/components/Form/Register/CreateAccountForm'

const RegisterPage = () => (
  <CreateAccountForm
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page4')
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account" progress={5}>
    {page}
  </Page>
)
