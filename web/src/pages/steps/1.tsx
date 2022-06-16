import { Button } from "_/components/Button";
import { useNavigate } from "react-router-dom";
import { useInput } from "_/hooks/useInput";
import { usePassword } from "_/hooks/usePassword";
import { EmptyLayout } from "_/components/Layouts";
import { useCheckboxGroup } from "_/hooks/useCheckboxGroup";

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

  const { hasAgreedToPrivacyPolicyEl, isHasAgreedToPrivacyPolicyValid } =
    useCheckboxGroup({
      label: "Has agreed to privacy policy",
      options: [{ id: "policy", label: "I agree to the privacy policy" }],
      validator: (value: string[]): string => {
        return value.length === 1
          ? ""
          : "You are required to agree to the privacy policy to continue";
      },
    });

  return (
    <EmptyLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/steps/2");
          return false;
        }}
      >
        <h1 className="D c">Create an account</h1>

        <h3>Enter your email address</h3>

        {emailAddressEl}

        <h3>Create a password</h3>

        <p className="P" style={{ color: "var(--mono700)" }}>
          Your password should have at least 8 characters and not include your name or
          email address.
        </p>

        {passwordEl}
        {confirmPasswordEl}

        {hasAgreedToPrivacyPolicyEl}

        <p>
          <Button
            type="submit"
            disabled={
              !(
                isEmailAddressValid &&
                isPasswordValid &&
                isConfirmPasswordValid &&
                isHasAgreedToPrivacyPolicyValid
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
