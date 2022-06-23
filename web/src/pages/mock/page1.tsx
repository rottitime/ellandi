import { Heading, Link } from "govuk-react";
import { Layout } from "_/components/Layouts";
import Paragraph from "_/components/P";

const Page = () => {
  return (
    <Layout>
      <Heading size="MEDIUM">
        Hi <Link href="#">joe.bloggs@cabinetoffice.gov.uk</Link>
      </Heading>

      <Paragraph>
        You are invited to register on Civil Service Skills. Please select the following
        link to sign up:
      </Paragraph>

      <Paragraph>
        <Link href="/mock/page2">
          http://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
        </Link>
      </Paragraph>
      <Paragraph>
        The above is a one-time-only link; you can only use this link once. If you use
        this link more than once, your invitation expires and you will not be able to sign
        up to Civil Service Skills.
      </Paragraph>
      <Paragraph>
        Please contact{" "}
        <Link href="mailto:mailto:support.learn@csskills.gov.uk">
          support.learn@csskills.gov.uk
        </Link>{" "}
        if you need the sign-up link to be resent.
      </Paragraph>

      <Paragraph>
        Regards
        <br />
        skills.civilservice Team
      </Paragraph>
    </Layout>
  );
};

export default Page;
