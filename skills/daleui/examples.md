# daleui 조합 예시

> 실제로 자주 쓰이는 패턴. 컴포넌트 조합의 레퍼런스로 활용한다.

## 1. 기본 로그인 폼

```tsx
import "daleui/styles.css";
import { VStack, Heading, TextInput, PasswordInput, Button, Link, Text } from "daleui";

export function LoginForm() {
  return (
    <VStack gap="24" align="stretch">
      <Heading level={2}>로그인</Heading>

      <TextInput
        label="이메일"
        type="email"
        placeholder="example@daleui.com"
      />
      <PasswordInput label="비밀번호" />

      <Button type="submit" fullWidth>
        로그인
      </Button>

      <Text>
        계정이 없으신가요?{" "}
        <Link href="/signup">회원가입</Link>
      </Text>
    </VStack>
  );
}
```

## 2. 버튼 변형 모음

```tsx
import { HStack, Button } from "daleui";

<HStack gap="8">
  <Button tone="brand" variant="solid">저장</Button>
  <Button tone="brand" variant="outline">취소</Button>
  <Button tone="danger" variant="ghost">삭제</Button>
</HStack>
```

## 3. 토스트·알림 카드

```tsx
import { Card, HStack, Icon, Text } from "daleui";

<Card tone="brand" outline>
  <HStack gap="8">
    <Icon name="checkCircle" />
    <Text>저장이 완료되었습니다.</Text>
  </HStack>
</Card>
```

## 4. 폼 + 라디오 그룹

```tsx
import { VStack, Label, RadioGroup, Button } from "daleui";

<VStack gap="16" align="stretch">
  <Label>구독 플랜 선택</Label>
  <RadioGroup
    name="plan"
    options={[
      { label: "무료", value: "free" },
      { label: "스타터 (월 9,900원)", value: "starter" },
      { label: "프로 (월 29,900원)", value: "pro" },
    ]}
  />
  <Button type="submit">결제하기</Button>
</VStack>
```

## 5. 그리드 카드 목록

```tsx
import { Grid, GridItem, Card, Heading, Text } from "daleui";

<Grid columns={{ base: 1, md: 3 }} gap="16">
  {items.map((item) => (
    <GridItem key={item.id}>
      <Card outline>
        <Heading level={4}>{item.title}</Heading>
        <Text>{item.description}</Text>
      </Card>
    </GridItem>
  ))}
</Grid>
```

## 6. 검색 인풋 + 버튼 조합

```tsx
import { HStack, TextInput, Button } from "daleui";

<HStack gap="8" align="flex-end">
  <TextInput
    label="검색어"
    placeholder="컴포넌트 이름으로 검색"
  />
  <Button type="submit" tone="brand">검색</Button>
</HStack>
```

## 7. 아이콘 버튼

```tsx
import { HStack, Icon, Button } from "daleui";

<Button tone="neutral" variant="outline">
  <HStack gap="4">
    <Icon name="download" />
    다운로드
  </HStack>
</Button>
```
