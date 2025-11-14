import { css } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import { Card } from "../components/Card/Card";
import { Heading } from "../components/Heading/Heading";

const CARDS = [
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
    link: "https://www.figma.com/community/file/1559487636467651573",
    linkText: "피그마 디자인 보기",
  },
] as const;

export function How() {
  return (
    <section
      id="how"
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
          px: { base: "16", sm: "24" },
          gap: "48",
        })}
      >
        <Heading level={3} align="center">
          달레 UI 살펴보기
        </Heading>
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
              <Card.Link href={card.link} external>
                {card.linkText}
              </Card.Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
