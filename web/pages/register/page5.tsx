import { Button, FormGroup, Heading, InputField } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from 'next/link'

const Page = () => {
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

      <Link href="/register/page6" passHref>
        <Button>Continue</Button>
      </Link>
    </Layout>
  )
}

export default Page
