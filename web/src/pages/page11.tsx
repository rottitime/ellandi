import {
  Button,
  FormGroup,
  Heading,
  HintText,
  InputField,
  LeadParagraph,
  Paragraph,
  Radio
} from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create a profile - Language skills</Heading>
      <LeadParagraph>
        Add any languages that you use. You can change or add to these later.
      </LeadParagraph>
      <HintText>
        We'll use this to suggest learning and career development opportunities that are
        relevant to you
      </HintText>
      <Heading size="MEDIUM">Language one</Heading>

      <FormGroup>
        <InputField
          input={{
            name: 'group0'
          }}
        >
          Select a language:
        </InputField>
      </FormGroup>
      <Paragraph>Speaking</Paragraph>
      <Paragraph>Set a proficiency level for speaking:</Paragraph>
      <Radio
        hint="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
        name="group1"
      >
        Basic
      </Radio>
      <Radio
        hint="You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency"
        name="group1"
      >
        Independent
      </Radio>
      <Radio
        hint="You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes"
        name="group1"
      >
        Proficient
      </Radio>
      <Paragraph>Writing</Paragraph>
      <Paragraph>Set a proficiency level for speaking:</Paragraph>
      <Radio
        hint="You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"
        name="group2"
      >
        Basic
      </Radio>
      <Radio
        hint="You can produce clear, detailed text on a wide range of subjects and explain the advantages and disadvantages of a topical issue"
        name="group2"
      >
        Independent
      </Radio>
      <Radio
        hint="You can produce clear, well-structured, detailed text on complex subjects and can express yourself fluently and precisely"
        name="group2"
      >
        Proficient
      </Radio>

      <Paragraph>[Add language](/mock/page12)</Paragraph>
      <Paragraph>[Skip this step](/mock/page12)</Paragraph>
      <Button
        onClick={() => {
          navigate('/page12')
        }}
      >
        continue
      </Button>
    </Layout>
  )
}

export default Page
