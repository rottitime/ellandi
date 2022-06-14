import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";
import { ChangeEvent, useState } from "react";
import { Link } from "_/components/Link";
import { Checkbox } from "baseui/checkbox";
import { CVUploader } from "_/partials/CVUploader";

const Index = () => {
  const navigate = useNavigate();

  const [successFile, setSuccessFile] = useState<File>();
  const [canBeContacted, setCanBeContacted] = useState(true);

  return (
    <EmptyLayout>
      <h1 className="D-S">Upload your CV</h1>

      <CVUploader
        successFile={successFile}
        setSuccessFile={setSuccessFile}
        successLeadMessage="Successfully uploaded"
      />

      <p className="P">
        We'll use the information in your CV to discover opportunities and skills suited
        to your experience.
      </p>

      <p className="P-XS">
        <Checkbox
          checked={canBeContacted}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setCanBeContacted(event.target.checked);
          }}
          checkmarkType="toggle"
          overrides={{
            Toggle: {
              style: {
                background: "var(--mono100)",
                border: "1px solid var(--mono400)",
              },
            },
            Root: {
              style: {
                alignItems: "center",
              },
            },
            Label: {
              style: { flex: "1 1 1px" },
            },
          }}
        >
          <span className="P-XS">
            In the event of an identified skills shortage or emergency, recruitment and HR
            may contact me with an opportunity that matches my skills.
          </span>
        </Checkbox>
      </p>

      <p className="P-XS">
        You are also able to update your CV in the Profile section.{" "}
        <Link to="/steps/8">Skip for now</Link>
      </p>

      <p>
        <Button
          disabled={successFile === undefined}
          onClick={() => {
            return navigate("/steps/7");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>
    </EmptyLayout>
  );
};

export default Index;
