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
        direction: { base: "column", md: "row" },
        width: {
          base: "100%",
        },
        maxWidth: { base: "100%", md: "1280px" },
        px: { base: "0", md: "24" },
        py: { base: "0", md: "5px" },
        justifyContent: "space-between",
        alignItems: { base: "flex-start", md: "center" },
        position: "relative",
        gap: { base: "0" },
      })}
    >
      <div
        className={css({
          width: { base: "100%", md: "auto" },
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
              marginRight: "10px",
            })}
          />
          <div
            className={css({
              color: "fg.brand",
              fontFamily: "Roboto",
              fontSize: "2xl",
              fontStyle: "normal",
              fontWeight: "bold",
              lineHeight: "tight",
            })}
          >
            Dale UI
          </div>
        </Link>
        <span
          className={css({
            display: { base: "inline-flex", md: "none" },
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

      <ul
        className={stack({
          gap: { base: "24", md: "45" },
          display: { base: isOpenMenu ? "flex" : "none", md: "flex" },
          direction: { base: "column", md: "row" },
          alignItems: { base: "flex-start", md: "center" },
          width: { base: "100%", md: "auto" },
          paddingLeft: { base: "24", md: "0" },
          paddingRight: { base: "24", md: "0" },
          paddingTop: { base: "24", md: "0" },
        })}
      >
        <li>
          <Link
            href="https://github.com/DaleStudy/daleui"
            external={true}
            underline={false}
            tone="neutral"
            size="lg"
          >
            깃허브
          </Link>
        </li>
        <li>
          <Link
            href="https://main--675790d317ba346348aa3490.chromatic.com/"
            external={true}
            underline={false}
            tone="neutral"
            size="lg"
          >
            스토리북
          </Link>
        </li>
        <li>
          <Link href="/" underline={false} tone="neutral" size="lg">
            피그마 디자인
          </Link>
        </li>
      </ul>

      <ul
        className={stack({
          gap: "22",
          display: { base: isOpenMenu ? "flex" : "none", md: "flex" },
          direction: { base: "column", md: "row" },
          alignItems: { base: "flex-start", md: "center" },
          width: { base: "100%", md: "auto" },
          padding: { base: "24", md: "0" },
        })}
      >
        <li>
          <Icon
            name="sun"
            size="lg"
            tone="brand"
            onClick={() => {
              const el = document.documentElement;
              const next =
                el.getAttribute("data-theme") === "dark" ? "light" : "dark";
              el.setAttribute("data-theme", next);
              el.classList.toggle("dark", next === "dark");
            }}
          />
        </li>
        <li
          className={css({
            width: { base: "100%", md: "auto" },
            "& > button": { width: { base: "100%", md: "auto" } },
          })}
        >
          <Button variant="solid">후원하기</Button>
        </li>
      </ul>
    </nav>
  );
}
