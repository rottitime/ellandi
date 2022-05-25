import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { camelCase, CamelCase, nonEmpty, pascalCase, PascalCase } from "_/utilities/form";

export const useInput = <T extends string>({
  label,
  validator = nonEmpty,
  initialValue = "",
}: {
  label: T;
  validator?: (value: string) => string;
  initialValue?: string;
}): {
  [K in T as `${CamelCase<T>}El`]: JSX.Element;
} & {
  [K in T as CamelCase<T>]: string;
} & {
  [K in T as `set${PascalCase<T>}`]: React.Dispatch<React.SetStateAction<string>>;
} & {
  [K in T as `is${PascalCase<T>}Valid`]: boolean;
} => {
  const initialValueRef = useRef(initialValue);

  const [value, setValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState(validator(initialValue));
  const [isInputDirty, setIsInputDirty] = useState(false);

  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    if (value !== initialValueRef.current) {
      debounce = setTimeout(() => {
        setIsInputDirty(true);
      }, 200);
    }

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  const camel = camelCase(label);
  const pascal = pascalCase(label);

  return {
    [`${camel}El`]: (
      <FormControl label={label} error={isInputDirty ? errorMessage || null : null}>
        <Input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(newValue);
            setErrorMessage(validator(newValue));
          }}
          error={isInputDirty && errorMessage !== ""}
          positive={isInputDirty && errorMessage === ""}
        />
      </FormControl>
    ),
    [camel]: value,
    [`set${pascal}`]: setValue,
    [`is${pascal}Valid`]: errorMessage === "",
  } as {
    [K in T as `${CamelCase<T>}El`]: JSX.Element;
  } & {
    [K in T as CamelCase<T>]: string;
  } & {
    [K in T as `set${PascalCase<T>}`]: React.Dispatch<React.SetStateAction<string>>;
  } & {
    [K in T as `is${PascalCase<T>}Valid`]: boolean;
  };
};
