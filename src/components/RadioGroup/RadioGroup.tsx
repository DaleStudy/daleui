import { type ReactNode } from "react";
import type { Tone } from "../../tokens/colors";

interface RadioGroupProps {
  /**
   * RadioGroup의 자식 요소들입니다.
   * RadioGroup.Item 컴포넌트를 포함해야 합니다.
   */
  children: ReactNode;

  /**
   * 폼 입력 이름: 동일한 그룹의 라디오 버튼들이 공유하는 이름을 지정합니다.
   */
  name: string;

  /**
   * 라디오 그룹의 레이블: 라디오 그룹에 대한 설명을 제공합니다.
   * @default undefined
   */
  label?: string;

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

/**
 * RadioGroup의 루트 컴포넌트입니다.
 * 라디오 버튼 그룹을 정의하고 상태를.관리합니다.
 */
// eslint-disable-next-line no-empty-pattern
export function RadioGroup({}: RadioGroupProps) {
  // TODO: 구현
  return null;
}

interface RadioProps {
  /**
   * 라디오 버튼의 값입니다.
   */
  value: string;

  /**
   * 라디오 버튼의 자식 요소입니다.
   */
  children?: ReactNode;

  /**
   * 비활성화 여부: true이면 이 라디오 버튼이 비활성화됩니다.
   * @default false
   */
  disabled?: boolean;
}

/**
 * 라디오 그룹의 개별 항목입니다.
 * 선택 가능한 단일 라디오 버튼을 나타냅니다.
 */
// eslint-disable-next-line no-empty-pattern
export function Radio({}: RadioProps) {
  // TODO: 구현
  return null;
}
