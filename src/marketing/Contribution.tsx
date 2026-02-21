import { css } from "../../styled-system/css";
import { flex, stack } from "../../styled-system/patterns";
import { Card } from "../components/Card/Card";
import { VStack } from "../components/VStack/VStack";
import { Heading } from "../components/Heading/Heading";
import { Tag } from "../components/Tag/Tag";

const contributionCards = [
  {
    icon: "star" as const,
    title: "깃허브 스타로 프로젝트 응원하기",
    description:
      "간단한 클릭 한 번으로 저희에게 큰 힘이 됩니다. 깃허브 스타는 프로젝트의 가치를 알리는 가장 쉬운 방법입니다.",
    linkText: "스타 남기고 응원하기",
    href: "https://github.com/DaleStudy/daleui",
  },
  {
    icon: "handHeart" as const,
    title: "깃허브 스폰서로 지속적인 개발 후원하기",
    description:
      "깃허브 스폰서를 통해 프로젝트의 지속적인 발전을 도와주실 수 있습니다.",
    linkText: "후원하기",
    href: "https://github.com/sponsors/DaleStudy",
  },
  {
    icon: "thumbsUp" as const,
    title: "개발 과정을 담은 블로그 읽어보기",
    description:
      "프로젝트 개발 과정, 고민했던 지점들, 그리고 해결 과정을 솔직하게 담은 블로그입니다. ",
    linkText: "좋아요 하러 가기",
    href: "https://github.com/DaleStudy/daleui/discussions",
  },
] as const;

export function Contribution() {
  return (
    <VStack
      as="section"
      id="contribution"
      className={css({
        bg: "bg.brand",
        minWidth: { base: "auto", lg: "5xl" },
        /**
         * TODO: 추후 spacing 토큰 추가 시 변경
         * spacing 토큰 부족으로 px 사용
         */
        py: { base: "40", md: "60px", lg: "80px" },
      })}
    >
      <div
        className={stack({
          py: "0",
          gap: "40",
          px: { base: "16", sm: "24" },
          maxWidth: { base: "auto", lg: "7xl" },
          minWidth: { base: "auto", lg: "5xl" },
        })}
      >
        <VStack
          gap="12"
          className={css({
            alignSelf: "stretch",
          })}
        >
          <Tag tone="brand">기여 & 응원</Tag>
          <Heading level={4} wordBreak="cjk" align="center">
            프로젝트의 성공을 위해 응원도 부탁드립니다.
          </Heading>
        </VStack>
        <div
          className={flex({
            gap: "24",
            alignSelf: "stretch",
            flexDirection: { base: "column", lg: "row" },
          })}
        >
          {contributionCards.map((card) => (
            <Card.Root
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
              <Card.Link href={card.href} external>
                {card.linkText}
              </Card.Link>
            </Card.Root>
          ))}
        </div>
      </div>
    </VStack>
  );
}
