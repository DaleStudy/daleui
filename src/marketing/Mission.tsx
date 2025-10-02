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
        p: "24 16",
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
      className={vstack({
        px: { base: "16", sm: "24" },
        py: { base: "80" },
        alignSelf: "stretch",
      })}
    >
      <div
        className={vstack({
          gap: "72px",
          width: "100%",
          minWidth: { base: "auto", lg: "5xl" },
          maxWidth: { base: "auto", lg: "7xl" },
        })}
      >
        <div
          className={vstack({
            alignSelf: "stretch",
          })}
        >
          {/* TODO: heading 컴포넌트 작업 완료 시 변경 */}
          {/* <h2
            className={css({
              textWrap: "wrap",
              textAlign: "center",
              wordBreak: "break-all",
              textStyle: "heading.2",
              fontSize: { base: "3xl", sm: "4xl" }, // 320-640: 30px, 640+: 36px
              "& br": {
                display: {
                  base: "none",
                  lg: "inline", // 1024+ 에서만 br 표시
                },
              },
            })}
          > */}
          <Heading align="center" wordBreak="cjk" level={2}>
            달레 UI는 <Text tone="brand">한국어 친화적 디자인 시스템</Text>
            으로,
            <br />
            모두가 쉽게 협업하고 기여할 수 있도록 돕습니다.
          </Heading>
          {/* </h2> */}
        </div>

        <div
          className={css({
            display: "grid",
            alignSelf: "stretch",
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
