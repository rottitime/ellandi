import { Button } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuLayout } from "_/components/Layouts";

const Index = () => {
  const navigate = useNavigate();

  const [aError, setAError] = useState<string>("");
  const [bError, setBError] = useState<string>("");
  const [cError, setCError] = useState<string>("");
  const [dError, setDError] = useState<string>("");
  const [eError, setEError] = useState<string>("");

  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");

  useEffect(() => {
    setAError("");
    setBError("");
    setCError("");
    setDError("");
    setEError("");
  });

  return (
    <MenuLayout>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (a.trim() === "") setAError("Required field is empty");
          if (b.trim() === "") setBError("Required field is empty");
          if (c.trim() === "") setCError("Required field is empty");
          if (d.trim() === "") setDError("Required field is empty");
          if (e.trim() === "") setEError("Required field is empty");
          if (!(aError || bError || cError || dError || eError)) {
            navigate("/steps/4");
          }
          return false;
        }}
      >
        <h1 className="D">Your details</h1>

        <h3>Full Name</h3>

        <FormControl label="Full Name">
          <Input
            value={a}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setA(event.target.value);
            }}
            error={Boolean(aError)}
            positive={aError === null}
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
