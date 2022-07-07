import Page from '@/components/Layout/GenericPage'
import { useRouter } from 'next/router'
import RegisterDetailsForm from '@/components/Form/Register/RegisterDetailsForm'

const RegisterPage = () => {
  const router = useRouter()
  return (
    <RegisterDetailsForm
      onFormSubmit={(data) => {
        // eslint-disable-next-line no-console
        console.log({ data })
        router.push('/register/page6')
      }}
    />
  )
}

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <Page title="Create an account - Your details" progress={20}>
    {page}
  </Page>
)
