# daleui 컴포넌트 레퍼런스

> 자동 생성 — 수동 편집하지 마세요.

## Box

Box는 가장 기본적인 레이아웃 컴포넌트입니다.

- `className` 속성을 통해서 추가 스타일을 적용할 수 있습니다.
- `as="span"`을 사용할 경우, span은 기본적으로 `inline` 요소이므로 `width`와 `height` 속성이 적용되지 않습니다.

**접근성(Accessibility) 안내**
- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.

`import { Box } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| children | `React.ReactNode` | - | 자식 요소 |
| as | `As \| undefined` | `"div"` | 렌더링 태그 |
| padding | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 안쪽 여백 |
| margin | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 바깥 여백 |
| width | `CSSLength \| undefined` | - | 너비 (예: "100px", "2rem", "2em", "50%") |
| height | `CSSLength \| undefined` | - | 높이 (예: "100px", "2rem", "2em", "50%") |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## Button

버튼은 사용자의 명확한 작업 실행을 위해 사용되는 컴포넌트로, 완료, 저장, 제출과 같은 액션에 사용합니다.

`import { Button } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `import("react").ReactNode` | - | 버튼 내용 |
| disabled | `boolean \| undefined` | - | 비활성화 여부 |
| fullWidth | `boolean \| undefined` | - | 전체 너비 여부 |
| loading | `boolean \| undefined` | - | 로딩 표시 여부 |
| size | `size \| undefined` | `"md"` | 크기 |
| tone | `"brand" \| "neutral" \| "danger" \| undefined` | `"brand"` | 색조 |
| type | `"button" \| "submit" \| "reset" \| undefined` | `"button"` | 네이티브 button 타입 |
| variant | `"solid" \| "outline" \| "ghost" \| undefined` | `"solid"` | 스타일 변형 |
| ref | `Ref<HTMLButtonElement> \| undefined` | - | 요소 참조 |

## Card

Card의 최상위 컨테이너입니다. `tone`은 하위 `Card.Icon`과 `Card.Link`에 자동으로 전달됩니다.

`import { Card } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| tone | `"brand" \| "neutral" \| undefined` | - | 색조 |
| outline | `boolean \| undefined` | - | 테두리 표시 여부 |
| **children** | `ReactNode` | - | 자식 요소 |
| ref | `Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## Checkbox

체크박스(Checkbox)는 사용자가 하나 이상을 중복 선택할 수 있도록 지원하는 인터페이스 구성 요소입니다.
개별 항목의 상태를 '선택(Checked)' 또는 '해제(Unchecked)'로 변경하는 기능을 수행합니다.

`import { Checkbox } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| label | `string \| undefined` | - | 라벨 내용 |
| name | `string \| undefined` | - | 폼 name |
| value | `string \| undefined` | - | 폼 제출 값. CheckboxGroup 내부에서 항목을 식별하는 데 사용됩니다. |
| checked | `boolean \| undefined` | - | 제어 모드 체크 여부 |
| defaultChecked | `boolean \| undefined` | - | 비제어 모드 초기 체크 여부 |
| tone | `CheckboxTone \| undefined` | `"brand"` | 체크박스의 색조 |
| onChange | `((checked: boolean) => void) \| undefined` | - | 체크 상태 변경 시 호출되는 콜백 (controlled 모드) |
| ref | `React.Ref<HTMLInputElement> \| undefined` | - | 입력 요소 참조 |

## CheckboxGroup


`import { CheckboxGroup } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `ReactNode` | - | 자식 요소 |
| **name** | `string` | - | 그룹 공유 name |
| **label** | `string` | - | 그룹 레이블 |
| defaultValues | `string[] \| undefined` | - | 비제어 모드 초기 선택 값 목록 |
| values | `string[] \| undefined` | - | 제어 모드 선택 값 목록 |
| onChange | `((values: string[]) => void) \| undefined` | - | 선택 값 변경 핸들러 |
| orientation | `"horizontal" \| "vertical" \| undefined` | - | 배치 방향 (horizontal \| vertical) |
| tone | `CheckboxGroupTone \| undefined` | - | 색상 강조를 지정합니다. |
| ref | `Ref<HTMLDivElement> \| undefined` | - | 요소 참조 |
| helperText | `string \| undefined` | - | 그룹 하단에 표시할 보조 또는 에러 메시지입니다. |

## Flex

CSS Flexbox 레이아웃을 위한 컨테이너 컴포넌트입니다.

- `direction`: `row`(기본값) | `rowReverse` | `column` | `columnReverse`
- `justify`: `start`(기본값) | `center` | `end` | `between` | `around`
- `align`: `stretch`(기본값) | `start` | `center` | `end`

**접근성(Accessibility) 안내**
- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
- 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
- reverse 방향(rowReverse, columnReverse)을 사용할 경우, 화면에 보여지는 시각적 순서와 DOM의 순서가 다를 수 있습니다.

**레이아웃 컴포넌트 사용 가이드 (Flex · HStack · VStack)**

**HStack**과 **VStack**은 `Flex`에서 **자주 쓰는 한 줄·한 열 패턴**을 전용 컴포넌트로 추상화한 것입니다. 둘 다 **`align` 기본값이 `center`**이고, **`Flex`의 `align` 기본(`stretch`)**과 다릅니다. 교차축 가운데 정렬이 필요한 UI를 기본값만으로 맞추기 쉽습니다.

- **HStack** — 가로 한 줄. 내부적으로 `direction="row"`, 기본 `justify="left"`, `align="center"`.
- **VStack** — 세로 한 열. 내부적으로 `direction="column"`, 기본 `justify="top"`, `align="center"`.
- **Flex** — `direction` 전환이 필요하거나, 교차축 정렬이 가운데가 아닐 때(`stretch`·`start`·`end` 등) 사용합니다.

`import { Flex } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `React.ReactNode` | - | 자식 요소 |
| as | `As \| undefined` | `"div"` | 렌더링 태그 |
| gap | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 자식 간 간격 |
| padding | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 안쪽 여백 |
| role | `React.AriaRole \| undefined` | - | ARIA 역할 |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## Grid

CSS Grid 레이아웃을 위한 컨테이너 컴포넌트입니다.
- `gridTemplateColumns`, `gridTemplateRows`, `gap`, `areas` 등 CSS Grid 관련 props를 통해 레이아웃을 설정할 수 있습니다.

**접근성(Accessibility) 안내**
- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
- 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.

`import { Grid } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `React.ReactNode` | - | 자식 요소 |
| as | `As \| undefined` | `"div"` | 렌더링 태그 |
| gridTemplateColumns | `string \| undefined` | - | 열 템플릿 (grid-template-columns) |
| gridTemplateRows | `string \| undefined` | - | 행 템플릿 (grid-template-rows) |
| gap | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 자식 간 간격 |
| padding | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | - | 안쪽 여백 |
| areas | `Areas \| undefined` | - | 영역 이름 (grid-template-areas, GridItem.gridArea와 함께 사용) |
| autoFlow | `"row" \| "column" \| "rowDense" \| "columnDense" \| undefined` | `"row"` | 자동 배치 흐름 (grid-auto-flow) |
| justifyItems | `"end" \| "start" \| "center" \| "stretch" \| undefined` | `"stretch"` | 아이템 주축 정렬 (justify-items) |
| alignItems | `"end" \| "start" \| "center" \| "stretch" \| undefined` | `"stretch"` | 아이템 교차축 정렬 (align-items) |
| justifyContent | `"end" \| "start" \| "center" \| "stretch" \| "between" \| "around" \| undefined` | - | 컨테이너 주축 정렬 (justify-content) |
| alignContent | `"end" \| "start" \| "center" \| "stretch" \| "between" \| "around" \| undefined` | - | 컨테이너 교차축 정렬 (align-content) |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## Heading

페이지의 제목이나 섹션의 구조를 표현하기 위해 사용하는 컴포넌트입니다.
두 가지 색상 톤을 제공하며, 뷰포인트에 따라 크기가 유동적으로 변경되도록 설계되어 있습니다.

- `size`와 `level`이 함께 지정되면 `size`가 시각적 크기를 결정하고, `level`은 HTML 태그(`<h1>`–`<h5>`) 선택에만 사용됩니다.
예를 들어 `size` 속성은 2, `level` 속성은 1인 경우, `<h1>` 태그이지만 `size` 속성이 2에 해당하는 스타일이 적용됩니다.
- 반응형 폰트를 지원하여 뷰포트에 따라 글꼴 크기가 자동으로 전환됩니다.

`import { Heading } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `React.ReactNode` | - | 제목 내용 |
| **level** | `Level` | - | 제목 단계 (h1–h5) |
| size | `HeadingSize \| undefined` | - | 표시 크기 |
| tone | `HeadingTone \| undefined` | `"neutral"` | 색조 |
| align | `Align \| undefined` | - | 텍스트 정렬 |
| wordBreak | `WordBreak \| undefined` | - | 줄바꿈 규칙 |
| ref | `React.Ref<HTMLHeadingElement> \| undefined` | - | 요소 참조 |

## HStack

Flex의 가로 배치 패턴(`direction="row"`, `align="center"`)을 의미 있는 이름과 기본값으로 묶은 컴포넌트입니다.

한 컨테이너에서 `direction`을 바꿔 쓸 때, 교차축 정렬이 가운데가 아닐 때, **Flex 컴포넌트**를 권장합니다.

**접근성(Accessibility) 안내**
- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.

`import { HStack } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| reversed | `boolean \| undefined` | `false` | 가로 역방향 배치 여부 |
| justify | `"left" \| "right" \| "center" \| "between" \| "around" \| undefined` | `"left"` | 가로 정렬 |
| align | `"bottom" \| "top" \| "center" \| "stretch" \| undefined` | `"center"` | 세로 정렬 |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## Icon

아이콘은 사용자의 이해를 돕고 행동을 유도하기 위해 사용하는 시각적 언어입니다.
시스템 전반에서 일관되게 사용되며,  페이지와 컴포넌트 내에서 정보를 함축적으로 전달하는 재사용 가능한 벡터 그래픽 심볼입니다.

- 기본 크기는 `md`(1.25rem)이며, `tone`을 지정하지 않으면 부모 요소의 색상을 상속합니다.
- `solid`는 `tone`과 함께 사용해야 적용됩니다.

`import { Icon } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **name** | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark"` | - | 아이콘 이름 |
| tone | `Tone \| undefined` | - | 색조 |
| size | `"sm" \| "md" \| "lg" \| "xs" \| undefined` | - | 크기 |
| solid | `boolean \| undefined` | - | 솔리드 여부 |

## Label

라벨(Label)은 입력 요소(TextInput, Select, Checkbox 등)에 이름을 부여해 사용자가 해당 필드의 목적을 명확하게 이해하도록 돕는 텍스트 컴포넌트입니다.

입력 요소 없이 단독으로 사용할 수도 있고, `children`으로 입력 요소를 전달하여 라벨과 연결할 수도 있습니다.

`htmlFor` 속성을 사용하면 라벨 외부에 있는 입력 요소와도 연결할 수 있습니다.

**접근성(Accessibility) 안내**
- 이 컴포넌트는 `<label>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
- `required`를 true로 설정하면 별표(*)와 함께 스크린 리더용 `aria-label="옵션 필수"` 텍스트가 자동으로 추가됩니다.
- `disabled` 상태에서도 `required` 별표는 표시되지만, 비활성화 색상으로 변경됩니다.
- `htmlFor` 또는 `children`으로 입력 요소를 연결하면, 라벨 클릭 시 해당 입력 요소로 포커스가 이동합니다.

`import { Label } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| children | `LabelFormChild \| undefined` | - | 연결할 폼 자식 요소 |
| **labelText** | `string` | - | 라벨 문구 |
| tone | `LabelTone \| undefined` | `"neutral"` | 색조 |
| disabled | `boolean \| undefined` | `false` | 비활성화 여부 |
| required | `boolean \| undefined` | `false` | 필수 입력 여부 (true일 경우 별표(*) 표시) |
| htmlFor | `string \| undefined` | - | 연결 대상 요소 id |
| ref | `Ref<HTMLLabelElement> \| undefined` | - | 요소 참조 |

## Link

링크는 사용자를 다른 페이지, 동일 페이지 내의 특정 위치, 또는 외부 리소스로 이동시키는 네비게이션(Navigation) 요소입니다.
사용자의 특정 행동을 유도할 때에는 버튼을 사용합니다.

아이콘 등 컴포넌트를 함께 사용할 때 링크와 다른 `tone`, `size`를 사용하지 않도록 주의합니다.

**접근성(Accessibility) 안내**
- 이 컴포넌트는 `<a>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
- `external`을 true로 설정하면 `target="_blank"`가 적용됩니다. `target`이 `"_blank"`인 경우 reverse tabnabbing 방지를 위해 직접 지정한 `rel` 값과 무관하게 `noopener noreferrer`가 항상 병합되어 적용됩니다.
- `javascript:`, `data:` 등 안전하지 않은 URL scheme의 `href`는 자동으로 차단되어 `#`로 대체됩니다.
- 키보드 포커스 시 명확한 아웃라인이 표시됩니다.
- 텍스트가 없는 이미지나 아이콘만 사용하는 경우, 반드시 `aria-label` 속성을 추가하여 대체 텍스트를 제공하는 것을 권장합니다.
- `external`이 true일 때, 외부 링크 아이콘(`externalLink`)을 함께 제공하지 않으면 시각적 안내 부족으로 접근성 문제가 발생할 수 있습니다.

`import { Link } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **href** | `string` | - | 대상 URL |
| **children** | `import("react").ReactNode` | - | 링크 내용 |
| tone | `LinkTone \| undefined` | `"brand"` | 색조 |
| size | `LinkSize \| undefined` | `"md"` | 크기 |
| underline | `boolean \| undefined` | `true` | 밑줄 표시 여부 |
| external | `boolean \| undefined` | `false` | 외부 링크·새 탭 열기 여부 |
| ref | `Ref<HTMLAnchorElement> \| undefined` | - | 요소 참조 |

## PasswordInput

패스워드 인풋은 로그인이나 계정 인증 과정에서 사용자의 비밀번호를 안전하게 입력하도록 지원하는 보안 입력 필드입니다.

- 토글 버튼은 키보드 및 스크린 리더를 지원합니다.

`import { PasswordInput } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| placeholder | `string \| undefined` | `"패스워드를 입력해주세요."` | 플레이스홀더 |
| value | `string \| undefined` | - | 제어 모드 입력 값 |
| defaultValue | `string \| undefined` | - | 비제어 모드 초기 입력값 |
| onChange | `((e: React.ChangeEvent<HTMLInputElement>) => void) \| undefined` | - | 변경 이벤트 핸들러 |
| ref | `Ref<HTMLInputElement> \| undefined` | - | 입력 요소 참조 |

## RadioGroup


`import { RadioGroup } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `ReactNode` | - | 자식 요소 |
| **name** | `string` | - | 그룹 공유 name |
| **label** | `string` | - | 그룹 레이블 |
| defaultValue | `string \| undefined` | - | 비제어 모드 초기 선택 값 |
| value | `string \| undefined` | - | 제어 모드 선택 값 |
| onChange | `((value: string) => void) \| undefined` | - | 선택 값 변경 핸들러 |
| orientation | `"horizontal" \| "vertical" \| undefined` | - | 배치 방향 (horizontal \| vertical) |
| tone | `RadioGroupTone \| undefined` | - | 색조 |
| hint | `string \| undefined` | - | 레이블 보조 텍스트 |

## Select

셀렉트는 미리 정의된 여러 옵션 중 하나를 사용자가 선택하도록 하기 위한 컴포넌트입니다.
- 네이티브 select 태그를 사용하는 Select 컴포넌트입니다.
- 여러 선택지 중 하나를 고를 때 사용하며, 화면 공간을 절약하고 옵션 목록을 펼쳤을 때만 표시하고 싶을 때 적합합니다.
- 선택지가 적은 경우(5개 이하)에는 RadioGroup 컴포넌트 사용을 권장합니다.
- `children`으로 `<option>` 요소를 직접 전달합니다.

**접근성(Accessibility) 안내**
- `Label` 컴포넌트를 연결하거나 `aria-label`을 설정하여 역할을 명시적으로 설명해주세요.
- `invalid`를 true로 설정하면 `aria-invalid`, `required`를 true로 설정하면 `aria-required`가 자동으로 추가됩니다.

`import { Select } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| clearButtonName | `string \| undefined` | - | 지우기 버튼 접근성 이름 (aria-label) |
| placeholder | `string \| undefined` | - | 플레이스홀더 |
| value | `string \| undefined` | - | 제어 모드 선택 값 |
| defaultValue | `string \| undefined` | - | 비제어 모드 초기 선택 값 |
| onChange | `((e: React.ChangeEvent<HTMLSelectElement>) => void) \| undefined` | - | 변경 이벤트 핸들러 |
| "aria-label" | `string \| undefined` | - | 접근성 레이블 (aria-label) |
| name | `string \| undefined` | - | 폼 name |
| ref | `Ref<HTMLSelectElement> \| undefined` | - | select 요소 참조 |

## Text

텍스트 컴포넌트입니다.
- `as` 속성으로 어떤 HTML 태그를 사용할지 지정할 수 있습니다.
- `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요.

`import { Text } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| **children** | `React.ReactNode` | - | 텍스트 내용 |
| as | `"div" \| "span" \| "p" \| "strong" \| "em" \| "small" \| undefined` | - | 렌더링 태그 |
| tone | `Tone \| undefined` | `"neutral"` | 색조 |
| size | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "xs" \| "3xl" \| "4xl" \| "5xl" \| undefined` | - | 글자 크기 |
| weight | `"normal" \| "medium" \| "semibold" \| "bold" \| undefined` | - | 글자 굵기 |
| muted | `boolean \| undefined` | `false` | 흐린 톤(muted) 적용 여부 |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |

## TextInput

텍스트 인풋은 사용자가 이름, 이메일, 검색어 등 텍스트 정보를 직접 입력할 수 있도록 제공되는 입력 컴포넌트입니다.

`import { TextInput } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| leadingIcon | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark" \| undefined` | - | 선행 아이콘 이름 (Icon.name) |
| trailingIcon | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark" \| undefined` | - | 후행 아이콘 이름 (Icon.name) |
| placeholder | `string \| undefined` | - | 플레이스홀더 |
| value | `string \| undefined` | - | 제어 모드 입력 값 |
| defaultValue | `string \| undefined` | - | 비제어 모드 초기 입력값 |
| onChange | `((e: React.ChangeEvent<HTMLInputElement>) => void) \| undefined` | - | 변경 이벤트 핸들러 |
| ref | `Ref<HTMLInputElement> \| undefined` | - | 입력 요소 참조 |

## VStack

Flex의 세로 배치 패턴(`direction="column"`, `align="center"`)을 의미 있는 이름과 기본값으로 묶은 컴포넌트입니다.

한 컨테이너에서 `direction`을 바꿔 쓸 때, 교차축 정렬이 가운데가 아닐 때, **Flex 컴포넌트**를 권장합니다.

**접근성(Accessibility) 안내**
- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
- 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.

`import { VStack } from "daleui"`

| prop | 타입 | 기본값 | 설명 |
| --- | --- | --- | --- |
| reversed | `boolean \| undefined` | `false` | 세로 역방향 배치 여부 |
| justify | `"bottom" \| "top" \| "center" \| "between" \| "around" \| undefined` | `"top"` | 세로 정렬 |
| align | `"left" \| "right" \| "center" \| "stretch" \| undefined` | `"center"` | 가로 정렬 |
| ref | `React.Ref<HTMLElement> \| undefined` | - | 요소 참조 |
