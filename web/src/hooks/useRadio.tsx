import { FormControl } from "baseui/form-control";
import { RadioGroup, Radio } from "baseui/radio";
import { ChangeEvent, useEffect, useState } from "react";
import { camelCase, CamelCase, pascalCase, PascalCase } from "_/utilities/form";
import { useDeepState } from "./useDeepState";

type Option = { id: string; label: string };
type Options = readonly Option[];

const notUndefined = (value?: string | undefined): string => {
  return value ? "" : "Must select a value";
};

export const useRadio = <T extends string>({
  label,
  options,
  validator = notUndefined,
  initialValue,
}: {
  label: T;
  options: Options;
  validator?: (value?: string) => string;
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
  const [value, setValue] = useDeepState<string | undefined>(initialValue);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const errorMessage = validator(value);

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
      <FormControl error={isInputDirty ? errorMessage || null : null}>
        <RadioGroup
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;
            setValue(newValue);
          }}
        >
          {options.map(({ id, label }) => {
            return (
              <Radio key={id} value={id}>
                <span className="P">{label}</span>
              </Radio>
            );
          })}
        </RadioGroup>
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
