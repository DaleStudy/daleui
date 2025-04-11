import { test } from "vitest";

test.todo("RadioGroup이 올바르게 자식 요소와 함께 렌더링됨");
test.todo(
  "RadioGroup.Item이 RadioGroup.Root 외부에서 사용될 경우 에러가 발생함"
);
test.todo("최소 1개의 RadioGroup.Item이 필요함");
test.todo("RadioGroup.Root의 name 속성이 올바르게 설정됨");

test.todo("RadioGroup.Item의 value가 올바르게 동작함");
test.todo("RadioGroup.Item의 disabled 속성이 올바르게 적용됨");
test.todo("RadioGroup.Item 선택 시 onChange가 호출됨");

test.todo("defaultValue가 제공될 때 해당 값이 선택됨");
test.todo("defaultValue가 제공되지 않을 때 아무것도 선택되지 않음");
test.todo("value와 defaultValue가 모두 제공될 때 value가 우선시됨");

test.todo("Root의 disabled가 true일 때 모든 RadioGroup.Item이 비활성화됨");
test.todo("Item의 disabled가 true일 때 해당 아이템만 비활성화됨");

test.todo("required가 true일 때 필수 입력으로 표시됨");

test.todo("orientation이 'horizontal'일 때 RadioGroup.Item이 가로로 배열됨");
test.todo("orientation이 'vertical'일 때 RadioGroup.Item이 세로로 배열됨");

test.todo("키보드 방향키로 RadioGroup.Item 간 이동이 가능함");
test.todo("Tab 키로 RadioGroup에 초점을 맞출 수 있음");

test.todo("폼 제출 시 선택된 RadioGroup 값이 올바르게 전송됨");
test.todo("폼 리셋 시 RadioGroup이 defaultValue로 초기화됨");

test.todo("RadioGroup.Item이 동적으로 추가/제거될 때 정상 작동함");
test.todo("RadioGroup.Item 사이에 다른 컴포넌트가 있어도 올바르게 작동함");

test.todo("tone prop에 따라 올바른 색상이 적용됨");
