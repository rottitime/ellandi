import {
  Button,
  Heading,
  HintText,
  LeadParagraph,
  Link,
  Paragraph,
  Table,
} from "govuk-react";
import { Layout } from "_/components/Layouts";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ToggleButton = styled(Button)`
  margin-right: 10px;
`;

const Page = () => {
  const navigate = useNavigate();
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create a profile - Skills you'd like to develop</Heading>

      <LeadParagraph>
        Select any skills that you'd like to develop. You can change or add to these later
      </LeadParagraph>
      <HintText>
        We'll use this to suggest learning and career development opportunities that are
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
        style={{ display: "block" }}
      >
        Load more skills
      </Button>

      <Table>
        <Table.Row>
          <Table.Cell>Selected skill</Table.Cell>
          <Table.Cell>&nbsp;</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Skill 1</Table.Cell>
          <Table.Cell>
            <Link href="#">Remove</Link>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Skill 2</Table.Cell>
          <Table.Cell>
            <Link href="#">Remove</Link>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Skill 3</Table.Cell>
          <Table.Cell>
            <Link href="#">Remove</Link>
          </Table.Cell>
        </Table.Row>
      </Table>

      <Paragraph>[Skip this step](/mock/skills1)</Paragraph>
      <Button
        onClick={() => {
          navigate("/mock/skills1");
        }}
      >
        continue
      </Button>
    </Layout>
  );
};

export default Page;
