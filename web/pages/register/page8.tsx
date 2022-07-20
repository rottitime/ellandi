import CardLayout from '@/components/Layout/CardLayout'
import router from 'next/router'
import PrimaryProfessionForm from '@/components/Form/Register/PrimaryProfessionForm'

const page = 8

const RegisterPage = () => (
  <PrimaryProfessionForm
    backUrl={`/register/page${page - 1}`}
    onFormSubmit={(_data) => {
      router.push(`/register/page${page + 1}`)
    }}
  />
)

export default RegisterPage

RegisterPage.getLayout = (page) => (
  <CardLayout title="Primary profession" progress={40}>
    {page}
  </CardLayout>
)
