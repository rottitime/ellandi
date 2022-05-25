import { Button } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmptyLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  return (
    <EmptyLayout>
      <h1 className="D">Privacy Policy</h1>

      <Checkbox
        checked={checked}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setChecked(event.target.checked);
        }}
      >
        I agree to the privacy policy
      </Checkbox>

      <p>
        <Button
          disabled={!checked}
          onClick={() => {
            return navigate("/steps/3");
          }}
        >
          <span className="H-XS">Continue</span>
        </Button>
      </p>

      <p>(will add a hidden captcha to this page)</p>
    </EmptyLayout>
  );
};

export default Index;
