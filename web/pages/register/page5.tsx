import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm'

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
RegisterPage.getLayout = (page) => (
  <Page title="Your details" progress={20}>
    {page}
  </Page>
)
