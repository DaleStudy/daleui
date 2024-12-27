import r2wc from "@r2wc/react-to-web-component";
import { css } from "../../../styled-system/css";

export interface ButtonProps {
  /** 버튼 텍스트 */
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
}

/**
 * 버튼 컴포넌트입니다.
 */
export const Button = ({
  children,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={css({
        "--button-color": "#ffffff",
        "--button-bg-color": "#0d6efd",
        "--button-hover-bg-color": "#025ce2",
        appearance: "none",
        margin: "0",
        padding: "0.5rem 1rem",
        background: "var(--button-bg-color)",
        color: "var(--button-color)",
        fontSize: "1rem",
        fontWeight: 400,
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        width: ["auto", "100%"],
        border: "none",
        borderRadius: "4px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1),\n    0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        cursor: "pointer",
        transition: "0.5s",
        "&:active, &:hover, &:focus": {
          background: "var(--button-hover-bg-color)",
          outline: "0",
        },
        "&:disabled": { opacity: 0.5 },
      })}
      type={type}
      onClick={() => {
        console.log("Button clicked!");
        onClick?.();
      }}
      {...rest}
    >
      {children}
    </button>
  );
};

const WcButton = r2wc(Button, {
  props: {
    children: "string",
  },
});

customElements.define("wc-button", WcButton);
