/* eslint-disable @typescript-eslint/no-restricted-imports */
import { Button as BaseWebButton, ButtonProps } from "baseui/button";
export type { ButtonOverrides, CustomColorsT, ButtonProps } from "baseui/button";
export {
  StyledBaseButton,
  StyledStartEnhancer,
  StyledEndEnhancer,
  StyledLoadingSpinner,
  StyledLoadingSpinnerContainer,
} from "baseui/button";

// For KIND, SIZE and SHAPE, just use the string instead of the baseweb constant

export const Button = ({ overrides, ...props }: ButtonProps | Readonly<ButtonProps>) => {
  const shouldChangeDefaultPadding = (props.shape ?? "pill") === "pill";

  return (
    <BaseWebButton
      shape="pill"
      {...props}
      overrides={{
        ...overrides,
        BaseButton: {
          style: shouldChangeDefaultPadding
            ? {
                paddingLeft: "20px",
                paddingRight: "20px",
              }
            : {},
        },
        StartEnhancer: {
          style: {
            marginRight: "8px",
          },
          ...overrides?.StartEnhancer,
        },
        EndEnhancer: {
          style: {
            marginLeft: "8px",
          },
          ...overrides?.EndEnhancer,
        },
      }}
    />
  );
};
