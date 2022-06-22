import {
  Button,
  FileUpload,
  Heading,
  HintText,
  LeadParagraph,
  Paragraph,
} from "govuk-react";
import { Layout } from "_/components/Layouts";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
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
      <Paragraph>[Skip this step](/mock/page10)</Paragraph>
      <Button
        onClick={() => {
          navigate("/mock/page10");
        }}
      >
        Continue
      </Button>
    </Layout>
  );
};

export default Page;
