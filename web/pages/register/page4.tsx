import { Button, Checkbox, Heading, Paragraph } from 'govuk-react'
import Layout from '@/components/Layout'
import { Text } from '@/components/UI/Shared/Shared'
import Link from '@/components/UI/Link'

const Page = () => (
  <Layout backLink={true}>
    <Heading>Create an account - Privacy policy</Heading>
    <Text>
      <Link href="#">Privacy policy</Link>
    </Text>
    <Checkbox>I agree to the privacy policy</Checkbox>

    <Link href="/register/page5">
      <Button>Continue</Button>
    </Link>
  </Layout>
)

export default Page
