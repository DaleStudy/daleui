/**
 * 토스트·알림 카드
 *
 * Card 안에 아이콘과 메시지를 HStack으로 나란히 배치한다.
 */
import { Card, HStack, Icon, Text } from "../index";

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
