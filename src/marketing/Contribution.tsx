import { css } from "../../styled-system/css";
import { flex, stack, vstack } from "../../styled-system/patterns";
import { Card } from "../components/Card/Card";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Tag } from "../components/Tag/Tag";
import { Text } from "../components/Text/Text";
import { VStack } from "../components/VStack/VStack";
import type { IconName } from "../tokens/iconography";
import { Heading } from "../components/Heading/Heading";
import { css } from "../../styled-system/css";

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
    <section
      id="contribution"
      className={vstack({
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
        <div
          className={vstack({
            gap: "12",
            alignSelf: "stretch",
          })}
        >
          <Tag tone="brand">기여 & 응원</Tag>
          <Heading level={4} wordBreak="cjk" align="center">
            프로젝트의 성공을 위해 응원도 부탁드립니다.
          </Heading>
        </div>
        <div
          className={flex({
            gap: "24",
            alignSelf: "stretch",
            flexDirection: { base: "column", lg: "row" },
          })}
        >
          {contributionCards.map((card) => (
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
              <Card.Link href={card.href} external>
                {card.linkText}
              </Card.Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * TODO: 카드 컴포넌트 개발 완료시 제거
 * 임시 카드 컴포넌트
 */
const Card = ({
  icon,
  title,
  description,
  linkText,
  href,
}: {
  icon: IconName;
  title: string;
  description: string;
  linkText?: string;
  href?: string;
}) => {
  return (
    <article
      className={stack({
        py: "24",
        px: "16",
        gap: "24",
        flex: "1 0 0",
        bg: "bg.neutral",
        borderRadius: "md",
        alignItems: "flex-start",
      })}
    >
      <div
        className={flex({
          p: "12",
          bg: "bg.brand",
          borderRadius: "lg",
          alignItems: "center",
        })}
      >
        <Icon name={icon} tone="brand" />
      </div>
      <VStack
        align="stretch"
        gap="4"
        className={css({
          flex: "1 0 0",
        })}
      >
        <Text size="lg" weight="semibold" as="p">
          {title}
        </Text>
        <Text size="md" as="p">
          {description}
        </Text>
      </VStack>
      {href && (
        <Link href={href} size="lg" tone="brand" underline={false} external>
          {linkText}
          <Icon name="externalLink" tone="brand" size="sm" />
        </Link>
      )}
    </article>
  );
};
