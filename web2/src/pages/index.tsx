import { EmptyLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";
import { Button } from "govuk-react";

const Index = () => {
  return (
    <EmptyLayout>
      <h3>Enter app as user</h3>

      <p className="PL-L">
        <Link to="/skills">Enter</Link>
      </p>

      <h3>Example email</h3>

      <Button>dededee</Button>
      <div
        className="p16"
        style={{
          border: "4px solid var(--primary700)",
        }}
      >
        <h1 className="H mt0">
          Hello, <strong>Joe Bloggs</strong>
        </h1>

        <p className="P-L">You are invited to register on Ellandi.</p>

        <p className="P-L">Please select the following link to sign up:</p>

        <p className="P-L">
          <Link to="/steps/0">
            https://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
          </Link>
        </p>

        <p className="P-L">
          The above is a one-time-only link; you can only use this link once. If you use
          this link more than once, your invitation expires and you will not be able to
          sign up to Ellandi.
        </p>

        <p className="P-L mb0">
          Please contact{" "}
          <Link to="mailto:support.learn@csskills.gov.uk">
            support.learn@csskills.gov.uk
          </Link>{" "}
          if you need the sign-up link to be re-sent.
        </p>
      </div>
    </EmptyLayout>
  );
};

export default Index;
