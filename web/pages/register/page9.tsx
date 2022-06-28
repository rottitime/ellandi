import { Button, FileUpload, Heading, HintText, LeadParagraph } from 'govuk-react'
import { Text } from '@/components/UI/Shared/Shared'
import Layout from '@/components/UI/Layout'
import Link from '@/components/UI/Link'

const Page = () => {
  return (
    <>
      <Heading size="LARGE">Create an account - Upload your CV</Heading>

      <LeadParagraph>
        If you don't have a CV available you can add one later by going to your Profile
      </LeadParagraph>
      <HintText>
        We'll use the information in your CV to suggest skills and opportunities that are
        more relevant to you
      </HintText>
      <FileUpload name="group0">Upload a document</FileUpload>

      <Text>
        <Link href="/register/page10">Skip this step</Link>
      </Text>

      <Link href="/register/page10">
        <Button>Continue</Button>
      </Link>
    </>
  )
}

export default Page
Page.getLayout = (page) => <Layout>{page}</Layout>
