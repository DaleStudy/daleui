# 달레UI 사용 규칙 (디자인 에이전트용)

## 셋업

- **프로바이더/래퍼 불필요.** 모든 스타일은 `styles.css`(→ `_ds_bundle.css`, `fonts/fonts.css`)로 로드된다. 컴포넌트를 바로 마운트하면 된다.
- 기본 테마는 라이트. **다크 모드**는 조상 요소에 `dark` 클래스를 추가하면 하위 전체에 적용된다 (`<div className="dark">…</div>`).
- 폰트는 자동 적용: 본문 Pretendard Variable(`var(--fonts-sans)`), 코드 JetBrains Mono(`var(--fonts-mono)`). 별도 로드 금지.

## 스타일링 규칙 — 반드시 지킬 것

달레UI는 **Panda CSS 빌드타임 시스템**이다. CSS 클래스는 빌드 시 생성되므로 **런타임에 새 유틸리티 클래스를 발명해도 동작하지 않는다** (`w_100px`, `bg-blue-500`, `p_4` 같은 클래스 작성 금지). 대신:

1. **레이아웃은 레이아웃 컴포넌트로**: `Box`, `Flex`, `Grid`+`GridItem`, `HStack`, `VStack`. `padding`/`margin`/`gap`은 토큰 문자열만 받는다: `"0"|"2"|"4"|"8"|"12"|"16"|"20"|"24"|"32"|"36"|"40"|"48"`. `Box`의 `width`/`height`는 `"240px"`, `"50%"`, `"20rem"` 형식. `Flex`는 `direction`/`justify`/`align`, `HStack`/`VStack`은 `justify`/`align`/`reversed`.
2. **텍스트는 텍스트 컴포넌트로**: `Heading`(`level` 1–5 **필수**, `size` 1–5, `tone`은 `brand|neutral`만), `Text`(`size` `xs|sm|md|lg|xl|2xl|3xl|4xl|5xl`, `weight` `normal|medium|semibold|bold`, `tone`, `muted`), `Label`(텍스트는 children이 아니라 **`labelText` prop**).
3. **색·간격이 더 필요하면 CSS 변수로** (`style` 속성에 사용):
   - 전경색 `var(--colors-fg-{brand|neutral|danger|success|warning|info})`; `brand`/`neutral`에만 `-hover`, `-active` 변형이 있다
   - 배경색 `var(--colors-bg-{brand|neutral|danger|success|warning|info})`, 진한 배경 `var(--colors-bg-solid-*)` (그 위의 글자는 `var(--colors-fg-solid-*)`)
   - 테두리 `var(--colors-border-{brand|neutral|danger|success|warning|info})`, 간격 `var(--spacing-{0|1|2|3|4|…|48|…|96})`, 모서리 `var(--radii-{xs|sm|md|lg|xl|2xl|3xl|4xl|full})`, 글자 크기 `var(--font-sizes-{2xs|xs|sm|md|lg|xl|2xl|…|9xl})`
4. **tone이 디자인 언어다**: 대부분의 컴포넌트가 `tone` prop을 받는다 (`Button`/`Checkbox`/`RadioGroup`/`Card`/`Link`/`Heading`은 `brand|neutral`(+Button은 `danger`), `Text`/`Icon`/`Tag`는 6종 전부). 색을 직접 칠하기 전에 tone으로 표현 가능한지 먼저 확인하라.

## 컴포넌트 (window.Daleui.\*)

`Box, Button, Card(+Card.Body, Card.Title, Card.Description, Card.Icon, Card.Link), Checkbox, CheckboxGroup(+CheckboxGroup.Item), Divider, Flex, Grid + GridItem, Heading, HStack, Icon, Label, Link, PasswordInput, RadioGroup(+RadioGroup.Item), Select, Skeleton(+Skeleton.Text, Skeleton.Avatar), Tag, Text, TextInput, VStack`

- 하위 컴포넌트는 평면 이름으로도 export된다: `CardBody`, `CardTitle`, `CardDescription`, `CardIcon`, `CardLink`, `CheckboxGroupItem`, `RadioGroupItem`, `GridItem`. `GridItem`은 평면 이름만 있다(`Grid.Item` 없음).
- `Button`: `variant` `solid|outline|ghost`, `size` `sm|md|lg`, `fullWidth`, `loading`, `disabled`.
- `Icon`: `name`은 lucide 아이콘의 카멜케이스 이름(`search`, `check`, `x`, `chevronDown`, `externalLink`, `circleAlert` … 전체 목록은 `Icon.d.ts`), `size` `xs|sm|md|lg`, `tone`, `solid`.
- 폼 계열(`Checkbox`, `RadioGroup`, `Select`, `TextInput`, `PasswordInput`)은 `label`/`helperText`/`errorMessage`/`invalid`/`required`/`disabled`/`readOnly`를 일관되게 지원한다. `RadioGroup`은 `name`과 `label`이 필수이고 자식으로 `RadioGroup.Item`을 넣는다. `TextInput`은 `leadingIcon`/`trailingIcon`(Icon 이름)을 받는다.
- `Link`는 `href` 필수, `external`이면 새 창 아이콘이 붙는다. `Tag`는 `onRemove`를 주면 제거 버튼이 생긴다.

## 진실의 원천

스타일 규칙과 토큰 전체는 `styles.css`가 가져오는 `_ds_bundle.css`에 있고, 각 컴포넌트의 정확한 API는 `components/components/<Name>/<Name>.d.ts`, 사용 예는 `<Name>.prompt.md`에 있다. 스타일을 짐작하지 말고 이 파일들을 읽어라.

## 관용 예시

```jsx
const { VStack, HStack, Heading, Text, Button, Icon, Card } = window.Daleui;

<VStack gap="16" padding="24" align="stretch">
  <Heading level={2} tone="brand">
    환영합니다
  </Heading>
  <Text tone="neutral">달레UI로 만든 화면입니다.</Text>
  <Card tone="brand">
    <Card.Icon name="award" />
    <Card.Body>
      <Card.Title>첫 카드</Card.Title>
      <Card.Description>tone과 하위 컴포넌트만으로 구성한다.</Card.Description>
    </Card.Body>
  </Card>
  <HStack gap="8">
    <Button tone="brand" variant="solid">
      시작하기
    </Button>
    <Button tone="neutral" variant="outline">
      문서 보기 <Icon name="externalLink" size="sm" />
    </Button>
  </HStack>
</VStack>;
```
