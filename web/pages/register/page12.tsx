import {
  Button,
  FormGroup,
  Heading,
  HintText,
  InputField,
  LeadParagraph,
  Radio
} from 'govuk-react'
import { Text } from '@/components/UI/Shared/Shared'
import Layout from '@/components/UI/Layout'
import Link from '@/components/UI/Link'

const Page = () => (
  <>
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
    <Text>Speaking</Text>
    <Text>Set a proficiency level for speaking:</Text>
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
    <Text>Writing</Text>
    <Text>Set a proficiency level for speaking:</Text>
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

    <Text>
      <Link href="#">Add a language</Link>
    </Text>
    <Text>
      <Link href="/register/page13">Skip this step</Link>
    </Text>

    <Link href="/register/page13">
      <Button>Continue</Button>
    </Link>
  </>
)

export default Page
Page.getLayout = (page) => <Layout>{page}</Layout>
