/* eslint-disable @typescript-eslint/no-restricted-imports */
import { FormControl as BaseWebFormControl, FormControlProps } from "baseui/form-control";
export { StyledLabel, StyledCaption, StyledControlContainer } from "baseui/form-control";
export type {
  FormControlOverrides,
  FormControlState,
  FormControlProps,
} from "baseui/form-control";

export interface FormControlChildProps {
  "aria-describedby": string | null;
  "aria-errormessage": string | null;
  key: React.Key;
  disabled: boolean;
  error: boolean;
  positive: boolean;
}

export const FormControl = ({
  overrides,
  ...props
}: FormControlProps | Readonly<FormControlProps>) => {
  return (
    <BaseWebFormControl
      {...props}
      overrides={{
        ...overrides,
        Label: ({ children }: { children: JSX.Element }): JSX.Element => {
          return <div className="PL">{children}</div>;
        },
      }}
    />
  );
};
