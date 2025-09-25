import { flex, stack, vstack } from "../../styled-system/patterns";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Tag } from "../components/Tag/Tag";
import { Text } from "../components/Text/Text";
import type { IconName } from "../tokens/iconography";
import { Heading } from "../components/Heading/Heading";

export function Contribution() {
  return (
    <section
      className={vstack({
        bg: "bg.brand",
        px: { base: "0", lg: "24" },
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
          px: { base: "16", md: "24" },
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
          <Heading level={4} wordBreak="keep-all" align="center">
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
          {/* TODO: 카드 컴포넌트 개발 완료시 변경 */}
          <Card
            icon="star"
            title="깃허브 스타로 프로젝트 응원하기"
            description="간단한 클릭 한 번으로 저희에게 큰 힘이 됩니다. 깃허브 스타는 프로젝트의 가치를 알리는 가장 쉬운 방법입니다."
            linkText="스타 남기고 응원하기"
            href="https://github.com/DaleStudy/daleui"
          />
          <Card
            icon="handHeart"
            title="깃허브 스폰서로 지속적인 개발 후원하기"
            description="깃허브 스폰서를 통해 프로젝트의 지속적인 발전을 도와주실 수 있습니다."
            linkText="후원하기"
            href="https://github.com/sponsors/DaleStudy"
          />
          <Card
            icon="thumbsUp"
            title="개발 과정을 담은 블로그 읽어보기"
            description="프로젝트 개발 과정, 고민했던 지점들, 그리고 해결 과정을 솔직하게 담은 블로그입니다. "
            linkText="좋아요 하러 가기"
            href="https://github.com/DaleStudy/daleui/discussions"
          />
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
      <div
        className={stack({
          gap: "4",
          flex: "1 0 0",
          alignSelf: "stretch",
        })}
      >
        <Text size="lg" weight="semibold" as="p">
          {title}
        </Text>
        <Text size="md" as="p">
          {description}
        </Text>
      </div>
      {href && (
        <Link href={href} size="lg" tone="brand" underline={false} external>
          {linkText}
          <Icon name="externalLink" tone="brand" size="sm" />
        </Link>
      )}
    </article>
  );
};
