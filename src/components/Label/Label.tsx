import type { HTMLAttributes, ReactElement } from "react";
import { css, cva } from "../../../styled-system/css";
import { Text } from "../Text/Text";
import type { ButtonProps } from "../Button/Button";
import type { TextInputProps } from "../TextInput/TextInput";
import type { CheckboxProps } from "../Checkbox/Checkbox";
import type { RadioGroupProps } from "../RadioGroup/RadioGroup";

type LabelTone = "danger" | "neutral";
type LabelVariant = "default" | "required" | "optional";

// Label태그와 연결 가능한 요소들
export type LabelFormChild =
  | ReactElement<ButtonProps>
  | ReactElement<CheckboxProps>
  | ReactElement<RadioGroupProps>
  | ReactElement<TextInputProps>;

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** 라벨과 연결된 요소 */
  children?: LabelFormChild;
  /** 라벨 텍스트 */
  labelText: string;
  /** 색조 */
  tone?: LabelTone;
  /** 라벨 비활성화 여부 */
  disabled?: boolean;
  /** 라벨 종류 (기본/필수/옵션선택) */
  variant?: LabelVariant;
  /** 보조설명문 텍스트 */
  description?: string;
  /** 라벨과 연결된 요소의 id */
  htmlFor?: string;
}

/**
 * - `children` 속성을 통해서 자식 요소는 `Button`, `Checkbox`, `RadioGroup`, `TextInput` 컴포넌트가 올 수 있습니다. (form요소 컴포넌트 추가 개발 시, 업데이트 예정)
 * - `labelText` 속성을 통해서 라벨의 텍스트를 지정할 수 있습니다.
 * - `tone` 속성을 통해서 색상 강조를 지정할 수 있습니다.
 * - `disabled` 속성을 통해서 라벨의 비활성화 여부를 설정할 수 있습니다.
 * - `variant` 속성을 통해서 라벨의 종류(기본/필수/옵션선택)를 선택할 수 있습니다.
 * - `description` 속성을 통해서 보조설명문을 추가할 수 있습니다.
 * - `htmlFor` 속성을 통해서 라벨과 연결할 요소의 id를 지정할 수 있습니다.
 */
export const Label = ({
  children,
  labelText,
  tone = "neutral",
  variant = "default",
  disabled = false,
  description,
  ...rest
}: LabelProps) => {
  return (
    <label
      className={styles({
        tone: disabled ? undefined : tone,
        variant,
        disabled,
      })}
      {...rest}
    >
      {labelText}
      {variant === "required" && (
        <span
          aria-label="옵션 필수"
          className={css({
            color: disabled ? "fg.neutral.disabled" : "fg.danger",
          })}
        >
          {" "}
          *
        </span>
      )}
      {variant === "optional" && (
        <span aria-label="옵션 선택"> (옵션 선택)</span>
      )}
      {children}
      {description && <br />}
      {description && <Text>{description}</Text>}
    </label>
  );
};

const styles = cva({
  variants: {
    variant: {
      default: {},
      required: {},
      optional: {},
    },
    tone: {
      danger: {
        color: "fg.danger",
      },
      neutral: {
        color: "fg.neutral.DEFAULT",
      },
    },
    disabled: {
      true: {
        color: "fg.neutral.disabled",
      },
      false: {},
    },
    isDescription: {
      true: {},
      false: {},
    },
  },
});
