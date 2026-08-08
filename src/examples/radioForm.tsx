/**
 * 폼 + 라디오 그룹
 *
 * RadioGroup으로 단일 선택지를 제공하고 제출 버튼과 함께 세로로 배치한다.
 */
import { Button, RadioGroup, VStack } from "../index";

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
