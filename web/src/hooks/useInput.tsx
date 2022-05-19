import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { camelCase, CamelCase, nonEmpty, pascalCase, PascalCase } from "_/utilities/form";

// TODO: create same component but for Select

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

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputDirty, setIsInputDirty] = useState(false);

  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    if (value !== initialValueRef.current) {
      debounce = setTimeout(() => {
        setIsInputDirty(true);
      }, 300);
    }

    return () => {
      clearTimeout(debounce);
    };
  }, [value]);

  const camel = camelCase(label);
  const pascal = pascalCase(label);

  return {
    [`${camel}El`]: (
      <FormControl label={label} error={errorMessage || null}>
        <Input
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(newValue);
            setErrorMessage(validator(newValue));
            if (newValue !== initialValue && !isInputDirty) {
              clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => {
                setIsInputDirty(true);
              }, 300);
            }
          }}
          error={Boolean(errorMessage)}
          positive={isInputDirty && errorMessage === ""}
        />
      </FormControl>
    ),
    [camel]: value,
    [`set${pascal}`]: setValue,
    [`is${pascal}Valid`]: errorMessage !== "",
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
