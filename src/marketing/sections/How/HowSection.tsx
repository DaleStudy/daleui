import { css } from "../../../../styled-system/css";
import { Heading } from "../../../components/Heading/Heading";
import { Card, type CardProps } from "../../components/Card/Card";

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

export const HowSection = () => {
  return (
    <section
      className={css({
        width: "100%",
        py: "80px",
        backgroundColor: "bg.brand",
      })}
    >
      <div
        className={css({
          width: {
            base: "100%",
            lg: "1280px",
          },
          mx: "auto",
          px: "24px",
          display: "flex",
          flexDirection: "column",
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
};
