import type { StoryObj } from "@storybook/react";
import { hstack, vstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { Icon } from "../../components/Icon/Icon";
import { Link } from "../../components/Link/Link";
import { Text } from "../../components/Text/Text";
import { Heading } from "../../components/Heading/Heading";
import { Button } from "../../components/Button/Button";

export default {
  parameters: {
    layout: "fullscreen",
  },
};

export const Default: StoryObj = {
  render: (args) => {
    const MENU_ITEMS = ["소개", "서비스", "스토리", "채용"];
    return (
      <div className={vstack({ minHeight: "100vh", gap: 0 })} {...args}>
        <header
          className={hstack({
            width: "100%",
            height: { base: "3rem", md: "4rem" },
            justifyContent: "space-between",
            paddingX: { base: "16", md: "24" },
            borderBottom: "2px solid",
            background: { base: "white", _dark: "tealDark.1" },
            borderColor: { base: "teal.7", _dark: "tealDark.7" },
            color: { base: "teal.11", _dark: "tealDark.11" },
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
              gap: "24",
              display: { base: "none", md: "flex" },
            })}
            aria-label="주요 메뉴"
          >
            {MENU_ITEMS.map((item) => (
              <Link key={item} underline={false} href={"#"}>
                {item}
              </Link>
            ))}
          </nav>
          <Icon name="search" aria-label="검색" />
        </header>
        <main
          className={vstack({
            alignItems: "baseline",
            justifyContent: "center",
            flex: 1,
            width: "100%",
            paddingX: { base: "32", md: "12rem" },
            gap: { base: "24", md: "32" },
          })}
        >
          <Heading level={1}>달레 UI</Heading>
          <Text>한국어 친화적인 디자인시스템</Text>
          <div>
            <Button variant="solid" tone="accent" size="lg">
              문의하기
            </Button>
          </div>
        </main>
        <footer
          className={css({
            textAlign: "center",
            paddingY: { base: "4", md: "8" },
            borderTop: "2px solid",
            background: { base: "teal.1", _dark: "tealDark.1" },
            borderColor: { base: "teal.7", _dark: "tealDark.7" },
            width: "100%",
          })}
        >
          <Text>copyright DaleUI</Text>
        </footer>
      </div>
    );
  },
};
