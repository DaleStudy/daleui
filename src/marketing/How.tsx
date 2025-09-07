import { css } from "../../styled-system/css";
import { stack, vstack } from "../../styled-system/patterns";
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
        py: "24",
        px: "16",
        gap: "24",
        borderRadius: "md",
      })}
    >
      <div
        className={css({
          backgroundColor: "bg.brand",
          p: "12",
          borderRadius: "lg",
          display: "inline-flex",
        })}
      >
        <Icon name={icon} size="lg" />
      </div>
      <div
        className={vstack({
          alignItems: "start",
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
    description: "프로젝트 소스를 관리하는 공간",
    link: "https://github.com/DaleStudy/daleui",
    linkText: "깃허브 레포지토리",
  },
  {
    icon: "Storybook",
    title: "스토리북",
    description: "컴포넌트를 빠르게 미리보고 테스트",
    link: "https://main--675790d317ba346348aa3490.chromatic.com/",
    linkText: "스토리북 보기",
  },
  {
    icon: "Figma",
    title: "피그마 디자인",
    description: "디자인 컴포넌트가 담긴 협업 툴",
    link: "",
    linkText: "준비중",
    linkDisabled: true,
  },
] as const;

export function How() {
  return (
    <section
      className={css({
        width: "100%",
        /**
         * TODO: 추후 spacing 토큰 추가 시 변경
         * spacing 토큰 부족으로 px 사용
         */
        py: "80px",
        backgroundColor: "bg.brand",
      })}
    >
      <div
        className={vstack({
          width: {
            base: "100%",
          },
          maxWidth: {
            base: "100%",
            lg: "1280px",
          },
          mx: "auto",
          px: "24",
          gap: "48",
        })}
      >
        <h3
          className={css({
            textAlign: "center",
            textStyle: "heading.3",
            fontSize: { base: "2xl", md: "3xl" },
          })}
        >
          달레 UI 살펴보기
        </h3>
        <div
          className={css({
            display: "grid",
            gridTemplateColumns: {
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "24",
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
