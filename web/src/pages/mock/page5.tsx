import { Button, Heading, InputField } from "govuk-react";
import { Layout } from "_/components/Layouts";
import { useNavigate } from "react-router-dom";

const Page = () => {
  const navigate = useNavigate();
  return (
    <Layout backLink={true}>
      <Heading size="LARGE">Create an account - Your details</Heading>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Full name
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Department
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Job title
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Your line manager's email address
      </InputField>

      <InputField
        input={{
          name: "group0",
        }}
      >
        Country
      </InputField>

      <Button
        onClick={() => {
          navigate("/mock/page6");
        }}
      >
        continue
      </Button>
    </Layout>
  );
};

export default Page;
