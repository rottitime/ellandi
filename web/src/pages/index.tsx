import { EmptyLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";

const Index = () => {
  return (
    <EmptyLayout>
      <h1 className="H">
        Hello <strong>joe.bloggs@cabinetoffice.gov.uk</strong>
      </h1>

      <p className="P-L">You are invited to register on Civil Service Skills.</p>

      <p className="P-L">Please select the following link to sign up:</p>

      <p className="P-L">
        <Link to="/steps/0">
          https://skills.civilservice.gov.uk/signup/123AbcDefgh1238910ABCdefghk
        </Link>
      </p>

      <p className="P-L">
        The above is a one-time-only link; you can only use this link once. If you use
        this link more than once, your invitation expires and you will not be able to sign
        up to Civil Service Skills.
      </p>

      <p className="P-L">
        Please contact{" "}
        <Link to="mailto:support.learn@csskills.gov.uk">
          support.learn@csskills.gov.uk
        </Link>{" "}
        if you need the sign-up link to be re-sent.
      </p>
    </EmptyLayout>
  );
};

export default Index;
