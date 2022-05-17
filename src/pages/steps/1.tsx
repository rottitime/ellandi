import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const EMAIL_REGEX =
  /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/;

const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.toLowerCase());
};
const validatePassword = (password: string): boolean => {
  if (password.length < 10) return false;
  if (password === password.toLowerCase()) return false;
  if (password === password.toUpperCase()) return false;
  return true;
};

const Index = () => {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<string | null>("");
  const [passwordError, setPasswordError] = useState<string | null>("");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (email === "" || confirmEmail === "") setEmailError("");
    else if (email !== confirmEmail) setEmailError("Emails do not match");
    else if (!validateEmail(email)) setEmailError("Email is invalid");
    else setEmailError(null);
  }, [email, confirmEmail]);

  useEffect(() => {
    if (password === "" || confirmPassword === "") setPasswordError("");
    else if (password !== confirmPassword) setPasswordError("Passwords do not match");
    else if (!validatePassword(password)) setPasswordError("Password is insecure");
    else setPasswordError(null);
  }, [password, confirmPassword]);

  return (
    <MenuLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (emailError === "") {
            setEmailError("Required field is empty");
          }
          if (passwordError === "") {
            setPasswordError("Required field is empty");
          }
          if (emailError === null && passwordError === null) {
            navigate("/steps/2");
          }
          return false;
        }}
      >
        <h1 className="D">Create an account</h1>

        <h3>Enter your email address</h3>

        <FormControl label="Email address">
          <Input
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            error={Boolean(emailError)}
            positive={emailError === null}
          />
        </FormControl>

        <FormControl label="Confirm your email address" error={emailError || null}>
          <Input
            value={confirmEmail}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setConfirmEmail(event.target.value);
            }}
            error={Boolean(emailError)}
            positive={emailError === null}
          />
        </FormControl>

        <h3>Create a password</h3>

        <p className="P" style={{ color: "var(--mono700)" }}>
          Your password should have at least 8 characters and not include your name or
          email address.
        </p>

        <FormControl label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            error={Boolean(passwordError)}
            positive={passwordError === null}
          />
        </FormControl>

        <FormControl label="Confirm your password" error={passwordError || null}>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(event.target.value);
            }}
            error={Boolean(passwordError)}
            positive={passwordError === null}
          />
        </FormControl>

        <p>
          <Button type="submit">
            <span className="H-XS">Continue</span>
          </Button>
        </p>
      </form>
    </MenuLayout>
  );
};

export default Index;
