import { Button } from "_/components/Button";
import { useNavigate } from "react-router-dom";
import { useInput } from "_/hooks/useInput";
import { usePassword } from "_/hooks/usePassword";
import { Checkbox } from "baseui/checkbox";
import { EmptyLayout } from "_/components/Layouts";
import { ChangeEvent, useState } from "react";
import { FormControl } from "_/components/FormControl";

const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z-]+\.)+[A-Za-z]{2,}))$/;

const validateEmail = (email: string): string => {
  return EMAIL_REGEX.test(email.toLowerCase()) ? "" : "Invalid email address";
};
const validatePassword = (password: string): string => {
  if (password.length < 8) return "Password too short (minimum 8 characters)";
  if (password === password.toLowerCase()) return "Password must not be all lowercase";
  if (password === password.toUpperCase()) return "Password must not be all uppercase";
  return "";
};

const Index = () => {
  const navigate = useNavigate();

  const { emailAddressEl, isEmailAddressValid } = useInput({
    label: "Email address",
    validator: validateEmail,
    initialValue: "joe.bloggs@cabinetoffice.gov.uk",
    demoValue: "joe.bloggs@cabinetoffice.gov.uk",
  });
  const { passwordEl, password, isPasswordValid } = usePassword({
    label: "Password",
    validator: validatePassword,
    demoValue: "Password123",
  });
  const { confirmPasswordEl, isConfirmPasswordValid } = usePassword({
    label: "Confirm password",
    validator: (value: string): string => {
      return value === password ? "" : "Passwords must match";
    },
    demoValue: "Password123",
  });
  const [hasAgreedToPrivacyPolicy, setHasAgreedToPrivacyPolicy] = useState(false);

  return (
    <EmptyLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/steps/2");
          return false;
        }}
      >
        <h1 className="D c">
          Create an account
          <span className="flick" />
        </h1>

        <h3>Enter your email address</h3>

        {emailAddressEl}

        <h3>Create a password</h3>

        <p className="P" style={{ color: "var(--mono700)" }}>
          Your password should have at least 8 characters and not include your name or
          email address.
        </p>

        {passwordEl}
        {confirmPasswordEl}

        <FormControl>
          <p className="mv32">
            <Checkbox
              checked={hasAgreedToPrivacyPolicy}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setHasAgreedToPrivacyPolicy(event.target.checked);
              }}
            >
              I agree to the privacy policy
            </Checkbox>
          </p>
        </FormControl>

        <p>
          <Button
            type="submit"
            disabled={
              !(
                isEmailAddressValid &&
                isPasswordValid &&
                isConfirmPasswordValid &&
                hasAgreedToPrivacyPolicy
              )
            }
          >
            <span className="H-XS">Continue</span>
          </Button>
        </p>
      </form>
    </EmptyLayout>
  );
};

export default Index;
