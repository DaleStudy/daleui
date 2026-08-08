/**
 * 기본 로그인 폼
 *
 * VStack으로 세로 배치하고 `align="stretch"`로 입력 필드를 가로로 꽉 채운다.
 * 폼 필드에는 반드시 `label`을 지정한다.
 */
import {
  Button,
  Heading,
  Link,
  PasswordInput,
  Text,
  TextInput,
  VStack,
} from "../index";

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
