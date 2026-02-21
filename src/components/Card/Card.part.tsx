import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  SVGProps,
} from "react";
import { createContext, useContext } from "react";
import type { Tone } from "../../tokens/colors";
import type { IconName } from "../../tokens/iconography";
import { Icon as InnerIcon } from "../Icon/Icon";
import { Link as InnerLink } from "../Link/Link";
import { cva, cx } from "../../../styled-system/css";
import { Text } from "../Text/Text";

interface CardContextValue {
  tone: Extract<Tone, "neutral" | "brand">;
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card 컴포넌트는 Card.Root 내부에서 사용되어야 합니다.");
  }
  return context;
};
export interface CardRootProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style"
> {
  /** 색조 */
  tone?: Extract<Tone, "neutral" | "brand">;
  /** border 여부 */
  outline?: boolean;
  children: ReactNode;
}

export function Root({
  tone = "neutral",
  outline = false,
  className,
  children,
  ...rest
}: CardRootProps) {
  return (
    <CardContext.Provider value={{ tone }}>
      <article
        className={cx(rootStyles({ tone, outline }), className)}
        {...rest}
      >
        {children}
      </article>
    </CardContext.Provider>
  );
}
export interface CardBodyProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "style"
> {
  children: ReactNode;
}

export function Body({ className, children, ...rest }: CardBodyProps) {
  return (
    <div className={cx(bodyStyles(), className)} {...rest}>
      {children}
    </div>
  );
}
export interface CardIconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 이름 */
  name: IconName;
  /** 아이콘 크기 */
  size?: "sm" | "md" | "lg";
}

export function Icon({ name, size = "lg", ...rest }: CardIconProps) {
  const { tone } = useCardContext();
  return (
    <div className={cx(iconContainerStyles())}>
      <InnerIcon
        name={name}
        size={size}
        tone={tone}
        aria-label={name}
        {...rest}
      />
    </div>
  );
}
export interface CardTitleProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style"
> {
  children: ReactNode;
}

export function Title({ children, ...rest }: CardTitleProps) {
  return (
    <Text size="lg" weight="semibold" as="p" {...rest}>
      {children}
    </Text>
  );
}
export interface CardDescriptionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "style"
> {
  children: ReactNode;
}

export function Description({ children, ...rest }: CardDescriptionProps) {
  return (
    <Text size="md" as="p" {...rest}>
      {children}
    </Text>
  );
}
export interface CardLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** 링크 URL */
  href: string;
  /** 외부 링크 여부 (true일 경우 새 탭에서 열리며 아이콘 추가) */
  external?: boolean;
}

export function Link({ children, href, external, ...rest }: CardLinkProps) {
  const { tone } = useCardContext();
  return (
    <InnerLink
      href={href}
      size="lg"
      tone={tone}
      underline={false}
      external={external}
      {...rest}
    >
      {children}
      {external && <InnerIcon name="externalLink" tone={tone} size="sm" />}
    </InnerLink>
  );
}

const rootStyles = cva({
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

const bodyStyles = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    width: "100%",
  },
});

const iconContainerStyles = cva({
  base: {
    display: "inline-flex",
    p: "12",
    borderRadius: "md",
    bg: "bg.brand",
  },
});
