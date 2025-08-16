import type { HTMLAttributes } from "react";
import { cva } from "../../../styled-system/css";

type LabelTone = "danger" | "neutral";
type LabelVariant = "default" | "required" | "optional";

// label children으로 허용할 타입들
type LabelChildren =
  | string
  | number
  | React.ReactElement<{ id?: string; htmlFor?: string }>;

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** 텍스트 또는 label과 연결 가능한 요소 */
  children: LabelChildren;
  /** 색조 */
  tone?: LabelTone;
  /** 라벨 비활성화 여부 */
  disabled?: boolean;
  /** 종류 */
  variant: LabelVariant;
  /** 설명 여부 */
  isDescription?: boolean;
  /** 설명 텍스트 */
  description?: string;
  /** 라벨이 연결된 요소의 id */
  htmlFor?: string;
}

/**
 * - `variant` 속성을 통해서 라벨의 종류를 선택할 수 있습니다.
 * - `tone` 속성을 통해서 색상 강조를 지정할 수 있습니다.
 * - `disabled` 속성을 통해서 라벨의 비활성화 여부를 설정할 수 있습니다.
 * - `htmlFor` 속성을 통해서 연결할 요소의 id를 지정할 수 있습니다.
 */
export const Label = ({
  children,
  tone = "neutral",
  variant,
  disabled = false,
  isDescription = false,
  ...rest
}: LabelProps) => {
  return (
    <label
      className={styles({ tone, variant, disabled, isDescription })}
      {...rest}
    >
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
