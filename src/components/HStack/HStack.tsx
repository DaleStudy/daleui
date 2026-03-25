import { Flex } from "../Flex/Flex";
import type { FlexProps } from "../Flex/Flex";

type Justify = "left" | "right" | "center" | "between" | "around";
type Align = "top" | "bottom" | "center" | "stretch";
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
 * - 가로 정렬을 위한 추상화 컴포넌트로, 정렬 방식 변경이 필요하면 Flex or VStack 컴포넌트를 권장합니다.
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
  const justifyVariants: Record<Justify, FlexProps["justify"]> = {
    left: "start",
    center: "center",
    right: "end",
    between: "between",
    around: "around",
  };
  const justifyContent = justifyVariants[justify];
  const alignVariants: Record<Align, FlexProps["align"]> = {
    top: "start",
    center: "center",
    bottom: "end",
    stretch: "stretch",
  };
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
