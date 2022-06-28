import { Button, FormGroup, Heading, HintText, InputField, Paragraph } from 'govuk-react'
import Layout from '@/components/UI/Layout'
import Link from 'next/link'
import { Text } from '@/components/UI/Shared/Shared'

const Page = () => {
  return (
    <Layout backLink={true}>
      <Heading>Create an account</Heading>
      <Text>You need to create an account before using this service</Text>

      <Heading size={'MEDIUM'}>Enter your email address</Heading>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Email address
        </InputField>
      </FormGroup>
      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Confirm your email address
        </InputField>
      </FormGroup>

      <Heading size={'MEDIUM'}>Create a password</Heading>

      <Heading size="MEDIUM" style={{ marginBottom: '0' }}>
        Before you start
      </Heading>
      <HintText>
        Your password should have at least 8 characters and not include your name or email
        address
      </HintText>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Password
        </InputField>
      </FormGroup>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Confirm your password
        </InputField>
      </FormGroup>

      <Link href="/register/page4" passHref>
        <Button>Continue</Button>
      </Link>
    </Layout>
  )
}

export default Page
