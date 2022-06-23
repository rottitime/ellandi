import { Button, Heading, HintText, LeadParagraph, Radio } from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create an account - Current contract type</Heading>
      <LeadParagraph>Select your contract type. You can only choose one</LeadParagraph>
      <HintText>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </HintText>
      <Radio name="group1">Yes</Radio>
      <Radio name="group1">No</Radio>

      <Button
        onClick={() => {
          navigate('/page11')
        }}
      >
        Continue
      </Button>
    </Layout>
  )
}

export default Page
