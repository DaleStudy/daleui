import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { hstack, vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { Heading } from "../../components/Heading/Heading";
import { Text } from "../../components/Text/Text";

const BACKGROUND_URL =
  "https://cdn.pixabay.com/photo/2022/08/31/15/05/seoul-7423574_640.jpg";

const styles = {
  whiteText: css({ color: "white" }),
};

export function Home() {
  return (
    <div className={vstack({ minHeight: "100vh", gap: 0 })}>
      <Header />
      <div
        className={vstack({
          flex: 1,
          width: "100%",
          background: `url(${BACKGROUND_URL}) center/cover no-repeat`,
          position: "relative",
        })}
      >
        <div
          className={css({
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.35)",
            zIndex: 1,
          })}
        />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header
      className={hstack({
        width: "100%",
        height: { base: "3rem", md: "4rem" },
        justifyContent: "space-between",
        padding: { base: "0 1rem", md: "0 1.5rem" },
        background: "teal.1",
        borderBottom: "2px solid",
        borderColor: "teal.2",
      })}
    >
      <div className={css({ display: { base: "block", md: "none" } })}>
        <Icon name="menu" aria-label="메뉴" />
      </div>
      <img
        src="/logo.svg"
        alt="DaleUI Logo"
        className={css({
          height: { base: "1.5rem", md: "2rem" },
          objectFit: "contain",
        })}
      />
      <nav
        className={hstack({
          gap: "gap.md",
          display: { base: "none", md: "flex" },
        })}
      >
        <Text>소개</Text>
        <Text>서비스</Text>
        <Text>스토리</Text>
        <Text>채용</Text>
      </nav>
      <Icon name="search" aria-label="검색" />
    </header>
  );
}

function MainContent() {
  return (
    <main
      className={css({
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: { base: "center", md: "baseline" },
        justifyContent: "center",
        flex: 1,
        width: "100%",
        height: "100%",
        paddingX: { base: 0, md: "12rem" },
      })}
    >
      <div
        className={vstack({
          gap: { base: "gap.md", md: "gap.lg" },
          alignItems: "baseline",
        })}
      >
        <Heading level={1} className={styles.whiteText}>
          달레 UI
        </Heading>
        <Text className={styles.whiteText}>한국어 친화적인 디자인시스템</Text>
        <div>
          <Button variant="solid" tone="accent" size="lg">
            문의하기
          </Button>
        </div>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer
      className={css({
        textAlign: "center",
        paddingY: { base: 1, md: 2 },
      })}
    >
      <Text className={styles.whiteText}>copyright DaleUI</Text>
    </footer>
  );
}
