import { flex, stack, vstack } from "../../styled-system/patterns";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Tag } from "../components/Tag/Tag";
import { Text } from "../components/Text/Text";
import type { IconName } from "../tokens/iconography";
import { css } from "../../styled-system/css";

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
    <section
      className={vstack({
        bg: "bg.brand",
        px: { base: "0", lg: "24" },
        py: { base: "40", md: "60px", lg: "80px" },
        gap: "10",
      })}
    >
      <div
        className={vstack({
          gap: "40",
          px: { base: "16", lg: "24" },
          width: "100%",
          minWidth: { base: "auto", lg: "5xl" },
          maxWidth: { base: "auto", lg: "7xl" },
        })}
      >
        <div
          className={vstack({
            gap: "12",
            alignSelf: "stretch",
          })}
        >
          <Tag tone="brand">커뮤니티 & 참여</Tag>
          {/* 임시 헤딩 컴포넌트; TODO: 추후 헤딩 컴포넌트 완료시 변경 필요 */}
          <h4
            className={css({
              textWrap: "wrap",
              textAlign: "center",
              wordBreak: "keep-all",
              textStyle: "heading.4",
              fontSize: { base: "xl", sm: "2xl" }, // 320-640: 20px, 640+: 24px
              "& br": {
                display: { base: "none", sm: "inline" }, // 640+ 에서만 br 표시
              },
            })}
          >
            달레UI는 누구나 참여할 수 있는 커뮤니티 기반 프로젝트입니다.
            <br />
            함께 만들고, 함께 성장해요.
          </h4>
        </div>

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
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 임시 카드 컴포넌트
 * TODO: 카드 컴포넌트 완료시 제거 필요
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
      className={vstack({
        py: "24",
        px: "16",
        gap: "24",
        flex: "1 0 0",
        bg: "bg.neutral",
        borderRadius: "md",
        alignItems: "flex-start",
        width: "100%",
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
        <Icon name={icon} tone="brand" size="lg" />
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
        <Link href={href} tone="brand" size="lg" underline={false} external>
          {linkText}
          <Icon name="externalLink" tone="brand" size="sm" />
        </Link>
      )}
    </article>
  );
};
