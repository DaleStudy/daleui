import type { Tone } from "../../tokens/colors";
import type { IconName } from "../../tokens/iconography";
import { Icon } from "../Icon/Icon";
import { Link } from "../Link/Link";
import { cva, cx } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { Text } from "../Text/Text";
import type { HTMLAttributes } from "react";

interface BaseDisplayCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 아이콘 */
  icon: IconName;
  /** 색조 */
  tone?: Extract<Tone, "neutral" | "brand">;
  /** border 여부 */
  outline?: boolean;
}

type DisplayCardPropsWithLink = BaseDisplayCardProps & {
  link: string;
  linkText: string;
  isExternalLink?: boolean;
};

type DisplayCardPropsWithoutLink = BaseDisplayCardProps & {
  link?: undefined;
  linkText?: undefined;
  isExternalLink?: undefined;
};

type DisplayCardProps = DisplayCardPropsWithLink | DisplayCardPropsWithoutLink;

export function DisplayCard({
  title,
  description,
  icon,
  tone = "neutral",
  link,
  linkText,
  isExternalLink,
  outline = false,
  className,
  ...rest
}: DisplayCardProps) {
  return (
    <article className={cx(styles({ tone, outline }), className)} {...rest}>
      <div
        className={stack({
          display: "inline-flex",
          p: "12",
          borderRadius: "md",
          bg: "bg.brand",
        })}
      >
        <Icon name={icon} size="lg" tone={tone} aria-label={icon} />
      </div>
      <div className={stack({ gap: "4" })}>
        <Text size="lg" weight="semibold" as="p">
          {title}
        </Text>
        <Text size="md" as="p">
          {description}
        </Text>
      </div>
      {link && (
        <Link
          href={link}
          size="lg"
          tone={tone}
          underline={false}
          external={isExternalLink}
        >
          {linkText}
          <Icon name="externalLink" tone={tone} size="sm" />
        </Link>
      )}
    </article>
  );
}

const styles = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "24",
    p: "24",
    px: "16",
    borderRadius: "md",
    bg: "bg.neutral",
  },
  variants: {
    outline: {
      true: {
        borderWidth: "sm",
      },
      false: {
        borderWidth: "0",
      },
    },
    tone: {
      neutral: {
        borderColor: "border.neutral",
      },
      brand: {
        borderColor: "border.brand",
      },
    },
  },
});
