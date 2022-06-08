import { FormControl } from "_/components/FormControl";
import { Checkbox } from "baseui/checkbox";
import { ChangeEvent, useEffect, useState } from "react";
import { camelCase, CamelCase, pascalCase, PascalCase } from "_/utilities/form";
import { useDeepState } from "./useDeepState";

type Option = { id: string; label: string };
type Options = readonly Option[];

const notUndefined = (value: string[]): string => {
  return value.length > 0 ? "" : "Must check at least one";
};

export const useCheckboxGroup = <T extends string>({
  label,
  options,
  validator = notUndefined,
  initialValue = [],
}: {
  label: T;
  options: Options;
  validator?: (value: string[]) => string;
  initialValue?: string[];
}): {
  [K in T as `${CamelCase<T>}El`]: JSX.Element;
} & {
  [K in T as CamelCase<T>]: string;
} & {
  [K in T as `set${PascalCase<T>}`]: React.Dispatch<React.SetStateAction<string>>;
} & {
  [K in T as `is${PascalCase<T>}Valid`]: boolean;
} => {
  const [value, setValue] = useDeepState<string[]>(initialValue);
  const [isInputDirty, setIsInputDirty] = useState(false);

  const errorMessage = validator(value);

  useEffect(() => {
    let debounce: ReturnType<typeof setTimeout>;

    if (value.length > 0) {
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
        <>
          {options.map(({ id, label }) => {
            return (
              // padding needed to match the radio button style
              <div style={{ padding: "6px 0" }} key={id}>
                <Checkbox
                  value={id}
                  checked={value.includes(id)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setValue([
                      ...value.filter((key) => {
                        return id !== key;
                      }),
                      ...(event.target.checked ? [id] : []),
                    ]);
                  }}
                >
                  <span className="P">{label}</span>
                </Checkbox>
              </div>
            );
          })}
        </>
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
