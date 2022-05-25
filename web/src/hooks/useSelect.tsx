import { FormControl } from "baseui/form-control";
import { Option, Select } from "baseui/select";
import { useEffect, useState } from "react";
import { camelCase, CamelCase, pascalCase, PascalCase } from "_/utilities/form";
import { useDeepState } from "./useDeepState";

const hasSingleValue = (value: readonly Option[]): string => {
  return value.length === 1 ? "" : "Must select a value";
};

const areOptionsEqual = (a: readonly Option[], b: readonly Option[]): boolean => {
  const aJSON = JSON.stringify(
    a.map(({ id }) => {
      return id ?? null;
    })
  );
  const bJSON = JSON.stringify(
    b.map(({ id }) => {
      return id ?? null;
    })
  );
  return aJSON === bJSON;
};

export const useSelect = <T extends string>({
  label,
  options,
  validator = hasSingleValue,
  initialValue = [],
}: {
  label: T;
  options: readonly Option[];
  validator?: (value: readonly Option[]) => string;
  initialValue?: readonly Option[];
}): {
  [K in T as `${CamelCase<T>}El`]: JSX.Element;
} & {
  [K in T as CamelCase<T>]: string;
} & {
  [K in T as `set${PascalCase<T>}`]: React.Dispatch<React.SetStateAction<string>>;
} & {
  [K in T as `is${PascalCase<T>}Valid`]: boolean;
} => {
  const [value, setValue] = useDeepState<readonly Option[]>(initialValue);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const errorMessage = validator(value);

  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    if (!areOptionsEqual(value, [])) {
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
        <Select
          value={value}
          onChange={({ value }) => {
            setValue(value);
          }}
          options={options}
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
