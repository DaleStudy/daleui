import { button } from "./Button.css.ts";
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
    <button className={button} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
