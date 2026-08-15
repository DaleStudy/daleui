/**
 * 버튼 변형 모음
 *
 * `tone`과 `variant`를 조합해 강조 수준이 다른 액션을 나란히 배치한다.
 */
import { Button, HStack } from "../index";

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
