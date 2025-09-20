import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { Icon } from "../components/Icon/Icon";
import { Link } from "../components/Link/Link";
import { Button } from "../components/Button/Button";
import { useState } from "react";

const LINK_ITEMS = [
  { id: 1, label: "깃허브", href: "https://github.com/DaleStudy/daleui" },
  {
    id: 2,
    label: "스토리북",
    href: "https://main--675790d317ba346348aa3490.chromatic.com/",
  },
  { id: 3, label: "피그마 디자인", href: "/" }, //@TODO:  피그마 커뮤니티가 생긴 후 해당 링크로 연결예정
];

export function Navigation() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const el = document.documentElement;
    return el.classList.contains("dark");
  });

  const handleToggleTheme = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDark(el.classList.contains("dark"));
  };

  const handleToggleMenu = () => {
    setIsOpenMenu((v) => !v);
  };

  const handleSponsorClick = () => {
    window.open("https://github.com/sponsors/DaleStudy", "_blank");
  };

  return (
    <header
      className={css({
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <nav
        className={stack({
          direction: { base: "column", md: "row" },
          maxWidth: "1024px",
          width: {
            base: "100%",
          },
          px: { base: "16", md: "24" },
          py: "5px",
          pb: { lg: "6px" },
          justifyContent: "space-between",
          alignItems: { base: "flex-start", md: "center" },
          position: "relative",
          gap: { base: "0" },
        })}
      >
        {/* 로고 & 햄버거바 */}
        <div
          className={css({
            width: { base: "100%", md: "auto" },
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          })}
        >
          {/* Nav Logo */}
          <div
            className={css({
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              width: "150px",
              padding: "10px",
              gap: "10px",
              flexDirection: "column",
            })}
          >
            {/* Logo */}
            <div
              className={css({
                display: "flex",
                alignItems: "center",
                gap: "10px",
                px: "3px",
                py: "6px",
              })}
            >
              <img
                src="/newLogo.svg"
                alt="DaleUI Logo"
                className={css({
                  height: "24px",
                  width: "30px",
                  objectFit: "contain",
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
            </div>
          </div>

          {/* 햄버거바 */}
          <div
            className={css({
              display: { base: "inline-flex", md: "none" },
              top: "24",
              right: "24",
              padding: "10px",
            })}
          >
            <Icon
              tone="brand"
              name={isOpenMenu ? "x" : "menu"}
              size="lg"
              onClick={handleToggleMenu}
            />
          </div>
        </div>

        {/* 링크 */}
        <ul
          className={stack({
            gap: { base: "24", md: "45" },
            display: "flex",
            direction: { base: "column", md: "row" },
            alignItems: { base: "flex-start", md: "center" },
            width: { base: "100%", md: "auto" },
            paddingLeft: { base: "24", md: "0" },
            paddingRight: { base: "24", md: "0" },
            paddingTop: { base: "24", md: "0" },
            opacity: { base: isOpenMenu ? 1 : 0, md: 1 },
            transform: {
              base: isOpenMenu ? "translateY(0)" : "translateY(-8px)",
              md: "none",
            },
            pointerEvents: { base: isOpenMenu ? "auto" : "none", md: "auto" },
            transition: "opacity 200ms ease, transform 200ms ease",
          })}
        >
          {LINK_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                external
                underline={false}
                tone="neutral"
                size="lg"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 토글 & 후원하기 */}
        <ul
          className={stack({
            gap: "22",
            display: "flex",
            direction: { base: "column", md: "row" },
            alignItems: { base: "flex-start", md: "center" },
            width: { base: "100%", md: "auto" },
            padding: { base: "24", md: "0" },
            opacity: { base: isOpenMenu ? 1 : 0, md: 1 },
            transform: {
              base: isOpenMenu ? "translateY(0)" : "translateY(-8px)",
              md: "none",
            },
            pointerEvents: { base: isOpenMenu ? "auto" : "none", md: "auto" },
            transition: "opacity 200ms ease, transform 200ms ease",
          })}
        >
          <li
            className={css({
              cursor: "pointer",
            })}
          >
            <Icon
              name={isDark ? "moon" : "sun"}
              size="lg"
              tone="brand"
              onClick={handleToggleTheme}
            />
          </li>
          <li
            className={css({
              width: { base: "100%", md: "auto" },
              "& > button": { width: { base: "100%", md: "auto" } },
            })}
          >
            <Button variant="solid" onClick={handleSponsorClick}>
              후원하기
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
