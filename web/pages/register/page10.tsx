import { Button, Heading, HintText, LeadParagraph, Radio } from 'govuk-react'
import Layout from '@/components/Layout'
import Link from '@/components/UI/Link'

const Page = () => {
  return (
    <>
      <Heading size="LARGE">Contact preference</Heading>

      <LeadParagraph>
        Are you happy for recruitment and HR to contact you with opportunities from time
        to time based on your skills? You can change this later
      </LeadParagraph>
      <HintText>
        This will only be in cases of emergency or an identified skills shortage in a
        particular area
      </HintText>

      <Radio name="group1">Yes</Radio>
      <Radio name="group1">No</Radio>

      <Link href="/register/page11">
        <Button>Continue</Button>
      </Link>
    </>
  )
}

export default Page
Page.getLayout = (page) => <Layout>{page}</Layout>
