import { css } from "../../styled-system/css";
import { stack, vstack } from "../../styled-system/patterns";
import { Icon } from "../components/Icon/Icon";
import { Text } from "../components/Text/Text";
import { Heading } from "../components/Heading/Heading";
import type { IconName } from "../tokens/iconography";

interface CardProps {
  /** 아이콘 */
  icon: IconName;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
}

function Card({ icon, title, description }: CardProps) {
  return (
    <div
      className={stack({
        align: "start",
        direction: "column",
        py: "24",
        px: "16",
        borderRadius: "md",
        alignItems: "flex-start",
        gap: "24",
      })}
    >
      <div
        className={css({
          p: "12",
          bg: "bg.brand",
          borderRadius: "lg",
          display: "inline-flex",
        })}
      >
        <Icon name={icon} size="lg" tone="brand" />
      </div>
      <div
        className={stack({
          align: "start",
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
    </div>
  );
}

const CARDS: CardProps[] = [
  {
    icon: "globe",
    title: "모두를 위한 경험 설계",
    description:
      "누구나 쉽게 시작할 수 있도록, 디자인 시스템의 진입 장벽을 낮춥니다.",
  },
  {
    icon: "kr",
    title: "한국어 최적화",
    description:
      "글로벌 기준을 참고하되, 한국어에 최적화된 현지화 경험을 제공합니다.",
  },
  {
    icon: "award",
    title: "믿고 쓰는 컴포넌트",
    description:
      "엄격한 품질 기준을 준수하며, 시스템 전반에 걸쳐 일관된 동작과 외관을 유지합니다.",
  },
  {
    icon: "users",
    title: "함께 만드는 시스템",
    description:
      "커뮤니티의 피드백과 기여로 함께 성장하는 오픈소스 디자인 시스템입니다.",
  },
] as const;

export function Mission() {
  return (
    <section
      id="mission"
      className={vstack({
        px: { base: "16", sm: "24", xl: "0" },
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
      <div
        className={vstack({
          gap: "72px",
          width: "100%",
          px: { base: "16", sm: "24" },
        })}
      >
        <Heading align="center" wordBreak="cjk" level={2}>
          달레 UI는 <Text tone="brand">한국어 친화적 디자인 시스템</Text>
          으로,
          <br />
          모두가 쉽게 협업하고 기여할 수 있도록 돕습니다.
        </Heading>

        <div
          className={css({
            display: "grid",
            gap: "24",
            gridTemplateColumns: {
              base: "1fr", // 320-640
              sm: "repeat(2, 1fr)", // 640-1024
              lg: "repeat(4, 1fr)", // 1024+
            },
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
