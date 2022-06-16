import { LucideProps } from "lucide-react";

export const NotVerified = ({
  size = 24,
  color = "currentcolor",
  strokeWidth = 2,
  ...props
}: LucideProps): JSX.Element => {
  return (
    <svg
      className="lucide lucide-not-verified"
      width={size}
      height={size}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 3a3.6 3.6 0 0 0-3.05 1.68 3.6 3.6 0 0 0-.9-.1 3.6 3.6 0 0 0-2.42 1.06 3.6 3.6 0 0 0-.94 3.32A3.6 3.6 0 0 0 3 12a3.6 3.6 0 0 0 1.69 3.05 3.6 3.6 0 0 0 .95 3.32 3.6 3.6 0 0 0 3.35.96A3.6 3.6 0 0 0 12 21a3.6 3.6 0 0 0 3.04-1.67 3.6 3.6 0 0 0 4.3-4.3A3.6 3.6 0 0 0 21 12a3.6 3.6 0 0 0-1.67-3.04v0a3.6 3.6 0 0 0-4.3-4.3A3.6 3.6 0 0 0 12 3z" />
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );
};
