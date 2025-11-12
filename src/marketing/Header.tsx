import { css } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import { Button } from "../components/Button/Button";
import { Heading } from "../components/Heading/Heading";

interface HeaderProps {
  handleScrollToSection: (sectionId: string) => void;
}

export function Header({ handleScrollToSection }: HeaderProps) {
  return (
    <section
      className={vstack({
        width: "100%",
        gap: "48",
        backgroundColor: "bg.brand",
        color: "fg.neutral",
        overflow: "hidden",
        py: { md: "80px", base: "60px" },
      })}
    >
      <div
        className={vstack({
          gap: "24",
          textAlign: "center",
          maxWidth: { base: "100%", md: "56rem" },
          px: { base: "16", sm: "24" },
        })}
      >
        <Heading level={1} align="center">
          한국어 환경에 특화된
          <br />
          모두를 위한 디자인 시스템, 달레UI
        </Heading>
        <p
          className={css({
            textStyle: "body.lg",
            fontWeight: "semibold",
            color: "fg.neutral.placeholder",
          })}
        >
          달레UI는 한국어 사용자 경험을 최우선으로 고려한 디자인 시스템입니다.
          <br />
          누구나 쉽고 빠르게 디자인하고 개발할 수 있도록, 구성요소부터 협업
          구조까지 전 과정을 함께 만들어갑니다.
        </p>
        <div>
          <Button
            variant="solid"
            tone="brand"
            size="lg"
            onClick={() => handleScrollToSection("mission")}
          >
            더 알아보기
          </Button>
        </div>
      </div>
      <div
        className={css({
          width: "100%",
          height: { base: "150px", sm: "264px", lg: "320px", xl: "370px" },
          backgroundColor: "bg.neutral.subtle",
          backgroundImage: {
            base: "url('/src/assets/images/marketing/header/light/background-light-sm.webp')",
            sm: "url('/src/assets/images/marketing/header/light/background-light-lg.webp')",
            xl: "url('/src/assets/images/marketing/header/light/background-light-xl.webp')",
            _dark: {
              base: "url('/src/assets/images/marketing/header/dark/background-dark-sm.webp')",
              sm: "url('/src/assets/images/marketing/header/dark/background-dark-lg.webp')",
              xl: "url('/src/assets/images/marketing/header/dark/background-dark-xl.webp')",
            },
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        })}
      ></div>
    </section>
  );
}
