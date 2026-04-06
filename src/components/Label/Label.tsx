import type { HTMLAttributes, ReactElement } from "react";
import { css, cva } from "../../../styled-system/css";
import type { ButtonProps } from "../Button/Button";
import type { TextInputProps } from "../TextInput/TextInput";
import type { CheckboxProps } from "../Checkbox/Checkbox";
import type { RadioGroupProps } from "../RadioGroup/RadioGroup";

type LabelTone = "danger" | "neutral";

// Label태그와 연결 가능한 요소들
export type LabelFormChild =
  | ReactElement<ButtonProps>
  | ReactElement<CheckboxProps>
  | ReactElement<RadioGroupProps>
  | ReactElement<TextInputProps>;

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /** 연결할 폼 자식 요소 */
  children?: LabelFormChild;
  /** 라벨 문구 */
  labelText: string;
  /** 색조 */
  tone?: LabelTone;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 필수 입력 여부 (true일 경우 별표(*) 표시) */
  required?: boolean;
  /** 연결 대상 요소 id */
  htmlFor?: string;
}

/**
 * 라벨(Label)은 입력 요소(TextInput, Select, Checkbox 등)에 이름을 부여해 사용자가 해당 필드의 목적을 명확하게 이해하도록 돕는 텍스트 컴포넌트입니다.
 *
 * 입력 요소 없이 단독으로 사용할 수도 있고, `children`으로 입력 요소를 전달하여 라벨과 연결할 수도 있습니다.
 *
 * `htmlFor` 속성을 사용하면 라벨 외부에 있는 입력 요소와도 연결할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이 컴포넌트는 `<label>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
 * - `required`를 true로 설정하면 별표(*)와 함께 `aria-label="옵션 필수"`가 자동으로 추가됩니다.
 * - `disabled` 상태에서도 `required` 별표는 표시되지만, 비활성화 색상으로 변경됩니다.
 * - `htmlFor` 속성을 사용해 라벨과 입력 요소를 명시적으로 연결하면, 라벨을 클릭했을 때 해당 입력 요소로 포커스가 이동합니다. 또한 `<label>` 내부에 입력 요소를 직접 포함하는 방식으로도 동일하게 연결할 수 있습니다.
 */
export function Label({
  children,
  labelText,
  tone = "neutral",
  required = false,
  disabled = false,
  ...rest
}: LabelProps) {
  return (
    <label
      className={styles({
        tone: disabled ? undefined : tone,
        disabled,
      })}
      {...rest}
    >
      <span className={css({ textStyle: "label.md.strong" })}>{labelText}</span>
      {required && (
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
      {children && <div className={css({ marginTop: "8" })}>{children}</div>}
    </label>
  );
}

const styles = cva({
  variants: {
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
  },
});
