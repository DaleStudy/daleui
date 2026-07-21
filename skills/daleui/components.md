# daleui 컴포넌트 레퍼런스

> 자동 생성 — 수동 편집하지 마세요.

## Box

Box는 가장 기본적인 레이아웃 컴포넌트입니다.

- `className` 속성을 통해서 추가 스타일을 적용할 수 있습니다.
- `as="span"`을 사용할 경우, span은 기본적으로 `inline` 요소이므로 `width`와 `height` 속성이 적용되지 않습니다.

**접근성(Accessibility) 안내**

- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.

`import { Box } from "daleui"`

| prop     | 타입                                                                                                    | 기본값  | 설명                                     |
| -------- | ------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| children | `ReactNode`                                                                                             | -       | 자식 요소                                |
| as       | `As \| undefined`                                                                                       | `"div"` | 렌더링 태그                              |
| padding  | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -       | 안쪽 여백                                |
| margin   | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -       | 바깥 여백                                |
| width    | `CSSLength \| undefined`                                                                                | -       | 너비 (예: "100px", "2rem", "2em", "50%") |
| height   | `CSSLength \| undefined`                                                                                | -       | 높이 (예: "100px", "2rem", "2em", "50%") |
| ref      | `Ref<HTMLElement> \| undefined`                                                                         | -       | 요소 참조                                |

### 예시

**Padding**

```tsx
<VStack
  gap="32"
  className={css({
    width: "300px",
  })}
>
  <div>
    <h4>padding: 16</h4>
    <Box padding="16">Box 컴포넌트</Box>
  </div>

  <div>
    <h4>padding: 32</h4>
    <Box padding="32">Box 컴포넌트</Box>
  </div>
</VStack>
```

**Margin**

```tsx
<VStack
  gap="16"
  className={css({
    width: "300px",
  })}
>
  <div>
    <h4>margin: 16</h4>
    <div
      className={css({
        border: "1px solid gray",
        padding: "4",
      })}
    >
      <Box margin="16" padding="8">
        Box 컴포넌트
      </Box>
    </div>
  </div>
  <div>
    <h4>margin: 32</h4>
    <div
      className={css({
        border: "1px solid gray",
        padding: "4",
      })}
    >
      <Box margin="32" padding="8">
        Box 컴포넌트
      </Box>
    </div>
  </div>
</VStack>
```

**Size**

```tsx
<VStack gap="16">
  <div>
    <h4>100px x 100px</h4>
    <Box width="100px" height="100px" />
  </div>
  <div>
    <h4>10rem x 5rem</h4>
    <Box width="10rem" height="5rem" />
  </div>
  <div>
    <h4>50% x 100px</h4>
    <div className={css({ width: "300px" })}>
      <Box width="100%" height="100px" />
    </div>
  </div>
</VStack>
```

**CardExample**

```tsx
<Flex gap="16">
  <Box
    padding="24"
    className={css({
      bg: "bg.neutral.subtle",
      borderRadius: "lg",
      border: "1px solid",
      borderColor: "border.neutral",
    })}
  >
    <h3 className={css({ textStyle: "label.lg", mb: "8" })}>카드 컴포넌트</h3>
    <p className={css({ textStyle: "body.sm", color: "fg.neutral" })}>
      카드 형태의 박스로 활용할 수 있습니다.
    </p>
  </Box>
</Flex>
```

## Button

버튼은 사용자의 명확한 작업 실행을 위해 사용되는 컴포넌트로, 완료, 저장, 제출과 같은 액션에 사용합니다.

`import { Button } from "daleui"`

| prop         | 타입                                            | 기본값     | 설명                 |
| ------------ | ----------------------------------------------- | ---------- | -------------------- |
| **children** | `ReactNode`                                     | -          | 버튼 내용            |
| disabled     | `boolean \| undefined`                          | -          | 비활성화 여부        |
| fullWidth    | `boolean \| undefined`                          | -          | 전체 너비 여부       |
| loading      | `boolean \| undefined`                          | -          | 로딩 표시 여부       |
| size         | `size \| undefined`                             | `"md"`     | 크기                 |
| tone         | `"brand" \| "neutral" \| "danger" \| undefined` | `"brand"`  | 색조                 |
| type         | `"button" \| "submit" \| "reset" \| undefined`  | `"button"` | 네이티브 button 타입 |
| variant      | `"solid" \| "outline" \| "ghost" \| undefined`  | `"solid"`  | 스타일 변형          |
| ref          | `Ref<HTMLButtonElement> \| undefined`           | -          | 요소 참조            |

### 예시

**Tone**

```tsx
<div className={vstack({ gap: "16" })}>
  <Button variant="ghost" tone="brand">
    브랜드 버튼
  </Button>
  <Button variant="ghost" tone="neutral">
    중립 버튼
  </Button>
  <Button variant="ghost" tone="danger">
    위험 버튼
  </Button>
</div>
```

**Variants**

```tsx
<div className={vstack({ gap: "16" })}>
  <Button tone="neutral" variant="solid">
    솔리드 버튼
  </Button>
  <Button tone="neutral" variant="outline">
    아웃라인 버튼
  </Button>
  <Button tone="neutral" variant="ghost">
    고스트 버튼
  </Button>
</div>
```

**Sizes**

```tsx
<div className={vstack({ gap: "16" })}>
  <Button size="sm">작은 버튼</Button>
  <Button size="md">중간 버튼</Button>
  <Button size="lg">큰 버튼</Button>
</div>
```

**Disabled**

```tsx
<div className={vstack({ gap: "16" })}>
  <Button>활성화 버튼</Button>
  <Button disabled>비활성화 버튼</Button>
</div>
```

**FullWidth**

```tsx
<div className={vstack({ gap: "16" })}>
  <div style={{ border: "2px dashed #ccc", width: "300px" }}>
    <Button>일반 버튼</Button>
  </div>
  <div style={{ border: "2px dashed #ccc", width: "300px" }}>
    <Button fullWidth>가득찬 버튼</Button>
  </div>
</div>
```

**WithIcons**

```tsx
<div className={vstack({ gap: "16" })}>
  <Button>
    <Icon name="star" />
    좌측 아이콘
  </Button>
  <Button>
    우측 아이콘
    <Icon name="search" />
  </Button>
  <Button>
    <Icon name="star" />
    양쪽 아이콘
    <Icon name="search" />
  </Button>
  <Button disabled>
    <Icon name="star" />
    양쪽 아이콘 비활성화
    <Icon name="search" />
  </Button>
</div>
```

**Loading**

```tsx
<Button loading>로딩 버튼</Button>
```

## Card

Card의 최상위 컨테이너입니다. `tone`은 하위 `Card.Icon`과 `Card.Link`에 자동으로 전달됩니다.

`import { Card } from "daleui"`

| prop         | 타입                                | 기본값 | 설명             |
| ------------ | ----------------------------------- | ------ | ---------------- |
| tone         | `"brand" \| "neutral" \| undefined` | -      | 색조             |
| outline      | `boolean \| undefined`              | -      | 테두리 표시 여부 |
| **children** | `ReactNode`                         | -      | 자식 요소        |
| ref          | `Ref<HTMLElement> \| undefined`     | -      | 요소 참조        |

## Checkbox

체크박스(Checkbox)는 사용자가 하나 이상을 중복 선택할 수 있도록 지원하는 인터페이스 구성 요소입니다.
개별 항목의 상태를 '선택(Checked)' 또는 '해제(Unchecked)'로 변경하는 기능을 수행합니다.

`import { Checkbox } from "daleui"`

| prop           | 타입                                        | 기본값    | 설명                                                              |
| -------------- | ------------------------------------------- | --------- | ----------------------------------------------------------------- |
| label          | `string \| undefined`                       | -         | 라벨 내용                                                         |
| name           | `string \| undefined`                       | -         | 폼 name                                                           |
| value          | `string \| undefined`                       | -         | 폼 제출 값. CheckboxGroup 내부에서 항목을 식별하는 데 사용됩니다. |
| checked        | `boolean \| undefined`                      | -         | 제어 모드 체크 여부                                               |
| defaultChecked | `boolean \| undefined`                      | -         | 비제어 모드 초기 체크 여부                                        |
| tone           | `CheckboxTone \| undefined`                 | `"brand"` | 체크박스의 색조                                                   |
| onChange       | `((checked: boolean) => void) \| undefined` | -         | 체크 상태 변경 시 호출되는 콜백 (controlled 모드)                 |
| ref            | `Ref<HTMLInputElement> \| undefined`        | -         | 입력 요소 참조                                                    |

### 예시

**Tones**

```tsx
<div className={vstack({ gap: "16" })}>
  <Checkbox label="중립 톤" tone="neutral" />
  <Checkbox label="브랜드 톤" tone="brand" />
</div>
```

**Disabled**

```tsx
<div className={vstack({ gap: "16" })}>
  <Checkbox label="비활성화(체크됨)" disabled defaultChecked />
  <Checkbox label="읽기 전용(체크됨)" readOnly defaultChecked />
</div>
```

**Invalid**

```tsx
<div className={vstack({ gap: "16" })}>
  <Checkbox
    label="에러 상태 체크박스"
    invalid
    errorMessage="필수 항목입니다."
  />
  <Checkbox
    label="에러 상태 체크박스 (체크됨)"
    invalid
    defaultChecked
    errorMessage="필수 항목입니다."
  />
  <Checkbox label="정상 체크박스" />
  <Checkbox label="체크해주세요." invalid />
</div>
```

**HelperText**

```tsx
<div className={vstack({ gap: "16" })}>
  <Checkbox
    label="서비스 이용약관에 동의합니다"
    helperText="동의하지 않으면 서비스를 이용할 수 없습니다."
  />
  <Checkbox
    label="마케팅 정보 수신에 동의합니다"
    helperText="선택 사항입니다."
  />
</div>
```

## CheckboxGroup

`import { CheckboxGroup } from "daleui"`

| prop          | 타입                                        | 기본값 | 설명                                            |
| ------------- | ------------------------------------------- | ------ | ----------------------------------------------- |
| **children**  | `ReactNode`                                 | -      | 자식 요소                                       |
| **name**      | `string`                                    | -      | 그룹 공유 name                                  |
| **label**     | `string`                                    | -      | 그룹 레이블                                     |
| defaultValues | `string[] \| undefined`                     | -      | 비제어 모드 초기 선택 값 목록                   |
| values        | `string[] \| undefined`                     | -      | 제어 모드 선택 값 목록                          |
| onChange      | `((values: string[]) => void) \| undefined` | -      | 선택 값 변경 핸들러                             |
| orientation   | `"horizontal" \| "vertical" \| undefined`   | -      | 배치 방향 (horizontal \| vertical)              |
| tone          | `CheckboxGroupTone \| undefined`            | -      | 색상 강조를 지정합니다.                         |
| ref           | `Ref<HTMLDivElement> \| undefined`          | -      | 요소 참조                                       |
| helperText    | `string \| undefined`                       | -      | 그룹 하단에 표시할 보조 또는 에러 메시지입니다. |

### 예시

**Orientation**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="vertical-orientation"
    orientation="vertical"
    defaultValues={["apple"]}
  />

  <CheckboxGroup
    name="horizontal-orientation"
    orientation="horizontal"
    defaultValues={["banana"]}
  />
</VStack>
```

**GroupDisabled**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="disabled-group"
    label="비활성화"
    disabled
    defaultValues={["banana"]}
  />

  <CheckboxGroup
    name="readonly-group"
    label="읽기 전용"
    readOnly
    defaultValues={["banana"]}
  />
</VStack>
```

**ItemDisabled**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="disabled-checked"
    label="개별 아이템 비활성화 (선택됨)"
    defaultValues={["banana"]}
  >
    <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
    <CheckboxGroup.Item value="banana" disabled>
      바나나 (disabled)
    </CheckboxGroup.Item>
    <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
  </CheckboxGroup>

  <CheckboxGroup
    name="disabled-unchecked"
    label="개별 아이템 비활성화 (선택 안 됨)"
    defaultValues={["apple"]}
  >
    <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
    <CheckboxGroup.Item value="banana" disabled>
      바나나 (disabled)
    </CheckboxGroup.Item>
    <CheckboxGroup.Item value="orange">오렌지</CheckboxGroup.Item>
  </CheckboxGroup>
</VStack>
```

**Tones**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="neutral-tone"
    label="중립 색조 (Neutral)"
    defaultValues={["apple"]}
    tone="neutral"
  />

  <CheckboxGroup
    name="brand-tone"
    label="브랜드 색조 (Brand)"
    defaultValues={["apple"]}
    tone="brand"
  />
</VStack>
```

**Invalid**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="invalid-group"
    label="좋아하는 과일을 선택하세요"
    invalid
    errorMessage="하나 이상 선택해주세요."
  />

  <CheckboxGroup
    name="valid-group"
    label="정상 체크박스 그룹"
    required
    helperText="과일을 선택해주세요."
  />
</VStack>
```

**HelperText**

```tsx
<VStack gap="32">
  <CheckboxGroup
    name="helper-text-basic"
    label="좋아하는 과일을 선택하세요"
    helperText="여러 개를 선택할 수 있습니다."
  />

  <CheckboxGroup
    name="helper-text-required"
    label="좋아하는 과일을 선택하세요"
    required
    helperText="최소 하나 이상 선택해주세요."
  />
</VStack>
```

**Required**

```tsx
<RequiredCheckboxGroup
  required
  name="fruits"
  label="좋아하는 과일을 선택하세요"
/>
```

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

| prop         | 타입                                                                                                    | 기본값  | 설명         |
| ------------ | ------------------------------------------------------------------------------------------------------- | ------- | ------------ |
| **children** | `ReactNode`                                                                                             | -       | 자식 요소    |
| as           | `As \| undefined`                                                                                       | `"div"` | 렌더링 태그  |
| gap          | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -       | 자식 간 간격 |
| padding      | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -       | 안쪽 여백    |
| role         | `AriaRole \| undefined`                                                                                 | -       | ARIA 역할    |
| ref          | `Ref<HTMLElement> \| undefined`                                                                         | -       | 요소 참조    |

### 예시

**Direction**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
  <div>
    <h4>row - 가로 방향</h4>
    <Flex direction="row" />
  </div>
  <div>
    <h4>column - 세로 방향</h4>
    <Flex direction="column" />
  </div>
  <div>
    <h4>rowReverse - 가로 역방향</h4>
    <Flex direction="rowReverse" />
  </div>
  <div>
    <h4>columnReverse - 세로 역방향</h4>
    <Flex direction="columnReverse" />
  </div>
</div>
```

**Gaps**

```tsx
<div>
  <div>
    <h4>간격 8</h4>
    <Flex gap="8" />
  </div>
  <div>
    <h4>간격 16</h4>
    <Flex gap="16" />
  </div>
</div>
```

**Padding**

```tsx
<div>
  <div>
    <h4>padding: 16</h4>
    <Flex padding="16" />
  </div>
  <div>
    <h4>padding: 32</h4>
    <Flex padding="32" />
  </div>
</div>
```

**Justify**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
  <div>
    <h4>start - 시작점 정렬</h4>
    <Flex gap="4" justify="start" />
  </div>
  <div>
    <h4>center - 중앙 정렬</h4>
    <Flex gap="4" justify="center" />
  </div>
  <div>
    <h4>end - 끝점 정렬</h4>
    <Flex gap="4" justify="end" />
  </div>
  <div>
    <h4>between - 양 끝 정렬</h4>
    <Flex gap="4" justify="between" />
  </div>
</div>
```

**Align**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
  <div>
    <h4>start - 시작점 정렬</h4>
    <Flex gap="4" align="start" />
  </div>
  <div>
    <h4>center - 중앙 정렬</h4>
    <Flex gap="4" align="center" />
  </div>
  <div>
    <h4>end - 끝점 정렬</h4>
    <Flex gap="4" align="end" />
  </div>
  <div>
    <h4>stretch - 늘리기</h4>
    <Flex gap="4" align="stretch" />
  </div>
</div>
```

## Grid

CSS Grid 레이아웃을 위한 컨테이너 컴포넌트입니다.

- `gridTemplateColumns`, `gridTemplateRows`, `gap`, `areas` 등 CSS Grid 관련 props를 통해 레이아웃을 설정할 수 있습니다.

**접근성(Accessibility) 안내**

- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
- 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.

`import { Grid } from "daleui"`

| prop                | 타입                                                                                                    | 기본값      | 설명                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| **children**        | `ReactNode`                                                                                             | -           | 자식 요소                                                      |
| as                  | `As \| undefined`                                                                                       | `"div"`     | 렌더링 태그                                                    |
| gridTemplateColumns | `string \| undefined`                                                                                   | -           | 열 템플릿 (grid-template-columns)                              |
| gridTemplateRows    | `string \| undefined`                                                                                   | -           | 행 템플릿 (grid-template-rows)                                 |
| gap                 | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -           | 자식 간 간격                                                   |
| padding             | `"0" \| "2" \| "4" \| "8" \| "12" \| "16" \| "20" \| "24" \| "32" \| "36" \| "40" \| "48" \| undefined` | -           | 안쪽 여백                                                      |
| areas               | `Areas \| undefined`                                                                                    | -           | 영역 이름 (grid-template-areas, GridItem.gridArea와 함께 사용) |
| autoFlow            | `"row" \| "column" \| "rowDense" \| "columnDense" \| undefined`                                         | `"row"`     | 자동 배치 흐름 (grid-auto-flow)                                |
| justifyItems        | `"end" \| "start" \| "center" \| "stretch" \| undefined`                                                | `"stretch"` | 아이템 주축 정렬 (justify-items)                               |
| alignItems          | `"end" \| "start" \| "center" \| "stretch" \| undefined`                                                | `"stretch"` | 아이템 교차축 정렬 (align-items)                               |
| justifyContent      | `"end" \| "start" \| "center" \| "stretch" \| "between" \| "around" \| undefined`                       | -           | 컨테이너 주축 정렬 (justify-content)                           |
| alignContent        | `"end" \| "start" \| "center" \| "stretch" \| "between" \| "around" \| undefined`                       | -           | 컨테이너 교차축 정렬 (align-content)                           |
| ref                 | `Ref<HTMLElement> \| undefined`                                                                         | -           | 요소 참조                                                      |

### 예시

**Templates**

```tsx
<div className={grid({ gridTemplateColumns: "1fr", gap: "24" })}>
  <div>
    <h4 className={css({ marginBottom: "8" })}>균등 3열 (repeat)</h4>
    <Grid
      className={css({ width: "500" })}
      gridTemplateColumns="repeat(3, 1fr)"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>비율 레이아웃 (1:2:1)</h4>
    <Grid className={css({ width: "500" })} gridTemplateColumns="1fr 2fr 1fr" />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>고정 + 유동</h4>
    <Grid
      className={css({ width: "500" })}
      gridTemplateColumns="100px auto 100px"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>minmax 사용</h4>
    <Grid
      className={css({ width: "500" })}
      gridTemplateColumns="repeat(3, minmax(80px, 1fr))"
    />
  </div>
</div>
```

**Gaps**

```tsx
<div className={grid({ gridTemplateColumns: "1fr", gap: "16" })}>
  <div>
    <h4>간격 4</h4>
    <Grid gap="4" />
  </div>
  <div>
    <h4>간격 8</h4>
    <Grid gap="8" />
  </div>
  <div>
    <h4>간격 16</h4>
    <Grid gap="16" />
  </div>
</div>
```

**Padding**

```tsx
<div className={grid({ gridTemplateColumns: "1fr", gap: "16" })}>
  <div>
    <h4>padding: 16</h4>
    <Grid padding="16" />
  </div>
  <div>
    <h4>padding: 32</h4>
    <Grid padding="32" />
  </div>
</div>
```

**GridItemSpan**

```tsx
<Grid
  gridTemplateColumns="repeat(3, 1fr)"
  gap="8"
  className={css({ width: "400" })}
>
  <GridItem gridColumn="span 2" className={itemBox.brand}>
    gridColumn: span 2
  </GridItem>
  <GridItem className={itemBox.brand}>1</GridItem>
  <GridItem className={itemBox.brand}>2</GridItem>
  <GridItem gridRow="span 2" className={itemBox.brand}>
    gridRow: span 2
  </GridItem>
  <GridItem className={itemBox.brand}>3</GridItem>
  <GridItem className={itemBox.brand}>4</GridItem>
  <GridItem className={itemBox.brand}>5</GridItem>
</Grid>
```

**GridItemPosition**

```tsx
<Grid
  gridTemplateColumns="repeat(4, 1fr)"
  gridTemplateRows="repeat(3, 1fr)"
  gap="8"
  className={css({ width: "400", height: "300" })}
>
  <GridItem
    gridColumnStart="1"
    gridColumnEnd="3"
    gridRowStart="1"
    gridRowEnd="2"
    className={itemBox.brand}
  >
    gridColumnStart: 1, gridColumnEnd: 3
  </GridItem>
  <GridItem
    gridColumnStart="3"
    gridColumnEnd="5"
    gridRowStart="1"
    gridRowEnd="3"
    className={itemBox.secondary}
  >
    gridColumnStart: 3, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 3
  </GridItem>
  <GridItem
    gridColumnStart="1"
    gridColumnEnd="3"
    gridRowStart="3"
    gridRowEnd="4"
    className={itemBox.tertiary}
  >
    gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 3, gridRowEnd: 4
  </GridItem>
</Grid>
```

**AreasWithArray**

```tsx
<Grid
  areas={[
    ["header", "header", "header"],
    ["sidebar", "main", "main"],
    ["footer", "footer", "footer"],
  ]}
  gridTemplateColumns="repeat(3, 1fr)"
  gridTemplateRows="repeat(3, 1fr)"
  gap="8"
  className={css({ width: "400", height: "300" })}
>
  <GridItem gridArea="header" className={itemBox.brand}>
    Header
  </GridItem>
  <GridItem gridArea="sidebar" className={itemBox.secondary}>
    Sidebar
  </GridItem>
  <GridItem gridArea="main" className={itemBox.tertiary}>
    Main
  </GridItem>
  <GridItem gridArea="footer" className={itemBox.brand}>
    Footer
  </GridItem>
</Grid>
```

**JustifyItems**

```tsx
<div className={grid({ gridTemplateColumns: "1fr", gap: "24" })}>
  <div>
    <h4 className={css({ marginBottom: "8" })}>start (왼쪽 정렬)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400" })}
      justifyItems="start"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>center (중앙 정렬)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400" })}
      justifyItems="center"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>end (오른쪽 정렬)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400" })}
      justifyItems="end"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>
      stretch (기본값, 셀 전체 너비)
    </h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400" })}
      justifyItems="stretch"
    />
  </div>
</div>
```

**AlignItems**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(4, 1fr)", gap: "24" })}>
  <div>
    <h4 className={css({ marginBottom: "8" })}>start (상단)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="1fr"
      gap="8"
      className={css({ width: "300", height: "120" })}
      alignItems="start"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>center (중앙)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="1fr"
      gap="8"
      className={css({ width: "300", height: "120" })}
      alignItems="center"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>end (하단)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="1fr"
      gap="8"
      className={css({ width: "300", height: "120" })}
      alignItems="end"
    />
  </div>
  <div>
    <h4 className={css({ marginBottom: "8" })}>stretch (전체)</h4>
    <Grid
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="1fr"
      gap="8"
      className={css({ width: "300", height: "120" })}
      alignItems="stretch"
    />
  </div>
</div>
```

## Heading

페이지의 제목이나 섹션의 구조를 표현하기 위해 사용하는 컴포넌트입니다.
두 가지 색상 톤을 제공하며, 뷰포인트에 따라 크기가 유동적으로 변경되도록 설계되어 있습니다.

- `size`와 `level`이 함께 지정되면 `size`가 시각적 크기를 결정하고, `level`은 HTML 태그(`<h1>`–`<h5>`) 선택에만 사용됩니다.
  예를 들어 `size` 속성은 2, `level` 속성은 1인 경우, `<h1>` 태그이지만 `size` 속성이 2에 해당하는 스타일이 적용됩니다.
- 반응형 폰트를 지원하여 뷰포트에 따라 글꼴 크기가 자동으로 전환됩니다.

`import { Heading } from "daleui"`

| prop         | 타입                                   | 기본값      | 설명              |
| ------------ | -------------------------------------- | ----------- | ----------------- |
| **children** | `ReactNode`                            | -           | 제목 내용         |
| **level**    | `Level`                                | -           | 제목 단계 (h1–h5) |
| size         | `HeadingSize \| undefined`             | -           | 표시 크기         |
| tone         | `HeadingTone \| undefined`             | `"neutral"` | 색조              |
| align        | `Align \| undefined`                   | -           | 텍스트 정렬       |
| wordBreak    | `WordBreak \| undefined`               | -           | 줄바꿈 규칙       |
| ref          | `Ref<HTMLHeadingElement> \| undefined` | -           | 요소 참조         |

### 예시

**Levels**

```tsx
<div className={vstack({ gap: "24" })}>
  <Heading level={1}>1 단계</Heading>
  <Heading level={2}>2 단계</Heading>
  <Heading level={3}>3 단계</Heading>
  <Heading level={4}>4 단계</Heading>
  <Heading level={5}>5 단계</Heading>
</div>
```

**Tones**

```tsx
<div className={vstack({ gap: "24" })}>
  <Heading tone="neutral">중립 색조</Heading>
  <Heading tone="brand">브랜드 색조</Heading>
</div>
```

**Sizes**

```tsx
<div className={vstack({ gap: "24" })}>
  <Heading size={1}>제목</Heading>
  <Heading size={2}>제목</Heading>
  <Heading size={3}>제목</Heading>
  <Heading size={4}>제목</Heading>
  <Heading size={5}>제목</Heading>
</div>
```

**Alignments**

```tsx
<div
  className={vstack({
    gap: "16",
    maxWidth: "200px",
  })}
>
  <Heading align="left">텍스트를 왼쪽 정렬된 제목</Heading>
  <Heading align="center">텍스트를 가운데 정렬된 제목</Heading>
  <Heading align="right">텍스트를 오른쪽 정렬된 제목</Heading>
</div>
```

**WordBreaks**

```tsx
<div
  className={vstack({
    gap: "16",
    maxWidth: "200px",
  })}
>
  <Heading wordBreak="eng">english line break</Heading>
  <Heading wordBreak="cjk">한글은 단어 단위로 줄바꿈됩니다.</Heading>
</div>
```

## HStack

Flex의 가로 배치 패턴(`direction="row"`, `align="center"`)을 의미 있는 이름과 기본값으로 묶은 컴포넌트입니다.

한 컨테이너에서 `direction`을 바꿔 쓸 때, 교차축 정렬이 가운데가 아닐 때, **Flex 컴포넌트**를 권장합니다.

**접근성(Accessibility) 안내**

- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.

`import { HStack } from "daleui"`

| prop     | 타입                                                                  | 기본값     | 설명                  |
| -------- | --------------------------------------------------------------------- | ---------- | --------------------- |
| reversed | `boolean \| undefined`                                                | `false`    | 가로 역방향 배치 여부 |
| justify  | `"left" \| "right" \| "center" \| "between" \| "around" \| undefined` | `"left"`   | 가로 정렬             |
| align    | `"bottom" \| "top" \| "center" \| "stretch" \| undefined`             | `"center"` | 세로 정렬             |
| ref      | `Ref<HTMLElement> \| undefined`                                       | -          | 요소 참조             |

### 예시

**Gaps**

```tsx
<VStack gap="24">
  <div>
    <h4>간격 4</h4>
    <HStack gap="4" className={css({ width: "400" })} />
  </div>
  <div>
    <h4>간격 8</h4>
    <HStack gap="8" className={css({ width: "400" })} />
  </div>
  <div>
    <h4>간격 16</h4>
    <HStack gap="16" className={css({ width: "400" })} />
  </div>
</VStack>
```

**Padding**

```tsx
<VStack gap="24">
  <div>
    <h4>padding: 16</h4>
    <HStack padding="16" className={css({ width: "400" })} />
  </div>
  <div>
    <h4>padding: 32</h4>
    <HStack padding="32" className={css({ width: "400" })} />
  </div>
</VStack>
```

**Reverse**

```tsx
<VStack gap="24">
  <div>
    <h4>false</h4>
    <HStack reversed={false} className={css({ width: "400" })} />
  </div>
  <div>
    <h4>true</h4>
    <HStack reversed={true} className={css({ width: "400" })} />
  </div>
</VStack>
```

**Justify**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
  <div>
    <h4>left - 왼쪽 정렬</h4>
    <HStack justify="left" />
  </div>
  <div>
    <h4>right - 오른쪽 정렬</h4>
    <HStack justify="right" />
  </div>
  <div>
    <h4>center - 중앙 정렬</h4>
    <HStack justify="center" />
  </div>
  <div>
    <h4>between - 양 끝 정렬</h4>
    <HStack justify="between" />
  </div>
  <div>
    <h4>around - 균등 분산</h4>
    <HStack justify="around" />
  </div>
</div>
```

**Align**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "16" })}>
  <div>
    <h4>top - 위쪽 정렬</h4>
    <HStack align="top" />
  </div>

  <div>
    <h4>bottom - 아래쪽 정렬</h4>
    <HStack align="bottom" />
  </div>

  <div>
    <h4>center - 중앙 정렬</h4>
    <HStack align="center" />
  </div>

  <div>
    <h4>stretch - 늘리기</h4>
    <HStack align="stretch" />
  </div>
</div>
```

**FlexOrHStackGuide**

```tsx
<Flex direction="column" gap="24">
  <p>
    HStack은 Flex의 자주 쓰는 가로 배치 패턴(`flex-direction="row"`,
    `justify-content="start"`, `align-items="center"`)을 의미 있는 이름과
    기본값으로 묶은 컴포넌트입니다.
    <br />
    단순 가로 스택은 `HStack`을, 방향 전환이나 세밀한 정렬 제어가 필요하면
    `Flex`를 사용하세요.
    <br />
    아래 예시처럼 같은 결과를 만들 수 있지만, 전달해야 하는 props가 줄어듭니다.
  </p>
  <div className={css({ border: "1px solid", padding: "16" })}>
    <h4>Flex</h4>
    <p>direction="row" justify="start" align="center" gap="8"</p>
    <Flex direction="row" justify="start" align="center" gap="8" />
  </div>
  <div className={css({ border: "1px solid", padding: "16" })}>
    <h4>HStack</h4>
    <p>gap="8"</p>
    <HStack gap="8" />
  </div>
</Flex>
```

## Icon

아이콘은 사용자의 이해를 돕고 행동을 유도하기 위해 사용하는 시각적 언어입니다.
시스템 전반에서 일관되게 사용되며, 페이지와 컴포넌트 내에서 정보를 함축적으로 전달하는 재사용 가능한 벡터 그래픽 심볼입니다.

- 기본 크기는 `md`(1.25rem)이며, `tone`을 지정하지 않으면 부모 요소의 색상을 상속합니다.
- `solid`는 `tone`과 함께 사용해야 적용됩니다.

`import { Icon } from "daleui"`

| prop     | 타입                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 기본값 | 설명        |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------- |
| **name** | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark"` | -      | 아이콘 이름 |
| tone     | `Tone \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | -      | 색조        |
| size     | `"sm" \| "md" \| "lg" \| "xs" \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | -      | 크기        |
| solid    | `boolean \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | -      | 솔리드 여부 |

### 예시

**Sizes**

```tsx
<div className={vstack({ gap: "24" })}>
  <Icon size="xs" />
  <Icon size="sm" />
  <Icon size="md" />
  <Icon size="lg" />
</div>
```

**Tones**

```tsx
<div className={vstack({ gap: "24" })}>
  <Icon tone="neutral" />
  <Icon tone="brand" />
  <Icon tone="danger" />
  <Icon tone="warning" />
  <Icon tone="success" />
  <Icon tone="info" />
</div>
```

**Solid**

```tsx
<VStack
  gap="24"
  className={css({
    bgColor: "fg.neutral.disabled",
    p: "24",
  })}
>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="neutral" />
    <Icon solid tone="neutral" />
  </div>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="brand" />
    <Icon solid tone="brand" />
  </div>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="danger" />
    <Icon solid tone="danger" />
  </div>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="warning" />
    <Icon solid tone="warning" />
  </div>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="success" />
    <Icon solid tone="success" />
  </div>
  <div className={flex({ gap: "24" })}>
    <Icon solid={false} tone="info" />
    <Icon solid tone="info" />
  </div>
</VStack>
```

## Label

라벨(Label)은 입력 요소(TextInput, Select, Checkbox 등)에 이름을 부여해 사용자가 해당 필드의 목적을 명확하게 이해하도록 돕는 텍스트 컴포넌트입니다.

입력 요소 없이 단독으로 사용할 수도 있고, `children`으로 입력 요소를 전달하여 라벨과 연결할 수도 있습니다.

`htmlFor` 속성을 사용하면 라벨 외부에 있는 입력 요소와도 연결할 수 있습니다.

**접근성(Accessibility) 안내**

- 이 컴포넌트는 `<label>` 태그를 사용하여 시맨틱하게 구현되어 있습니다.
- `required`를 true로 설정하면 별표(\*)와 함께 스크린 리더용 `aria-label="옵션 필수"` 텍스트가 자동으로 추가됩니다.
- `disabled` 상태에서도 `required` 별표는 표시되지만, 비활성화 색상으로 변경됩니다.
- `htmlFor` 또는 `children`으로 입력 요소를 연결하면, 라벨 클릭 시 해당 입력 요소로 포커스가 이동합니다.

`import { Label } from "daleui"`

| prop          | 타입                                 | 기본값      | 설명                                       |
| ------------- | ------------------------------------ | ----------- | ------------------------------------------ |
| children      | `LabelFormChild \| undefined`        | -           | 연결할 폼 자식 요소                        |
| **labelText** | `string`                             | -           | 라벨 문구                                  |
| tone          | `LabelTone \| undefined`             | `"neutral"` | 색조                                       |
| disabled      | `boolean \| undefined`               | `false`     | 비활성화 여부                              |
| required      | `boolean \| undefined`               | `false`     | 필수 입력 여부 (true일 경우 별표(\*) 표시) |
| htmlFor       | `string \| undefined`                | -           | 연결 대상 요소 id                          |
| ref           | `Ref<HTMLLabelElement> \| undefined` | -           | 요소 참조                                  |

### 예시

**Tones**

```tsx
<div className={vstack({ gap: "24" })}>
  <Label tone="neutral" labelText="중립 색조 라벨"></Label>
  <Label tone="danger" labelText="위험 색조 라벨"></Label>
</div>
```

**Disabled**

```tsx
<div className={vstack({ gap: "24" })}>
  <Label disabled={false} labelText="활성화 라벨"></Label>
  <Label disabled={true} labelText="비활성화 라벨"></Label>
</div>
```

**Required**

```tsx
<div className={vstack({ gap: "16" })}>
  <Label labelText="기본 라벨"></Label>
  <Label required labelText="필수 라벨"></Label>
</div>
```

**WithTextInput**

```tsx
<div className={vstack({ gap: "16" })}>
  <Label labelText="타이틀">
    <TextInput placeholder="내용을 입력해주세요"></TextInput>
  </Label>
</div>
```

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

| prop         | 타입                                  | 기본값    | 설명                      |
| ------------ | ------------------------------------- | --------- | ------------------------- |
| **href**     | `string`                              | -         | 대상 URL                  |
| **children** | `ReactNode`                           | -         | 링크 내용                 |
| tone         | `LinkTone \| undefined`               | `"brand"` | 색조                      |
| size         | `LinkSize \| undefined`               | `"md"`    | 크기                      |
| underline    | `boolean \| undefined`                | `true`    | 밑줄 표시 여부            |
| external     | `boolean \| undefined`                | `false`   | 외부 링크·새 탭 열기 여부 |
| ref          | `Ref<HTMLAnchorElement> \| undefined` | -         | 요소 참조                 |

### 예시

**Basic**

```tsx
<Link aria-label="링크">
  <Icon name="externalLink" />
</Link>
```

**Tones**

```tsx
<div className={vstack({ gap: "24" })}>
  <Link tone="brand" aria-label="브랜드 링크">
    브랜드 링크
    <Icon name="externalLink" />
  </Link>
  <Link tone="neutral" aria-label="중립 링크">
    중립 링크
    <Icon name="externalLink" />
  </Link>
</div>
```

**Underlines**

```tsx
<div className={vstack({ gap: "24" })}>
  <Link underline aria-label="밑줄 있음">
    밑줄 있음
    <Icon name="externalLink" />
  </Link>
  <Link underline={false} aria-label="밑줄 없음">
    밑줄 없음
    <Icon name="externalLink" />
  </Link>
</div>
```

**Sizes**

```tsx
<div className={vstack({ gap: "24" })}>
  <Link size="sm" aria-label="작은 링크">
    작은 링크
    <Icon name="externalLink" size="sm" />
  </Link>
  <Link size="md" aria-label="중간 링크">
    중간 링크
    <Icon name="externalLink" size="md" />
  </Link>
  <Link size="lg" aria-label="큰 링크">
    큰 링크
    <Icon name="externalLink" size="lg" />
  </Link>
</div>
```

**WithIcon**

```tsx
<div className={vstack({ gap: "24" })}>
  <Link aria-label="아이콘 있음">
    아이콘 있음
    <Icon name="externalLink" />
  </Link>
  <Link>아이콘 없음</Link>
</div>
```

**Visited**

```tsx
<div className={vstack({ gap: "24" })}>
  <Text>
    방문한 링크의 색상이 다르지 않다면 방문한 링크를 클릭하여 방문하여주세요.
  </Text>
  <Link
    href="https://www.daleui.com"
    onClick={undefined}
    external
    aria-label="방문한 링크"
  >
    방문한 링크
    <Icon name="externalLink" stroke="currentColor" />
  </Link>
  <Link aria-label="방문하지 않은 링크">
    방문하지 않은 링크
    <Icon name="externalLink" />
  </Link>
</div>
```

**External**

```tsx
<div className={vstack({ gap: "24" })}>
  <Link
    external
    aria-label="새 탭에서 열기 (보안 속성 자동 추가)"
    href="https://www.daleui.com"
    onClick={undefined}
  >
    새 탭에서 열기 (보안 속성 자동 추가)
    <Icon name="externalLink" />
  </Link>
  <Link aria-label="같은 탭에서 열기">
    같은 탭에서 열기
    <Icon name="externalLink" />
  </Link>
</div>
```

**Inline**

```tsx
<p>
  이 문장에는{" "}
  <Link aria-label="링크">
    링크
    <Icon name="externalLink" />
  </Link>
  가 포함되어 있습니다.
</p>
```

## PasswordInput

패스워드 인풋은 로그인이나 계정 인증 과정에서 사용자의 비밀번호를 안전하게 입력하도록 지원하는 보안 입력 필드입니다.

- 토글 버튼은 키보드 및 스크린 리더를 지원합니다.

`import { PasswordInput } from "daleui"`

| prop         | 타입                                                        | 기본값                       | 설명                    |
| ------------ | ----------------------------------------------------------- | ---------------------------- | ----------------------- |
| placeholder  | `string \| undefined`                                       | `"패스워드를 입력해주세요."` | 플레이스홀더            |
| value        | `string \| undefined`                                       | -                            | 제어 모드 입력 값       |
| defaultValue | `string \| undefined`                                       | -                            | 비제어 모드 초기 입력값 |
| onChange     | `((e: ChangeEvent<HTMLInputElement>) => void) \| undefined` | -                            | 변경 이벤트 핸들러      |
| ref          | `Ref<HTMLInputElement> \| undefined`                        | -                            | 입력 요소 참조          |

### 예시

**Disabled**

```tsx
<VStack gap="16" style={{ width: "320px" }}>
  <PasswordInput disabled defaultValue="수정할 수 없습니다" label="비활성화" />
  <PasswordInput readOnly defaultValue="read-only-secret" label="읽기 전용" />
</VStack>
```

**WithLabel**

```tsx
<VStack gap="16" style={{ width: "320px" }}>
  <PasswordInput label="비밀번호" />
  <PasswordInput label="비밀번호" required />
  <PasswordInput label="비밀번호" disabled />
</VStack>
```

## RadioGroup

`import { RadioGroup } from "daleui"`

| prop         | 타입                                      | 기본값 | 설명                               |
| ------------ | ----------------------------------------- | ------ | ---------------------------------- |
| **children** | `ReactNode`                               | -      | 자식 요소                          |
| **name**     | `string`                                  | -      | 그룹 공유 name                     |
| **label**    | `string`                                  | -      | 그룹 레이블                        |
| defaultValue | `string \| undefined`                     | -      | 비제어 모드 초기 선택 값           |
| value        | `string \| undefined`                     | -      | 제어 모드 선택 값                  |
| onChange     | `((value: string) => void) \| undefined`  | -      | 선택 값 변경 핸들러                |
| orientation  | `"horizontal" \| "vertical" \| undefined` | -      | 배치 방향 (horizontal \| vertical) |
| tone         | `RadioGroupTone \| undefined`             | -      | 색조                               |
| hint         | `string \| undefined`                     | -      | 레이블 보조 텍스트                 |

### 예시

**Orientation**

```tsx
<div className={css({ display: "flex", flexDirection: "column", gap: "32" })}>
  <RadioGroup
    name="vertical-orientation"
    label="세로 방향 (Vertical)"
    orientation="vertical"
    defaultValue="apple"
  />

  <RadioGroup
    name="horizontal-orientation"
    label="가로 방향 (Horizontal)"
    orientation="horizontal"
    defaultValue="banana"
  />
</div>
```

**GroupDisabled**

```tsx
<VStack gap="32">
  <RadioGroup
    name="disabled-group"
    label="비활성화"
    disabled
    defaultValue="banana"
  />

  <RadioGroup
    name="readonly-group"
    label="읽기 전용"
    readOnly
    defaultValue="banana"
  />
</VStack>
```

**ItemDisabled**

```tsx
<div className={css({ display: "flex", flexDirection: "column", gap: "32" })}>
  <RadioGroup
    name="disabled-checked"
    label="개별 아이템 비활성화 (선택됨)"
    defaultValue="banana"
  >
    <RadioGroup.Item value="apple">사과</RadioGroup.Item>
    <RadioGroup.Item value="banana" disabled>
      바나나 (disabled)
    </RadioGroup.Item>
    <RadioGroup.Item value="orange">오렌지</RadioGroup.Item>
  </RadioGroup>

  <RadioGroup
    name="disabled-unchecked"
    label="개별 아이템 비활성화 (선택 안 됨)"
    defaultValue="apple"
  >
    <RadioGroup.Item value="apple">사과</RadioGroup.Item>
    <RadioGroup.Item value="banana" disabled>
      바나나 (disabled)
    </RadioGroup.Item>
    <RadioGroup.Item value="orange">오렌지</RadioGroup.Item>
  </RadioGroup>
</div>
```

**Tones**

```tsx
<div className={css({ display: "flex", flexDirection: "column", gap: "32" })}>
  <RadioGroup
    defaultValue="apple"
    name="neutral-tone"
    label="중립 색조 (Neutral)"
    tone="neutral"
  />

  <RadioGroup
    defaultValue="apple"
    name="brand-tone"
    label="브랜드 색조 (Brand)"
    tone="brand"
  />
</div>
```

**Invalid**

```tsx
<VStack gap="32">
  <RadioGroup
    name="invalid-unselected"
    label="에러 상태 (선택 없음)"
    invalid
    errorMessage="필수 값을 선택해주세요."
  />

  <RadioGroup
    name="invalid-selected"
    label="에러 상태 (선택됨)"
    invalid
    errorMessage="올바른 옵션을 선택해주세요."
    defaultValue="banana"
  />

  <RadioGroup name="normal" label="정상 상태 (비교용)" defaultValue="apple" />
</VStack>
```

**Hint**

```tsx
<VStack gap="32">
  <RadioGroup
    name="hint-basic"
    label="좋아하는 과일을 선택하세요"
    hint="(옵션 선택)"
  />

  <RadioGroup
    name="hint-required"
    label="좋아하는 과일을 선택하세요"
    hint="(옵션 선택)"
    required
  />
</VStack>
```

**HelperText**

```tsx
<VStack gap="32">
  <RadioGroup
    name="helper-text-basic"
    label="좋아하는 과일을 선택하세요"
    required
    helperText="모두 다 좋아한다면 가장 좋아하는 과일을 골라주세요"
  />

  <RadioGroup
    name="helper-text-horizontal"
    label="좋아하는 과일을 선택하세요"
    orientation="horizontal"
    helperText="모두 다 좋아한다면 가장 좋아하는 과일을 골라주세요"
  />
</VStack>
```

**Required**

```tsx
<VStack gap="32">
  <RadioGroup name="required-normal" label="필수 입력" required />

  <RadioGroup
    name="required-disabled"
    label="필수 입력 (비활성화)"
    required
    disabled
  />
</VStack>
```

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

| prop            | 타입                                                         | 기본값 | 설명                                 |
| --------------- | ------------------------------------------------------------ | ------ | ------------------------------------ |
| clearButtonName | `string \| undefined`                                        | -      | 지우기 버튼 접근성 이름 (aria-label) |
| placeholder     | `string \| undefined`                                        | -      | 플레이스홀더                         |
| value           | `string \| undefined`                                        | -      | 제어 모드 선택 값                    |
| defaultValue    | `string \| undefined`                                        | -      | 비제어 모드 초기 선택 값             |
| onChange        | `((e: ChangeEvent<HTMLSelectElement>) => void) \| undefined` | -      | 변경 이벤트 핸들러                   |
|                 | `string \| undefined`                                        | -      | 접근성 레이블 (aria-label)           |
| name            | `string \| undefined`                                        | -      | 폼 name                              |
| ref             | `Ref<HTMLSelectElement> \| undefined`                        | -      | select 요소 참조                     |

### 예시

**Disabled**

```tsx
<VStack gap="16">
  <Select disabled disabled defaultValue="kr" label="비활성화" />
  <Select disabled readOnly defaultValue="us" label="읽기 전용" />
</VStack>
```

**Required**

```tsx
<RequiredSelect required clearButtonName="clear" name="framework" />
```

**WithLabel**

```tsx
<VStack gap="16">
  <Select label="국가" />
  <Select label="국가" required />
  <Select label="국가" disabled />
</VStack>
```

## Tag

콘텐츠의 속성, 카테고리, 상태(성공, 경고 등)를 키워드 형태로 식별하고 분류하여 시각적으로 강조하는 컴포넌트이다. 필요에 따라 링크 이동이나 삭제와 같은 상호작용 기능을 제공합니다.

- `href`를 전달하면 자동으로 `<a>` 태그로 렌더링됩니다.
- `target="_blank"`인 경우 reverse tabnabbing 방지를 위해 `rel`에 `noopener noreferrer`가 항상 병합됩니다.
- `javascript:`, `data:` 등 안전하지 않은 `href`는 자동으로 차단되어 `#`로 대체됩니다.

`import { Tag } from "daleui"`

| prop         | 타입                                                        | 기본값      | 설명                                 |
| ------------ | ----------------------------------------------------------- | ----------- | ------------------------------------ |
| **children** | `ReactNode`                                                 | -           | 태그 내용                            |
| tone         | `Tone \| undefined`                                         | `"neutral"` | 색조                                 |
| onRemove     | `((e: MouseEvent<HTMLButtonElement>) => void) \| undefined` | -           | 제거 핸들러 (설정 시 제거 버튼 표시) |
| ref          | `Ref<HTMLSpanElement> \| undefined`                         | -           | 요소 참조                            |
| href         | `undefined`                                                 | -           |                                      |

### 예시

**Tones**

```tsx
<div className={vstack({ gap: "16" })}>
  <div className={hstack({ gap: "8" })}>
    <Tag tone="neutral">Neutral</Tag>
    <Tag tone="brand">Brand</Tag>
    <Tag tone="danger">Danger</Tag>
  </div>
  <div className={hstack({ gap: "8" })}>
    <Tag tone="warning">Warning</Tag>
    <Tag tone="success">Success</Tag>
    <Tag tone="info">Info</Tag>
  </div>
</div>
```

**Link**

```tsx
<div className={vstack({ gap: "16" })}>
  <div className={hstack({ gap: "8" })}>
    <Tag>기본 태그</Tag>
    <Tag href="#">링크 태그 (호버 해보세요)</Tag>
    <Tag href="https://example.com" target="_blank">
      외부 링크 태그
    </Tag>
  </div>
  <div>
    <p
      className={css({
        fontSize: "sm",
        color: "fg.neutral",
        marginTop: "8",
      })}
    >
      링크 태그는 마우스를 올리거나 키보드로 포커스할 때 상호작용 상태를
      보여줍니다. 세 번째 태그는 실제 외부 링크로 연결됩니다.
    </p>
  </div>
</div>
```

**Removable**

```tsx
<RemovableExample />
```

## Text

텍스트 컴포넌트입니다.

- `as` 속성으로 어떤 HTML 태그를 사용할지 지정할 수 있습니다.
- `muted` 속성을 주시면 글자색이 옅어집니다. 명암비가 낮아지므로 접근성 측면에서 주의해서 사용하세요.

`import { Text } from "daleui"`

| prop         | 타입                                                                                    | 기본값      | 설명                     |
| ------------ | --------------------------------------------------------------------------------------- | ----------- | ------------------------ |
| **children** | `ReactNode`                                                                             | -           | 텍스트 내용              |
| as           | `"div" \| "span" \| "p" \| "em" \| "small" \| "strong" \| undefined`                    | `"span"`    | 렌더링 태그              |
| tone         | `Tone \| undefined`                                                                     | `"neutral"` | 색조                     |
| size         | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "xs" \| "3xl" \| "4xl" \| "5xl" \| undefined` | -           | 글자 크기                |
| weight       | `"normal" \| "medium" \| "semibold" \| "bold" \| undefined`                             | -           | 글자 굵기                |
| muted        | `boolean \| undefined`                                                                  | `false`     | 흐린 톤(muted) 적용 여부 |
| ref          | `Ref<HTMLElement> \| undefined`                                                         | -           | 요소 참조                |

### 예시

**Tones**

```tsx
<div className={vstack({ gap: "24" })}>
  <Text tone="neutral">중립 색조</Text>
  <Text tone="brand">브랜드 색조</Text>
  <Text tone="danger">위험 색조</Text>
  {/* <Text  tone="warning">
          경고 색조
        </Text> */}
  <Text tone="success">성공 색조</Text>
  <Text tone="info">정보 색조</Text>
</div>
```

**Contrasts**

```tsx
<div className={vstack({ gap: "24" })}>
  <Text muted>낮은 명암비</Text>
  <Text>높은 명암비</Text>
</div>
```

## TextInput

텍스트 인풋은 사용자가 이름, 이메일, 검색어 등 텍스트 정보를 직접 입력할 수 있도록 제공되는 입력 컴포넌트입니다.

`import { TextInput } from "daleui"`

| prop         | 타입                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 기본값 | 설명                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- |
| leadingIcon  | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark" \| undefined` | -      | 선행 아이콘 이름 (Icon.name) |
| trailingIcon | `"info" \| "menu" \| "search" \| "x" \| "award" \| "check" \| "chevronDown" \| "chevronLeft" \| "chevronRight" \| "circleAlert" \| "clock" \| "codeXml" \| "externalLink" \| "eye" \| "eyeClosed" \| "eyeOff" \| "globe" \| "handHeart" \| "heartHandshake" \| "kr" \| "loaderCircle" \| "messageCircle" \| "messageCircleMore" \| "moon" \| "star" \| "sun" \| "thumbsUp" \| "user" \| "users" \| "Discord" \| "GitHub" \| "LinkedIn" \| "Medium" \| "YouTube" \| "Storybook" \| "Figma" \| "GithubLight" \| "GithubDark" \| "LinkedInLight" \| "LinkedInDark" \| undefined` | -      | 후행 아이콘 이름 (Icon.name) |
| placeholder  | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -      | 플레이스홀더                 |
| value        | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -      | 제어 모드 입력 값            |
| defaultValue | `string \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | -      | 비제어 모드 초기 입력값      |
| onChange     | `((e: ChangeEvent<HTMLInputElement>) => void) \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | -      | 변경 이벤트 핸들러           |
| ref          | `Ref<HTMLInputElement> \| undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | -      | 입력 요소 참조               |

### 예시

**WithIcons**

```tsx
<div className={vstack({ gap: "16", w: "320px" })}>
  <TextInput leadingIcon="search" placeholder="검색어를 입력하세요..." />
  <TextInput
    trailingIcon="user"
    placeholder="아이디"
    defaultValue="storybook_user"
  />
  <TextInput disabled leadingIcon="star" placeholder="비활성화된 아이콘" />
</div>
```

**Invalid**

```tsx
<div
  className={css({
    w: "320px",
  })}
>
  <TextInput
    invalid
    errorMessage="오류 메시지"
    invalid
    trailingIcon="circleAlert"
    placeholder="이메일 형식이 올바르지 않습니다."
  />
</div>
```

**Disabled**

```tsx
<div className={vstack({ gap: "16", w: "320px" })}>
  <TextInput
    disabled
    defaultValue="수정할 수 없습니다"
    leadingIcon="star"
    label="비활성화"
  />
  <TextInput readOnly defaultValue="읽기 전용 값" label="읽기 전용" />
</div>
```

**WithLabel**

```tsx
<div className={vstack({ gap: "16", w: "320px" })}>
  <TextInput label="이름" placeholder="이름을 입력하세요" />
  <TextInput label="이름" required placeholder="필수 항목입니다" />
  <TextInput label="이름" disabled placeholder="수정할 수 없습니다" />
</div>
```

## VStack

Flex의 세로 배치 패턴(`direction="column"`, `align="center"`)을 의미 있는 이름과 기본값으로 묶은 컴포넌트입니다.

한 컨테이너에서 `direction`을 바꿔 쓸 때, 교차축 정렬이 가운데가 아닐 때, **Flex 컴포넌트**를 권장합니다.

**접근성(Accessibility) 안내**

- 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
- 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.

`import { VStack } from "daleui"`

| prop     | 타입                                                                  | 기본값     | 설명                  |
| -------- | --------------------------------------------------------------------- | ---------- | --------------------- |
| reversed | `boolean \| undefined`                                                | `false`    | 세로 역방향 배치 여부 |
| justify  | `"bottom" \| "top" \| "center" \| "between" \| "around" \| undefined` | `"top"`    | 세로 정렬             |
| align    | `"left" \| "right" \| "center" \| "stretch" \| undefined`             | `"center"` | 가로 정렬             |
| ref      | `Ref<HTMLElement> \| undefined`                                       | -          | 요소 참조             |

### 예시

**Gaps**

```tsx
<HStack gap="24">
  <div>
    <h4>간격 4</h4>
    <VStack gap="4" />
  </div>
  <div>
    <h4>간격 8</h4>
    <VStack gap="8" />
  </div>
  <div>
    <h4>간격 16</h4>
    <VStack gap="16" />
  </div>
</HStack>
```

**Padding**

```tsx
<HStack gap="24">
  <div>
    <h4>padding: 16</h4>
    <VStack padding="16" />
  </div>
  <div>
    <h4>padding: 32</h4>
    <VStack padding="32" />
  </div>
</HStack>
```

**Reverse**

```tsx
<HStack gap="24">
  <div>
    <h4>false</h4>
    <VStack reversed={false} />
  </div>
  <div>
    <h4>true</h4>
    <VStack reversed={true} />
  </div>
</HStack>
```

**Justify**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
  <div>
    <h4>top - 위쪽 정렬</h4>
    <VStack justify="top" />
  </div>

  <div>
    <h4>bottom - 아래쪽 정렬</h4>
    <VStack justify="bottom" />
  </div>

  <div>
    <h4>center - 중앙 정렬</h4>
    <VStack justify="center" />
  </div>

  <div>
    <h4>between - 양 끝 정렬</h4>
    <VStack justify="between" />
  </div>
  <div>
    <h4>around - 균등 분산</h4>
    <VStack justify="around" />
  </div>
</div>
```

**Align**

```tsx
<div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "16" })}>
  <div>
    <h4>left - 왼쪽 정렬</h4>
    <VStack align="left" />
  </div>
  <div>
    <h4>center - 중앙 정렬</h4>
    <VStack align="center" />
  </div>
  <div>
    <h4>right - 오른쪽 정렬</h4>
    <VStack align="right" />
  </div>
  <div>
    <h4>stretch - 늘리기</h4>
    <VStack align="stretch" />
  </div>
</div>
```

**FlexOrVStackGuide**

```tsx
<Flex direction="column" gap="24">
  <p>
    VStack은 Flex의 자주 쓰는 세로 배치 패턴(`flex-direction="column"`,
    `justify-content="start"`, `align-items="center"`)을 의미 있는 이름과
    기본값으로 묶은 컴포넌트입니다.
    <br />
    단순 세로 스택은 `VStack`을, 방향 전환이나 세밀한 정렬 제어가 필요하면
    `Flex`를 사용하세요.
    <br />
    아래 예시처럼 같은 결과를 만들 수 있지만, 전달해야 하는 props가 줄어듭니다.
  </p>
  <div className={css({ border: "1px solid", padding: "16" })}>
    <h4>Flex</h4>
    <p>direction="column" justify="start" align="center" gap="8"</p>
    <Flex direction="column" justify="start" align="center" gap="8" />
  </div>
  <div className={css({ border: "1px solid", padding: "16" })}>
    <h4>VStack</h4>
    <p>gap="8"</p>
    <VStack gap="8" />
  </div>
</Flex>
```
