import { css } from "../../styled-system/css";
import { Card } from "../components/Card/Card";
import { Heading } from "../components/Heading/Heading";
import { VStack } from "../components/VStack/VStack";
import { Text } from "../components/Text/Text";

const CARDS = [
  {
    icon: "kr",
    title: "한국어 사용자 중심 설계",
    description:
      "한국어 타이포그래피의 특성과 국내 사용 패턴을 깊이 이해하고 반영합니다. 글로벌 디자인 시스템의 좋은 사례를 따르되 한국어 환경에서 가독성과 사용성이 떨어지지 않도록 신경 씁니다.",
  },
  {
    icon: "award",
    title: "신뢰할 수 있는 시스템",
    description:
      "접근성(WCAG) 준수, 디자인과 구현 간 일치, 예측 가능한 API로 믿고 쓰는 경험을 만듭니다. 검증된 Headless UI 코어 위에 완성도 높은 기본 스타일을 제공하되, 필요하면 스타일을 걷어내고 자유롭게 확장할 수 있습니다.",
  },
  {
    icon: "users",
    title: "커뮤니티 중심 발전",
    description:
      "오픈소스 정신에 따라 커뮤니티 참여와 기여를 환영합니다. 모든 설계 결정의 근거를 공개하고 누구나 같은 방향으로 기여하도록 문서화와 기여 가이드를 꾸준히 관리합니다.",
  },
] as const;

export function Mission() {
  return (
    <VStack
      as="section"
      id="mission"
      className={css({
        py: { base: "80px" },
        alignSelf: "stretch",
        width: "100%",
        maxWidth: {
          base: "100%",
          xl: "1280px",
        },
        mx: "auto",
      })}
    >
      <VStack
        className={css({
          width: "100%",
          px: { base: "16", sm: "24" },
          gap: "72px",
        })}
      >
        <Heading align="center" wordBreak="cjk" level={2}>
          달레 UI는{" "}
          <Text tone="brand">한국어 환경에 맞는 오픈소스 디자인 시스템</Text>
          으로,
          <br />
          디자이너와 개발자가 접근성 높은 프로덕트를 쉽고 빠르게 함께 만들도록
          돕습니다.
        </Heading>

        <div
          className={css({
            display: "grid",
            gap: "24",
            gridTemplateColumns: {
              base: "1fr", // 320-640
              sm: "repeat(2, 1fr)", // 640-1024
              lg: "repeat(3, 1fr)", // 1024+
            },
          })}
        >
          {CARDS.map((card) => (
            <Card
              key={card.title}
              tone="brand"
              className={css({
                flex: 1,
              })}
            >
              <Card.Icon name={card.icon} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Description>{card.description}</Card.Description>
              </Card.Body>
            </Card>
          ))}
        </div>
      </VStack>
    </VStack>
  );
}
