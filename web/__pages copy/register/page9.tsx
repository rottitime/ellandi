import {
  Button,
  FileUpload,
  Heading,
  HintText,
  LeadParagraph,
  Paragraph
} from 'govuk-react'
import Layout from '@/components/UI/Layout'
import Link from 'next/link'

const Page = () => {
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create an account - Upload your CV</Heading>

      <LeadParagraph>
        If you don't have a CV available you can add one later by going to your Profile
      </LeadParagraph>
      <HintText>
        We'll use the information in your CV to suggest skills and opportunities that are
        more relevant to you
      </HintText>
      <FileUpload name="group0">Upload a document</FileUpload>
      <Text>[Skip this step](/mock/page10)</Text>

      <Link href="/register/page10" passHref>
        <Button>Continue</Button>
      </Link>
    </Layout>
  )
}

export default Page
