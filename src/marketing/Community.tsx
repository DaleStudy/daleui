import { css } from "../../styled-system/css";
import { VStack } from "../components/VStack/VStack";
import { Card } from "../components/Card/Card";
import { Heading } from "../components/Heading/Heading";
import { Tag } from "../components/Tag/Tag";

const communityCards = [
  {
    icon: "Discord" as const,
    title: "커뮤니티 참여하기",
    description: "디스코드에서 소통하며 함께 달레 UI를 만들어가요.",
    linkText: "디스코드 입장하기",
    href: "https://discord.gg/RvAJxsKM",
  },
  {
    icon: "messageCircleMore" as const,
    title: "피드백 남기기",
    description:
      "깃허브 스폰서를 통해 프로젝트의 지속적인 발전을 도와주실 수 있습니다.",
    linkText: "이슈 등록하기",
    href: "https://github.com/DaleStudy/daleui/issues",
  },
  {
    icon: "codeXml" as const,
    title: "직접 기여하기",
    description: "코드로 직접 기여하고 싶다면 깃허브에서 PR을 보내주세요.",
    linkText: "깃허브 PR 보내러 가기",
    href: "https://github.com/DaleStudy/daleui/pulls",
  },
  {
    icon: "heartHandshake" as const,
    title: "코어 팀 참여하기",
    description: "꾸준히 기여하고 싶은 분이라면, 코어 팀에 신청을 해주세요.",
    linkText: "코어 팀 관심 등록하기",
    href: "https://github.com/DaleStudy/daleui/discussions",
  },
] as const;

export function Community() {
  return (
    <VStack
      as="section"
      id="community"
      gap="10"
      className={css({
        bg: "bg.brand",
        py: { base: "40", md: "60px", lg: "80px" },
      })}
    >
      <VStack
        gap="40"
        className={css({
          px: { base: "16", sm: "24" },
          width: "100%",
          minWidth: { base: "auto", lg: "5xl" },
          maxWidth: { base: "auto", lg: "7xl" },
        })}
      >
        <VStack
          gap="12"
          className={css({
            alignSelf: "stretch",
          })}
        >
          <Tag tone="brand">커뮤니티 & 참여</Tag>
          <Heading level={4} align="center" wordBreak="cjk">
            달레UI는 누구나 참여할 수 있는 커뮤니티 기반 프로젝트입니다.
            <br />
            함께 만들고, 함께 성장해요.
          </Heading>
        </VStack>

        <div
          className={css({
            display: "grid",
            gap: { base: "16", sm: "24" },
            alignSelf: "stretch",
            gridTemplateColumns: {
              base: "1fr", // 320-640
              sm: "repeat(2, 1fr)", // 640-1024
              lg: "repeat(4, 1fr)", // 1024+
            },
          })}
        >
          {communityCards.map((card) => (
            <Card key={card.title} tone="brand">
              <Card.Icon name={card.icon} />
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Description>{card.description}</Card.Description>
              </Card.Body>
              <Card.Link href={card.href} external>
                {card.linkText}
              </Card.Link>
            </Card>
          ))}
        </div>
      </VStack>
    </VStack>
  );
}
