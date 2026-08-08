/**
 * 검색 인풋 + 버튼 조합
 *
 * HStack의 `align="bottom"`으로 입력 필드와 버튼의 밑변을 맞춘다.
 */
import { Button, HStack, TextInput } from "../index";

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
