import { css } from "../../../../styled-system/css";
import { Icon } from "../../../components/Icon/Icon";
import { Link } from "../../../components/Link/Link";
import type { IconName } from "../../../tokens/iconography";

export interface CardProps {
  /** 아이콘 */
  icon: IconName;
  /** 제목 */
  title: string;
  /** 설명 */
  description: string;
  /** 링크 */
  link: string;
  /** 링크 텍스트 */
  linkText: string;
  /** 링크 비활성화 여부 */
  linkDisabled?: boolean;
}

export const Card = ({
  icon,
  title,
  description,
  link,
  linkText,
  linkDisabled = false,
}: CardProps) => {
  return (
    <div
      className={css({
        width: "100%",
        backgroundColor: "bg.neutral",
        py: "24px",
        px: "16px",
        borderRadius: "md",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "24px",
      })}
    >
      <div
        className={css({
          backgroundColor: "bg.brand",
          p: "12px",
          borderRadius: "lg",
          display: "inline-flex",
        })}
      >
        <Icon name={icon} size="lg" />
      </div>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
        })}
      >
        <p
          className={css({
            textStyle: "body.lg",
            fontWeight: "semibold",
            color: "fg.neutral",
          })}
        >
          {title}
        </p>
        <p
          className={css({
            textStyle: "body.md",
            color: "fg.neutral",
          })}
        >
          {description}
        </p>
      </div>
      {!linkDisabled ? (
        <Link href={link} external tone="brand" size="lg" underline={false}>
          <span className={css({ textStyle: "label.lg", fontWeight: "bold" })}>
            {linkText}
          </span>
          <Icon name="externalLink" size="sm" />
        </Link>
      ) : (
        <span
          className={css({
            textStyle: "label.lg",
            fontWeight: "bold",
            color: "fg.neutral.disabled",
          })}
        >
          {linkText}
        </span>
      )}
    </div>
  );
};
