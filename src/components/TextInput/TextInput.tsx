import type { InputHTMLAttributes } from "react";
import type { Tone } from "../../tokens/colors";

type TextInputSize = "sm" | "md" | "lg";

export interface TextInput
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 입력유형 */
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: TextInputSize;
  /** 값 */
  value?: string;
  /** 변경 이벤트 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 텍스트인풋 활성화 여부 */
  disabled?: boolean;
  /** 안내문구 */
  placeholder?: string;
  /** 읽기모드 활성화 여부 */
  readOnly?: boolean;
}

/**
 * 텍스트를 입력할 수 있는 인풋 컴포넌트입니다.
 *
 * - `type` 속성으로 이메일, 비밀번호, 숫자, 전화번호 등 다양한 입력 유형을 지정할 수 있습니다.
 * - `tone` `size` 디자인 시스템 기반의 스타일 제어가 가능합니다.
 * - `value` `onChange` 속성을 통해 외부에서 입력값을 제어할 수 있습니다.
 * - `disabled` `placeholder` `readOnly` 등 자주사용하는 속성들을 지원합니다.
 */
