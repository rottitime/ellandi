import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import PrivacyForm from '@/components/Form/Register/PrivacyForm'

const RegisterPage = () => (
  <PrivacyForm
    backUrl="/register/page3"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/page5')
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Privacy policy" progress={10}>
    {page}
  </Page>
)
