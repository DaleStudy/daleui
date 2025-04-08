export interface RadioGroupProps {
  /**
   * 라디오 옵션 배열: 각 옵션은 label(표시 텍스트)과 value(실제 값)를 포함합니다.
   */
  options: { label: string; value: string }[];

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
  onValueChange?: (value: string) => void;

  /**
   * 비활성화 여부: true이면 모든 라디오 버튼이 비활성화되어 상호작용을 차단합니다.
   * @default false
   */
  disabled?: boolean;

  /**
   * 폼 입력 이름: 동일한 그룹의 라디오 버튼들이 공유하는 이름을 지정합니다.
   */
  name: string;

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

  /**
   * 컴포넌트 내 Label과 Indicator의 정렬 방향을 결정합니다.
   * 'ltr'은 왼쪽 정렬(왼쪽에서 오른쪽으로), 'rtl'은 오른쪽 정렬(오른쪽에서 왼쪽으로)입니다.
   * @default "ltr"
   */
  dir?: "ltr" | "rtl";

  /**
   * 순환 여부: true이면 마지막 항목에서 첫 항목으로 순환할 수 있습니다.
   * 방향키를 사용한 탐색 시 순환 효과를 제공합니다.
   * @default false
   */
  loop?: boolean;
}

// eslint-disable-next-line no-empty-pattern
export function RadioGroup({}: RadioGroupProps) {
  // TODO: RadioGroup 컴포넌트 구현
  return null;
}
