import type { InputHTMLAttributes } from "react";
import type { Tone } from "../../tokens/colors";
import type { FontSize, FontWeight } from "../../tokens/typography";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "accept"
    | "alt"
    | "checked"
    | "formAction"
    | "formEncType"
    | "formMethod"
    | "formNoValidate"
    | "formTarget"
    | "height"
    | "popoverTarget"
    | "popoverTargetAction"
    | "src"
    | "width"
    | "size"
  > {
  /** 타입 */
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 낮출지 */
  muted?: boolean;
}

/**
 * - `type` 속성으로 인풋 타입을 지정할 수 있습니다.
 * - `tone` 속성으로 인풋 색상 강조를 지정할 수 있습니다.
 * - `size` 속성으로 인풋 텍스트 크기와 인풋 높이를 지정할 수 있습니다.
 * - `weight` 속성으로 인풋 텍스트 굵기를 지정할 수 있습니다.
 * - `muted` 속성으로 인풋의 명암비를 지정할 수 있습니다.
 */

// TODO Input 컴포넌트를 구현하라
