import { css } from "../../styled-system/css";
import { vstack } from "../../styled-system/patterns";
import { Button } from "../components/Button/Button";

export function Header() {
  return (
    <section
      className={vstack({
        width: "100%",
        justifyContent: "center",
        gap: "48",
        backgroundColor: "bg.brand",
        color: "fg.neutral",
        position: "relative",
        overflow: "hidden",
        py: { md: "80px", base: "60px" },
      })}
    >
      <div
        className={vstack({
          gap: "24",
          alignItems: "center",
          textAlign: "center",
          maxWidth: { base: "100%", md: "56rem" },
          mx: "auto",
          px: { base: "16", sm: "24" },
        })}
      >
        <h1
          className={css({
            textAlign: "center",
            textStyle: "heading.1",
            fontSize: { base: "3xl", md: "5xl" },
            fontWeight: "bold",
          })}
        >
          한국어 환경에 특화된
          <br />
          모두를 위한 디자인 시스템, 달레UI
        </h1>
        <p
          className={css({
            textAlign: "center",
            fontFamily: "sans",
            fontSize: "lg",
            fontWeight: "semibold",
            lineHeight: "150%",
            letterSpacing: "balanced",
            color: "fg.neutral.placeholder",
            margin: 0,
          })}
        >
          달레UI는 한국어 사용자 경험을 최우선으로 고려한 디자인 시스템입니다.
          <br />
          누구나 쉽고 빠르게 디자인하고 개발할 수 있도록, 구성요소부터 협업
          구조까지 전 과정을 함께 만들어갑니다.
        </p>
        <div>
          <Button variant="solid" tone="brand" size="lg">
            더 알아보기
          </Button>
        </div>
      </div>
      <div
        className={css({
          width: "100%",
          height: { base: "150px", md: "264px", xl: "370px" },
          backgroundColor: "bg.neutral.subtle",
          borderRadius: "lg",
          backgroundImage: {
            base: "url('/src/assets/images/marketing/header/background-light.webp')",
            _dark:
              "url('/src/assets/images/marketing/header/background-dark.webp')",
          },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "fg.neutral.muted",
          fontSize: "sm",
          fontWeight: "medium",
        })}
      ></div>
    </section>
  );
}

export default Header;
