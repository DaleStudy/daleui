import type { ReactNode } from "react";
import type { Tone } from "../../tokens/colors";

export interface RadioGroupProps {
  /**
   * 라디오 버튼의 옵션 목록입니다.
   * 2개 이상의 옵션을 제공해야 합니다.
   */
  options: {
    label: ReactNode;
    value: string;
    /**
     * @default false
     */
    disabled?: boolean;
  }[];

  /**
   * 폼 입력 이름: 동일한 그룹의 라디오 버튼들이 공유하는 이름을 지정합니다.
   */
  name: string;

  /**
   * 기본 선택값: 컴포넌트 초기 렌더링 시 선택될 값을 지정합니다.
   * @default undefined
   */
  defaultValue?: string;

  /**
   * 현재 선택된 값: 외부에서 값을 직접 관리할 때 사용합니다.
   * @default undefined
   */
  value?: string;

  /**
   * 값 변경 핸들러: 사용자가 선택을 변경할 때 호출되는 콜백 함수입니다.
   * @default undefined
   */
  onChange?: (value: string) => void;

  /**
   * 비활성화 여부: true이면 모든 라디오 버튼이 비활성화되어 상호작용을 차단합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 필수 여부: true일 경우 사용자가 하나의 옵션을 반드시 선택해야 합니다.
   * @default undefined
   */
  required?: boolean;

  /**
   * 라디오 그룹의 배치 방향을 결정합니다.
   * 'horizontal'은 가로 배열, 'vertical'은 세로 배열을 의미합니다.
   * @default undefined
   */
  orientation?: "horizontal" | "vertical";

  /** 색조 */
  tone?: Tone;
}

// eslint-disable-next-line no-empty-pattern
export function RadioGroup({}: RadioGroupProps) {
  // TODO: RadioGroup 컴포넌트 구현
  return null;
}
