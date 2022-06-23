import { FormControl } from "_/components/FormControl";
import { RadioGroup, Radio } from "baseui/radio";
import { ChangeEvent, useEffect, useState } from "react";
import { camelCase, CamelCase, pascalCase, PascalCase } from "_/utilities/form";
import { useDeepState } from "./useDeepState";

type Option = { id: string; label: string };
type Options = readonly Option[];

const notUndefined = (value?: string | undefined): string => {
  return value ? "" : "Must select a value";
};

export const useRadioGroup = <T extends string>({
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

    if (value !== undefined) {
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
              <Radio
                key={id}
                value={id}
                overrides={{
                  Root: {
                    style: {
                      width: "100%",
                    },
                  },
                  Label: {
                    style: {
                      flex: "1 0 1px",
                    },
                  },
                  RadioMarkOuter: {
                    style: {
                      width: "28px",
                      height: "28px",
                      display: "block",
                      position: "relative",
                    },
                  },
                  RadioMarkInner: ({ $checked }: { $checked: boolean }) => {
                    return (
                      <div
                        style={{
                          ...($checked
                            ? {
                                width: 10,
                                height: 10,
                              }
                            : {
                                width: 23,
                                height: 23,
                              }),
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          borderRadius: "50%",
                          backgroundColor: "var(--mono100)",
                        }}
                      />
                    );
                  },
                }}
              >
                <span className="P-S">{label}</span>
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
