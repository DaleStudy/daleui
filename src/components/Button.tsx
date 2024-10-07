import "./Button.css";

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

export const Button = ({
  children,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
