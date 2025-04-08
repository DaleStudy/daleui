import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import type { Tone } from "../../tokens/colors";
import type { FontSize, FontWeight } from "../../tokens/typography";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** 색조 */
  tone?: Tone;
  /** 크기 */
  size?: FontSize;
  /** 굵기 */
  weight?: FontWeight;
  /** 명암비 낮출지 */
  muted?: boolean;
  /** 링크에 밑줄 표시 여부 */
  underline?: boolean;
}

export function Link({ children }: PropsWithChildren<LinkProps>) {
  return <>{children}</>;
}
