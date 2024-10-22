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
      <style>{style}</style>
      {children}
    </button>
  );
};

const style = `@scope {
  & {
    --button-color: #ffffff;
    --button-bg-color: #0d6efd;
    --button-hover-bg-color: #025ce2;

    appearance: none;

    margin: 0;
    padding: 0.5rem 1rem;

    background: var(--button-bg-color);
    color: var(--button-color);

    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;

    display: inline-block;
    width: auto;

    border: none;
    border-radius: 4px;

    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: 0.5s;

    width: 100%;

    &:active,
    &:hover,
    &:focus {
      background: var(--button-hover-bg-color);
      outline: 0;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
}`;
