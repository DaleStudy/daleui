import type { Tone } from "../../tokens/colors";
import type { IconName } from "../../tokens/iconography";
import { Icon } from "../Icon/Icon";
import { Link } from "../Link/Link";
import { cva, cx } from "../../../styled-system/css";
import { Text } from "../Text/Text";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  SVGProps,
} from "react";
import { createContext, useContext } from "react";

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
interface CardRootProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  /** 색조 */
  tone?: Extract<Tone, "neutral" | "brand">;
  /** border 여부 */
  outline?: boolean;
  children: ReactNode;
}

function CardRoot({
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
interface CardBodyProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  children: ReactNode;
}

function CardBody({ className, children, ...rest }: CardBodyProps) {
  return (
    <div className={cx(bodyStyles(), className)} {...rest}>
      {children}
    </div>
  );
}
interface CardIconProps extends SVGProps<SVGSVGElement> {
  /** 아이콘 이름 */
  name: IconName;
  /** 아이콘 크기 */
  size?: "sm" | "md" | "lg";
}

function CardIcon({ name, size = "lg", ...rest }: CardIconProps) {
  const { tone } = useCardContext();
  return (
    <div className={cx(iconContainerStyles())}>
      <Icon name={name} size={size} tone={tone} aria-label={name} {...rest} />
    </div>
  );
}
interface CardTitleProps extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  children: ReactNode;
}

function CardTitle({ children, ...rest }: CardTitleProps) {
  return (
    <Text size="lg" weight="semibold" as="p" {...rest}>
      {children}
    </Text>
  );
}
interface CardDescriptionProps
  extends Omit<HTMLAttributes<HTMLElement>, "style"> {
  children: ReactNode;
}

function CardDescription({ children, ...rest }: CardDescriptionProps) {
  return (
    <Text size="md" as="p" {...rest}>
      {children}
    </Text>
  );
}
interface CardLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** 링크 URL */
  href: string;
  /** 외부 링크 여부 (true일 경우 새 탭에서 열리며 아이콘 추가) */
  external?: boolean;
}

function CardLink({ children, href, external, ...rest }: CardLinkProps) {
  const { tone } = useCardContext();
  return (
    <Link
      href={href}
      size="lg"
      tone={tone}
      underline={false}
      external={external}
      {...rest}
    >
      {children}
      {external && <Icon name="externalLink" tone={tone} size="sm" />}
    </Link>
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

/**
 * Card의 최상위 컨테이너입니다. tone과 outline 속성을 설정하며,
 * tone은 하위의 Icon과 Link 컴포넌트에 자동으로 전달됩니다.
 */
export const Card = Object.assign(CardRoot, {
  /**
   * Card의 제목과 설명을 감싸는 컨테이너입니다.
   * 제목과 설명 사이의 간격을 관리합니다.
   */
  Body: CardBody,
  /**
   * Card의 아이콘을 표시합니다. Card 바로 아래에 배치하며,
   * tone은 Card로부터 자동으로 전달받습니다.
   */
  Icon: CardIcon,
  /**
   * Card의 제목을 표시합니다. CardBody 안에서 사용합니다.
   */
  Title: CardTitle,
  /**
   * Card의 설명을 표시합니다. CardBody 안에서 CardTitle 아래에 사용합니다.
   */
  Description: CardDescription,
  /**
   * Card 하단에 링크를 표시합니다. tone은 Card로부터 자동으로 전달받으며,
   * external prop이 true일 경우 외부 링크 아이콘이 자동으로 추가됩니다.
   */
  Link: CardLink,
});
