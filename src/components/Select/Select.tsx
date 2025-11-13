/* eslint-disable react-refresh/only-export-components */
interface SelectRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
  required?: boolean;
  invalid?: boolean;
  name?: string;
  clearable?: boolean;
  "data-testid"?: string;
  children: React.ReactNode;
}
const Root = (props: SelectRootProps) => {
  return <div {...props}></div>;
};

interface SelectTriggerProps {
  placeholder?: string;
  "aria-label"?: string;
  "data-testid"?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
}

const Trigger = (props: SelectTriggerProps) => {
  return <button {...props}></button>;
};

interface SelectContentProps {
  children: React.ReactNode;
  "data-testid"?: string;
}
const Content = (props: SelectContentProps) => {
  return <div {...props}></div>;
};

interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
  "data-testid"?: string;
}

const Item = (props: SelectItemProps) => {
  return <button {...props}></button>;
};

export const Select = {
  Root,
  Trigger,
  Content,
  Item,
};
