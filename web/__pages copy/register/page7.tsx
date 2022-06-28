import {
  Button,
  Checkbox,
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
      <Heading size="LARGE">Create an account - Current profession</Heading>
      <LeadParagraph>
        Select the Profession(s) that you belong to. You may choose more than one
      </LeadParagraph>

      <HintText>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </HintText>
      <Checkbox>Corporate Finance Profession</Checkbox>
      <Checkbox>Counter-fraud Standards and Profession</Checkbox>
      <Checkbox>Digital, Data and Technology Professions</Checkbox>
      <Checkbox>Government Communication Service</Checkbox>
      <Checkbox>Government Economic Service</Checkbox>
      <Checkbox>Government Finance Profession</Checkbox>
      <Checkbox>Government IT Profession</Checkbox>
      <Checkbox>Government Knowledge and Information Management Profession</Checkbox>
      <Checkbox>Government Legal Profession</Checkbox>
      <Checkbox>Government Occupational Psychology Profession</Checkbox>
      <Checkbox>Government Operational Research Service</Checkbox>
      <Checkbox>Government Planning Inspectors</Checkbox>
      <Checkbox>Government Planning Profession</Checkbox>
      <Checkbox>Government Property Profession</Checkbox>
      <Checkbox>Government Security Profession</Checkbox>
      <Checkbox>Government Science and Engineering Profession</Checkbox>
      <Checkbox>Government Social Research Profession</Checkbox>
      <Checkbox>Government Tax Profession</Checkbox>
      <Checkbox>Government Veterinary Profession</Checkbox>
      <Checkbox>Human Resources Profession</Checkbox>
      <Checkbox>Intelligence Analysis</Checkbox>
      <Checkbox>Internal Audit Profession</Checkbox>
      <Checkbox>Operational Delivery Profession</Checkbox>
      <Checkbox>Policy Profession</Checkbox>
      <Checkbox>Procurement Profession</Checkbox>
      <Checkbox>Project Delivery Profession</Checkbox>
      <Text>[Skip this step](/mock/page8)</Text>

      <Link href="/register/page8" passHref>
        <Button>Continue</Button>
      </Link>
    </Layout>
  )
}

export default Page
