import { flex, hstack } from "../../styled-system/patterns";
import { Link } from "../components/Link/Link";
import { css } from "../../styled-system/css";

const FOOTER_ITEMS = [
  { label: "Github", href: "https://github.com/DaleStudy/daleui" },
  {
    label: "Storybook",
    href: "https://main--675790d317ba346348aa3490.chromatic.com/",
  },
  { label: "Sponsor", href: "https://github.com/sponsors/DaleStudy" },
  { label: "Discord", href: "https://dales.link/discord" },
];

export function Footer() {
  return (
    <footer
      className={flex({
        bg: "bg.neutral",
        py: { base: "40", sm: "60px", lg: "72px" },
        justifyContent: "center",
      })}
    >
      <div
        className={flex({
          gap: "24",
          flexDirection: { base: "column" },
          paddingX: "24",
          width: "100%",
          maxWidth: "1280px",
        })}
      >
        {/* TODO: spacing 토큰 부족으로 px 사용 */}
        <div className={hstack({ gap: "10px" })}>
          <img
            src="/logo.svg"
            alt="DaleUI Logo"
            className={css({
              width: "30px",
              height: "24px",
              objectFit: "contain",
            })}
          />
          <span
            className={css({
              textStyle: "heading.2",
              letterSpacing: "0",
              color: "fg.brand",
            })}
          >
            Dale UI
          </span>
        </div>
        <div
          className={flex({
            gap: { base: "16", sm: "48" },
            flexDirection: { base: "column", sm: "row" },
            alignItems: { base: "flex-start", sm: "center" },
            textStyle: "label.sm",
          })}
        >
          {FOOTER_ITEMS.map((item) => (
            <Link
              href={item.href}
              tone="neutral"
              size="sm"
              underline={false}
              external
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className={css({ textStyle: "label.sm", color: "fg.neutral" })}>
          © 2025 Dale UI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
