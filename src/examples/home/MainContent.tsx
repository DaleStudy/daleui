import { Button } from "../../components/Button/Button";
import { vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { Heading } from "../../components/Heading/Heading";
import { Text } from "../../components/Text/Text";

export function MainContent() {
  return (
    <main className={mainContentStyle}>
      <Heading level={1} className={whiteText}>
        달레 UI
      </Heading>
      <Text className={whiteText}>한국어 친화적인 디자인시스템</Text>
      <div>
        <Button variant="solid" tone="accent" size="lg">
          문의하기
        </Button>
      </div>
    </main>
  );
}

const mainContentStyle = vstack({
  position: "relative",
  zIndex: 2,
  alignItems: "baseline",
  justifyContent: "center",
  flex: 1,
  width: "100%",
  paddingX: { base: "2rem", md: "12rem" },
  gap: { base: "gap.md", md: "gap.lg" },
});

const whiteText = css({ color: "white" });
