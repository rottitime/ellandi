import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import PrivacyForm from '@/components/Form/Register/PrivacyForm'

const page = 4

const RegisterPage = () => (
  <PrivacyForm
    backUrl={`/register/page${page - 1}`}
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push(`/register/page${page + 1}`)
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Privacy policy" progress={10}>
    {page}
  </Page>
)
