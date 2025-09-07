import { Heading } from "../components/Heading/Heading";
import { Icon } from "../components/Icon/Icon";
import { Text } from "../components/Text/Text";

function MissionCard() {
  return (
    <section>
        {/* 일단 피그마 상의 component 자체는 DisplayCard라고 이름이 지어져 있었음을 참고 */}
        <Icon name="info" />
        {/* global icon을 써야 할 거 같은데... 일단 여기 들어갈 value들 다 props로 받아와야겠네.*/}
        <Heading level={4}>모두를 위한 경험 설계</Heading>
        <Text size={"sm"}>누구나 쉽게 시작할 수 있도록, 디자인 시스템의 진입 장벽을 낮춥니다.</Text>
        link(on/off)
    </section>
  )
}

export default MissionCard;
