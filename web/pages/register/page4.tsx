import { Button, Checkbox, Heading, Paragraph } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from 'next/link'

const Page = () => (
  <Layout backLink={true}>
    <Heading>Create an account - Privacy policy</Heading>
    <Paragraph>[Privacy policy (opens in a new tab)](#)</Paragraph>
    <Checkbox>I agree to the privacy policy</Checkbox>

    <Link href="/register/page5" passHref>
      <Button>continue</Button>
    </Link>
  </Layout>
)

export default Page
