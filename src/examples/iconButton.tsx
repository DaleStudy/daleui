/**
 * 아이콘 버튼
 *
 * 버튼 안에서 HStack으로 아이콘과 라벨을 나란히 배치한다.
 */
import { Button, HStack, Icon } from "../index";

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
