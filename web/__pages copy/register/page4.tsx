import { Button, Checkbox, Heading, Paragraph } from 'govuk-react'
import Layout from '@/components/UI/Layout'
import Link from 'next/link'

const Page = () => (
  <Layout backLink={true}>
    <Heading>Create an account - Privacy policy</Heading>
    <Text>[Privacy policy (opens in a new tab)](#)</Text>
    <Checkbox>I agree to the privacy policy</Checkbox>

    <Link href="/register/page5" passHref>
      <Button>Continue</Button>
    </Link>
  </Layout>
)

export default Page
