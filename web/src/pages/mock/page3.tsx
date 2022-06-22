import { Button, Heading, HintText, InputField, Paragraph } from "govuk-react";
import { Layout } from "_/components/Layouts";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  return (
    <Layout backLink={true}>
      <Heading>Create an account</Heading>
      <Paragraph>You need to create an account before using this service</Paragraph>

      <Heading size={"MEDIUM"}>Enter your email address</Heading>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Email address
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Confirm your email address
      </InputField>

      <Heading size={"MEDIUM"}>Create a password</Heading>

      <Heading size="MEDIUM" style={{ marginBottom: "0" }}>
        Before you start
      </Heading>
      <HintText>
        Your password should have at least 8 characters and not include your name or email
        address
      </HintText>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Password
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Confirm your password
      </InputField>

      <Button
        onClick={() => {
          navigate("/mock/page4");
        }}
      >
        continue
      </Button>
    </Layout>
  );
};

export default Page;
