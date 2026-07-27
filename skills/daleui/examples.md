# daleui 조합 예시

> 자동 생성 — 수동 편집하지 마세요. 원본: `src/examples/*.tsx` (tsc로 타입 검증됨).
> 각 예시는 `import "daleui/styles.css"`가 적용된 환경을 가정한다.

## 1. 토스트·알림 카드

Card 안에 아이콘과 메시지를 HStack으로 나란히 배치한다.

```tsx
import { Card, HStack, Icon, Text } from "daleui";

export function AlertCard() {
  return (
    <Card tone="brand" outline>
      <HStack gap="8">
        <Icon name="check" />
        <Text>저장이 완료되었습니다.</Text>
      </HStack>
    </Card>
  );
}
```

## 2. 버튼 변형 모음

`tone`과 `variant`를 조합해 강조 수준이 다른 액션을 나란히 배치한다.

```tsx
import { Button, HStack } from "daleui";

export function ButtonVariants() {
  return (
    <HStack gap="8">
      <Button tone="brand" variant="solid">
        저장
      </Button>
      <Button tone="brand" variant="outline">
        취소
      </Button>
      <Button tone="danger" variant="ghost">
        삭제
      </Button>
    </HStack>
  );
}
```

## 3. 그리드 카드 목록

Grid·GridItem으로 카드를 3열로 배치한다. `gridTemplateColumns`로 열 수를 지정한다.

```tsx
import { Card, Grid, GridItem, Heading, Text } from "daleui";

const items = [
  {
    id: 1,
    title: "빠른 시작",
    description: "5분 만에 설치하고 사용해 보세요.",
  },
  {
    id: 2,
    title: "접근성",
    description: "키보드와 스크린 리더를 기본 지원합니다.",
  },
  {
    id: 3,
    title: "다크 모드",
    description: "시맨틱 토큰으로 자동 대응합니다.",
  },
];

export function GridCards() {
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gap="16">
      {items.map((item) => (
        <GridItem key={item.id}>
          <Card outline>
            <Heading level={4}>{item.title}</Heading>
            <Text>{item.description}</Text>
          </Card>
        </GridItem>
      ))}
    </Grid>
  );
}
```

## 4. 아이콘 버튼

버튼 안에서 HStack으로 아이콘과 라벨을 나란히 배치한다.

```tsx
import { Button, HStack, Icon } from "daleui";

export function IconButton() {
  return (
    <Button tone="neutral" variant="outline">
      <HStack gap="4">
        <Icon name="externalLink" />
        자세히 보기
      </HStack>
    </Button>
  );
}
```

## 5. 기본 로그인 폼

VStack으로 세로 배치하고 `align="stretch"`로 입력 필드를 가로로 꽉 채운다.
폼 필드에는 반드시 `label`을 지정한다.

```tsx
import {
  Button,
  Heading,
  Link,
  PasswordInput,
  Text,
  TextInput,
  VStack,
} from "daleui";

export function LoginForm() {
  return (
    <VStack gap="24" align="stretch">
      <Heading level={2}>로그인</Heading>

      <TextInput label="이메일" type="email" placeholder="example@daleui.com" />
      <PasswordInput label="비밀번호" />

      <Button type="submit" fullWidth>
        로그인
      </Button>

      <Text>
        계정이 없으신가요? <Link href="/signup">회원가입</Link>
      </Text>
    </VStack>
  );
}
```

## 6. 폼 + 라디오 그룹

RadioGroup으로 단일 선택지를 제공하고 제출 버튼과 함께 세로로 배치한다.

```tsx
import { Button, RadioGroup, VStack } from "daleui";

export function PlanForm() {
  return (
    <VStack gap="16" align="stretch">
      <RadioGroup name="plan" label="구독 플랜 선택">
        <RadioGroup.Item value="free">무료</RadioGroup.Item>
        <RadioGroup.Item value="starter">스타터 (월 9,900원)</RadioGroup.Item>
        <RadioGroup.Item value="pro">프로 (월 29,900원)</RadioGroup.Item>
      </RadioGroup>
      <Button type="submit">결제하기</Button>
    </VStack>
  );
}
```

## 7. 검색 인풋 + 버튼 조합

HStack의 `align="bottom"`으로 입력 필드와 버튼의 밑변을 맞춘다.

```tsx
import { Button, HStack, TextInput } from "daleui";

export function SearchInput() {
  return (
    <HStack gap="8" align="bottom">
      <TextInput label="검색어" placeholder="컴포넌트 이름으로 검색" />
      <Button type="submit" tone="brand">
        검색
      </Button>
    </HStack>
  );
}
```
