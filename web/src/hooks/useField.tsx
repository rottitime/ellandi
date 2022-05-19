import { Input } from "baseui/input";
import { ChangeEvent, useState } from "react";

// But my idea (before I go to sleep) is...
//
// Create a component for it
// Common types as strings "input" "password"
// Unique types handled as custom Components that take certain props
//   - value: T
//   - setValue: T => void

// alternatively a hook for useField might be nice, to colocate logic

export const useInput = (): JSX.Element => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputDirty, setIsInputDirty] = useState(false);

  return (
    <Input
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
      error={Boolean(emailError)}
      positive={emailError === null}
    />
  );
};
