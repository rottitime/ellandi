import { Button, Checkbox, Heading, Paragraph } from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading>Create an account - Privacy policy</Heading>
      <Paragraph>[Privacy policy (opens in a new tab)](#)</Paragraph>
      <Checkbox>I agree to the privacy policy</Checkbox>
      <img src="/images/captcha.png" alt="captcha" />

      <Button
        onClick={() => {
          navigate('/mock/page5')
        }}
      >
        continue
      </Button>
    </Layout>
  )
}

export default Page
