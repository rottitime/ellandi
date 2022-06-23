import { Button, Heading, HintText, LeadParagraph, Paragraph, Radio } from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create a profile - Grade</Heading>

      <LeadParagraph>Select your grade. You may only choose one</LeadParagraph>

      <HintText>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </HintText>

      <Radio name="group1">Administrative Officer (AO) Equivalent</Radio>
      <Radio name="group1">Administrative Assistant (AA) Equivalent</Radio>
      <Radio name="group1">Executive Officer (EO) Equivalent</Radio>
      <Radio name="group1">Higher Executive Officer (HEO) Equivalent</Radio>
      <Radio name="group1">Senior Executive Officer (SEO) Equivalent</Radio>
      <Radio name="group1">Grade 7 Equivalent</Radio>
      <Radio name="group1">Grade 6 Equivalent</Radio>
      <Radio name="group1">Senior Civil Servant - Deputy Director (PB1/1A)</Radio>
      <Radio name="group1">Senior Civil Servant - Director (PB2)</Radio>
      <Radio name="group1">Senior Civil Servant - Director General (PB3)</Radio>
      <Radio name="group1">Senior Civil Servant - Permanent Secretary</Radio>
      <Radio name="group1">Other equivalent grade</Radio>

      <Paragraph>[Skip this step](/mock/page7)</Paragraph>

      <Button
        onClick={() => {
          navigate('/page7')
        }}
      >
        Continue
      </Button>
    </Layout>
  )
}

export default Page
