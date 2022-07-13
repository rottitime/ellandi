import Page from '@/components/Layout/GenericPage'
import router from 'next/router'
import PrimaryProfessionForm from '@/components/Form/Register/PrimaryProfessionForm'

const RegisterPage = () => (
  <PrimaryProfessionForm
    backUrl="/register/page7"
    onFormSubmit={(_data) => {
      router.push('/register/page9')
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <Page title="Primary profession" progress={30}>
    {page}
  </Page>
)
