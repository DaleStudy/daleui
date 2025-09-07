import { Text } from "../../components/Text/Text";
import { Heading } from "../../components/Heading/Heading";
import MissionCard from "../MissionCard";

function Mission() {
  return (
    <section>
      <div className="d_flex ai_center flex-d_column">
        <Heading level={2}>
          달레 UI는 <Text tone="brand">한국어 친화적 디자인 시스템</Text>
          으로,
        </Heading>
      </div>
      <div className="d_flex ai_center flex-d_column">
        <Heading level={2}>
          모두가 쉽게 협업하고 기여할 수 있도록 돕습니다.
        </Heading>
      </div>
      <MissionCard />
    </section>
  );
}

export default Mission;
