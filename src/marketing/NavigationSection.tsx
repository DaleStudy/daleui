import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Button } from "../components/Button/Button";
import { useState } from "react";

export function NavigationSection() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <nav
      className={stack({
        direction: { base: "column", lg: "row" },
        width: {
          base: "100%",
          lg: "1024px",
        },
        px: { base: "0", lg: "24" },
        py: { base: "0", lg: "5px" },
        justifyContent: "space-between",
        alignItems: { base: "flex-start", lg: "center" },
        position: "relative",
        gap: { base: "0", lg: "24" },
      })}
    >
      {/* 로고 */}
      <div
        className={css({
          width: { base: "100%", lg: "auto" },
          height: "71px",
          px: { base: 16 },
          display: "flex",
          alignItems: "center",
        })}
      >
        <Link href="/" underline={false}>
          <img
            src="/logo.svg"
            alt="DaleUI Logo"
            className={css({
              height: { base: "1.5rem", md: "2rem" },
              objectFit: "contain",
            })}
          />
          <div className={css({ textStyle: "label.lg", fontWeight: "bold" })}>
            Dale UI
          </div>
        </Link>
        <span
          className={css({
            display: { base: "inline-flex", lg: "none" },
            position: "absolute",
            top: "16",
            right: "16",
          })}
        >
          <Icon
            tone="brand"
            name={isOpenMenu ? "x" : "menu"}
            size="lg"
            onClick={() => setIsOpenMenu((v) => !v)}
          />
        </span>
      </div>

      {/* 링크 & 토글 & 후원하기 */}
      {/* <div
        className={css({
          width: { base: "100%", lg: "auto" },
          px: { base: "24", lg: "0" },
          py: { base: "24", lg: "0" },
          display: { base: isOpenMenu ? "flex" : "none", lg: "flex" },
          justifyContent: "space-between",
          gap: { base: "24", lg: "auto" },
        })}
      > */}
      <ul
        className={stack({
          gap: { base: "24", lg: "45" },
          display: "flex",
          direction: { base: "column", lg: "row" },
          alignItems: { base: "flex-start", lg: "center" },
          width: { base: "100%", lg: "auto" },
          paddingLeft: { base: "24", lg: "0" },
          paddingRight: { base: "24", lg: "0" },
          paddingTop: { base: "24", lg: "0" },
        })}
      >
        <li>
          <Link href="/" underline={false} tone="neutral" size="lg">
            깃허브
          </Link>
        </li>
        <li>
          <Link href="/" underline={false} tone="neutral" size="lg">
            스토리북
          </Link>
        </li>
        <li>
          <Link href="/" underline={false} tone="neutral" size="lg">
            피그마 디자인
          </Link>
        </li>
      </ul>

      {/* 토글 & 후원하기 */}
      <ul
        className={stack({
          gap: "22",
          display: "flex",
          direction: { base: "column", lg: "row" },
          alignItems: { base: "flex-start", lg: "center" },
          width: { base: "100%", lg: "auto" },
          padding: { base: "24", lg: "0" },
        })}
      >
        <li>
          <Icon name="sun" size="lg" tone="brand" />
        </li>
        <li
          className={css({
            width: { base: "100%", lg: "auto" },
            "& > button": { width: { base: "100%", lg: "auto" } },
          })}
        >
          <Button>후원하기</Button>
        </li>
      </ul>
      {/* </div> */}
    </nav>
  );
}
