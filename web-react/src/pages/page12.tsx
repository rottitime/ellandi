import { Button, Heading, HintText, LeadParagraph, Paragraph } from 'govuk-react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ToggleButton = styled(Button)`
  margin-right: 10px;
`

const Page = () => {
  const navigate = useNavigate()
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create a profile - Your current skills</Heading>

      <LeadParagraph>
        Select any skills that you already have. You can change or add to these later
      </LeadParagraph>
      <HintText>
        We’ll use this to suggest learning and career development opportunities that are
        relevant to you
      </HintText>

      <ToggleButton buttonColour="#1d70b8">Auditing</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Bookkeeping</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Communication</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Coding</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Creative thinking</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Customer service</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Data entry</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Diary management</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Flexibility</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Microsoft Office</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Motivation</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Negotiation</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Planning</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Problem solving</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Project management</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Sales</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Social media</ToggleButton>
      <ToggleButton buttonColour="#1d70b8">Teamwork</ToggleButton>

      <Button
        buttonColour="#f3f2f1"
        buttonTextColour="#0B0C0C"
        style={{ display: 'block' }}
      >
        {' '}
        Load more skills
      </Button>

      <Paragraph>[Skip this step](/mock/page13)</Paragraph>
      <Button
        onClick={() => {
          navigate('/page13')
        }}
      >
        continue
      </Button>
    </Layout>
  )
}

export default Page
