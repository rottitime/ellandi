import CardLayout from '@/components/Layout/CardLayout'
import router from 'next/router'
import ContactForm from '@/components/Form/Register/ContactForm'

const page = 11

const RegisterPage = () => (
  <ContactForm
    backUrl={`/register/page${page - 1}`}
    onFormSubmit={(data) => {
      // eslint-disable-next-line no-console
      console.log({ data })
      router.push('/register/thankyou')
    }}
  />
)

export default RegisterPage
RegisterPage.getLayout = (page) => (
  <CardLayout title="Contact preference" progress={70}>
    {page}
  </CardLayout>
)
