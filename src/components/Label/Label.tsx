import type { HTMLAttributes } from "react";
import { cva } from "../../../styled-system/css";
import { Text } from "../Text/Text";
import { css } from "../../../styled-system/css";
import type React from "react";

type LabelTone = "danger" | "neutral";
type LabelVariant = "default" | "required" | "optional";

// Label태그와 연결 가능한 요소들
export type LabelFormChild =
  | React.ReactElement<React.JSX.IntrinsicElements["input"], "input">
  | React.ReactElement<React.JSX.IntrinsicElements["textarea"], "textarea">
  | React.ReactElement<React.JSX.IntrinsicElements["select"], "select">
  | React.ReactElement<React.JSX.IntrinsicElements["button"], "button">
  | React.ReactElement<React.JSX.IntrinsicElements["meter"], "meter">
  | React.ReactElement<React.JSX.IntrinsicElements["output"], "output">
  | React.ReactElement<React.JSX.IntrinsicElements["progress"], "progress">;

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** 라벨이 연결된 요소 */
  children?: LabelFormChild;
  /** 라벨 텍스트 */
  labelText: string;
  /** 색조 */
  tone?: LabelTone;
  /** 라벨 비활성화 여부 */
  disabled?: boolean;
  /** 라벨 종류 (기본/필수/옵션선택) */
  variant?: LabelVariant;
  /** 보조설명문 표시 여부 */
  isDescription?: boolean;
  /** 보조설명문 텍스트 */
  description?: string;
  /** 라벨이 연결된 요소의 id */
  htmlFor?: string;
}

/**
 * - `children` 속성을 통해서 자식 요소는 `button`, `input`, `meter`, `output`, `progress`, `select`, `textarea` 태그만 올 수 있습니다.
 * - `labelText` 속성을 통해서 라벨의 텍스트를 지정할 수 있습니다.
 * - `tone` 속성을 통해서 색상 강조를 지정할 수 있습니다.
 * - `disabled` 속성을 통해서 라벨의 비활성화 여부를 설정할 수 있습니다.
 * - `variant` 속성을 통해서 라벨의 종류(기본/필수/옵션선택)를 선택할 수 있습니다.
 * - `isDescription` 속성을 통해서 보조설명문 표시 여부를 설정할 수 있습니다.
 *   - `isDescription` 속성이 true인 경우, `description` 속성을 통해서 보조설명문 텍스트를 지정할 수 있습니다.
 * - `htmlFor` 속성을 통해서 라벨과 연결할 요소의 id를 지정할 수 있습니다.
 */
export const Label = ({
  children,
  labelText,
  tone = "neutral",
  variant = "default",
  disabled = false,
  isDescription = false,
  description,
  ...rest
}: LabelProps) => {
  return (
    <label
      className={styles({
        tone: disabled ? undefined : tone,
        variant,
        disabled,
        isDescription,
      })}
      {...rest}
    >
      {labelText}
      {variant === "required" && (
        <span
          className={css({
            color: disabled ? "fg.neutral.disabled" : "fg.danger",
          })}
        >
          {" "}
          *
        </span>
      )}
      {variant === "optional" && <span> (옵션 선택)</span>}
      {isDescription && description && <br />}
      {isDescription && description && <Text>{description}</Text>}
      {children}
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
