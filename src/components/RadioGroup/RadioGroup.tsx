export interface RadioGroupProps {
  options: { label: string; value: string }[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name: string;
  required?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  loop?: boolean;
}

// eslint-disable-next-line no-empty-pattern
export const RadioGroup = ({}: RadioGroupProps) => {
  // Component implementation will be added later
  return null;
};
