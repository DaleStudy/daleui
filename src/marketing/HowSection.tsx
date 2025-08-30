import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { Heading } from "../components/Heading/Heading";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import type { IconName } from "../tokens/iconography";

interface CardProps {
  /** 아이콘 */
  icon: IconName;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 링크 */
  link: string;
  /** 링크 텍스트 */
  linkText: string;
  /** 링크 비활성화 여부 */
  linkDisabled?: boolean;
}

function Card({
  icon,
  title,
  description,
  link,
  linkText,
  linkDisabled = false,
}: CardProps) {
  return (
    <div
      className={stack({
        align: "start",
        direction: "column",
        backgroundColor: "bg.neutral",
        width: "100%",
        py: "24px",
        px: "16px",
        gap: "24px",
        borderRadius: "md",
      })}
    >
      <div
        className={css({
          backgroundColor: "bg.brand",
          p: "12px",
          borderRadius: "lg",
          display: "inline-flex",
        })}
      >
        <Icon name={icon} size="lg" />
      </div>
      <div
        className={stack({
          direction: "column",
          gap: "4",
        })}
      >
        <p
          className={css({
            textStyle: "body.lg",
            fontWeight: "semibold",
            color: "fg.neutral",
          })}
        >
          {title}
        </p>
        <p
          className={css({
            textStyle: "body.md",
            color: "fg.neutral",
          })}
        >
          {description}
        </p>
      </div>
      {!linkDisabled ? (
        <Link href={link} external tone="brand" size="lg" underline={false}>
          <span className={css({ textStyle: "label.lg", fontWeight: "bold" })}>
            {linkText}
          </span>
          <Icon name="externalLink" size="sm" />
        </Link>
      ) : (
        <span
          className={css({
            textStyle: "label.lg",
            fontWeight: "bold",
            color: "fg.neutral.disabled",
          })}
        >
          {linkText}
        </span>
      )}
    </div>
  );
}

const CARDS: CardProps[] = [
  {
    icon: "GitHub",
    title: "깃허브 레포지토리",
    description: "설명문을 적어주세요.",
    link: "https://github.com/DaleStudy/daleui",
    linkText: "깃허브 레포지토리",
  },
  {
    icon: "Storybook",
    title: "스토리북",
    description: "설명문을 적어주세요.",
    link: "https://main--675790d317ba346348aa3490.chromatic.com/",
    linkText: "스토리북 보기",
  },
  {
    icon: "Figma",
    title: "피그마 디자인",
    description: "설명문을 적어주세요.",
    link: "",
    linkText: "준비중",
    linkDisabled: true,
  },
] as const;

export function HowSection() {
  return (
    <section
      className={css({
        width: "100%",
        py: "80px",
        backgroundColor: "bg.brand",
      })}
    >
      <div
        className={stack({
          direction: "column",
          width: {
            base: "100%",
            lg: "1280px",
          },
          mx: "auto",
          px: "24px",
          gap: "48px",
        })}
      >
        <Heading
          level={1}
          className={css({
            textAlign: "center",
          })}
        >
          달레 UI 살펴보기
        </Heading>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: {
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "24px",
            width: "100%",
            height: "100%",
          })}
        >
          {CARDS.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
