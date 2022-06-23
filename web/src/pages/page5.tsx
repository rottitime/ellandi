import { Button, FormGroup, Heading, InputField } from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create an account - Your details</Heading>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Full name
        </InputField>
      </FormGroup>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Department
        </InputField>
      </FormGroup>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Job title
        </InputField>
      </FormGroup>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Your line manager's email address
        </InputField>
      </FormGroup>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Country
        </InputField>
      </FormGroup>

      <Button
        onClick={() => {
          navigate('/mock/page6')
        }}
      >
        continue
      </Button>
    </Layout>
  )
}

export default Page
