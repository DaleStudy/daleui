import { flex } from "../../styled-system/patterns";
import { Link } from "../components/Link/Link";
import { VStack } from "../components/VStack/VStack";
import { css } from "../../styled-system/css";

const FOOTER_ITEMS = [
  { label: "GitHub", href: "https://github.com/DaleStudy/daleui" },
  {
    label: "Storybook",
    href: "https://main--675790d317ba346348aa3490.chromatic.com/",
  },
  { label: "Sponsor", href: "https://github.com/sponsors/DaleStudy" },
  { label: "Discord", href: "https://dales.link/discord" },
];

const getCopyrightYear = () => {
  const START_YEAR = 2025;
  const currentYear = new Date().getFullYear();

  return currentYear <= START_YEAR
    ? START_YEAR.toString()
    : `${START_YEAR}-${currentYear}`;
};

export function Footer() {
  return (
    <footer
      className={flex({
        bg: "bg.neutral",
        py: { base: "40", sm: "60px", lg: "72px" },
        justifyContent: "center",
      })}
    >
      <VStack
        gap="24"
        align="left"
        className={css({
          paddingX: "24",
          width: "100%",
          maxWidth: "1280px",
        })}
      >
        <img
          src="/newLogoWithText.svg"
          alt="DaleUI Logo"
          className={css({
            width: "123px",
            height: "41px",
            objectFit: "contain",
            _dark: {
              content: 'url("/newLogoWithText_dark.svg")',
            },
          })}
        />
        <nav aria-label="Footer">
          <ul
            className={flex({
              gap: { base: "16", sm: "48" },
              flexDirection: { base: "column", sm: "row" },
              alignItems: { base: "flex-start", sm: "center" },
              textStyle: "label.sm",
            })}
          >
            {FOOTER_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  tone="neutral"
                  size="sm"
                  underline={false}
                  external
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={css({ textStyle: "label.sm", color: "fg.neutral" })}>
          © {getCopyrightYear()} Dale UI. All rights reserved.
        </div>
      </VStack>
    </footer>
  );
}
