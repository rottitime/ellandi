import { FormControl } from "_/components/FormControl";
import { Input } from "baseui/input";
import { ChangeEvent, useEffect, useState } from "react";
import { camelCase, CamelCase, nonEmpty, pascalCase, PascalCase } from "_/utilities/form";
import { useDemoValue } from "./useDemoValue";

export const usePassword = <T extends string>({
  label,
  validator = nonEmpty,
  initialValue = "",
  demoValue = "",
}: {
  label: T;
  validator?: (value: string) => string;
  initialValue?: string;
  demoValue?: string;
}): {
  [K in T as `${CamelCase<T>}El`]: JSX.Element;
} & {
  [K in T as CamelCase<T>]: string;
} & {
  [K in T as `set${PascalCase<T>}`]: React.Dispatch<React.SetStateAction<string>>;
} & {
  [K in T as `is${PascalCase<T>}Valid`]: boolean;
} => {
  const [value, setValue] = useState(initialValue);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const errorMessage = validator(value);

  const onClick = useDemoValue(demoValue, setValue);

  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    if (value !== "") {
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
          type="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(newValue);
          }}
          error={isInputDirty && errorMessage !== ""}
          positive={isInputDirty && errorMessage === ""}
          overrides={{
            Input: {
              props: { onClick },
            },
          }}
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
