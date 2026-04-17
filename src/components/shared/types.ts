/** 폼 필드 공통 속성 */
export interface FieldProps {
  /** 필수 입력 여부 */
  required?: boolean;
  /** 오류 상태 여부 */
  invalid?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 TODO: 각 컴포넌트에 readOnly 지원 구현 (#935) */
  readOnly?: boolean;
  /** 필드 레이블 텍스트 */
  label?: string;
  /** 필드 하단 도움말 메시지 */
  helperText?: string;
  /** 오류 메시지 (helperText보다 우선 표시되며 항상 위험 색조 스타일을 사용한다) */
  errorMessage?: string;
}
