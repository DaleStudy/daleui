import { Flex } from "../Flex/Flex";
import type { FlexProps } from "../Flex/Flex";

const justifyVariants = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
} as const;
const alignVariants = {
  top: "start",
  center: "center",
  bottom: "end",
  stretch: "stretch",
} as const;

type Justify = keyof typeof justifyVariants;
type Align = keyof typeof alignVariants;
export interface HStackProps extends Omit<
  FlexProps,
  "direction" | "align" | "justify"
> {
  /** 가로 배치 방식 */
  reversed?: boolean;
  /** 가로 정렬 방식 */
  justify?: Justify;
  /** 세로 정렬 방식 */
  align?: Align;
}

/**
 * Flex의 자주 쓰는 가로 배치 패턴(`flex-direction="row"`, `justify-content="start"`, `align-items="center"`)을 의미 있는 이름과 기본값으로 묶은 컴포넌트입니다.
 *
 * 한 컨테이너에서 `direction`을 바꿔 쓸 때, 교차축 정렬이 가운데가 아닐 때, **[Flex](?path=/docs/components-flex--docs) 컴포넌트**를 권장합니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const HStack = ({
  children,
  as = "div",
  justify = "left",
  align = "center",
  reversed = false,
  gap,
  className,
  ...rest
}: HStackProps) => {
  const direction = reversed ? "rowReverse" : "row";
  const justifyContent = justifyVariants[justify];
  const alignContent = alignVariants[align];
  return (
    <Flex
      as={as}
      direction={direction}
      justify={justifyContent}
      align={alignContent}
      gap={gap}
      className={className}
      {...rest}
    >
      {children}
    </Flex>
  );
};
