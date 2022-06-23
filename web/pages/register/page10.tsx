import { Button, Heading, HintText, LeadParagraph, Radio } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from 'next/link'

const Page = () => {
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

      <Link href="/register/page11" passHref>
        <Button>Continue</Button>
      </Link>
    </Layout>
  )
}

export default Page
