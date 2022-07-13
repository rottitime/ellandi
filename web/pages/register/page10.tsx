import Page from '@/components/Layout/GenericPage'

import router from 'next/router'
import ContactForm from '@/components/Form/Register/ContactForm'

const RegisterPage = () => (
  <ContactForm
    backUrl="/register/page8"
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/thankyou')
    }}
  />
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Contact preference" progress={70}>
    {page}
  </Page>
)
