import { Icon } from "../../components/Icon/Icon";
import { hstack } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import { Link } from "../../components/Link/Link";

export function Header() {
  const NAV_ITEMS = ["소개", "서비스", "스토리", "채용"];

  return (
    <header className={headerStyle}>
      <div className={menuIconStyle}>
        <Icon name="menu" aria-label="메뉴" />
      </div>
      <img src="/logo.svg" alt="DaleUI Logo" className={logoStyle} />
      <nav className={navStyle} aria-label="주요 메뉴">
        {NAV_ITEMS.map((item) => (
          <Link key={item} underline={false}>
            {item}
          </Link>
        ))}
      </nav>
      <Icon name="search" aria-label="검색" />
    </header>
  );
}
const headerStyle = hstack({
  width: "100%",
  height: { base: "3rem", md: "4rem" },
  justifyContent: "space-between",
  padding: { base: "0 1rem", md: "0 1.5rem" },
  background: "teal.1",
  borderBottom: "2px solid",
  borderColor: "teal.2",
});

const menuIconStyle = css({ display: { base: "block", md: "none" } });

const logoStyle = css({
  height: { base: "1.5rem", md: "2rem" },
  objectFit: "contain",
});

const navStyle = hstack({
  gap: "gap.md",
  display: { base: "none", md: "flex" },
});
