import { Flex } from "../Flex/Flex";
import type { FlexProps } from "../Flex/Flex";

type Align = "top" | "bottom" | "center" | "between" | "around";

export interface VStackProps
  extends Omit<FlexProps, "direction" | "align" | "justify"> {
  /** 세로 배치 방식 */
  reversed?: boolean;
  /** 주축 정렬 방식(세로 정렬) */
  align?: Align;
}

/**
 * - 수직 정렬을 위한 추상화 컴포넌트로, 정렬 방식 변경이 필요하면 Flex 컴포넌트를 권장합니다.
 * - `children` 속성을 통해서 자식 요소들을 전달할 수 있습니다.
 * - `as` 속성을 통해서 렌더링할 HTML 요소를 지정할 수 있습니다. 기본값은 `div`입니다.
 * - `role` 속성을 통해서 역할을 지정할 수 있습니다.
 * - `align` 속성을 통해서 세로 정렬 방식을 지정할 수 있습니다. `top`, `bottom`, `center`, `between`, `around` 중 선택 가능하며 기본값은 `top`입니다.
 * - `reversed` 속성을 통해서 세로 배치 방식을 지정할 수 있습니다. 기본값은 `false`입니다.
 * - `gap` 속성을 통해서 요소 간 간격을 지정할 수 있습니다.
 *
 * ### 접근성(Accessibility) 안내
 * - 이미 시맨틱 태그를 쓰면(as=`nav` | `main` | `aside` | `footer` 등) 중복 role 지정은 피하시길 바랍니다.
 * - 접근성을 위해 기본적으로 적절한 HTML 시맨틱 요소를 사용하고 필요시 ARIA 속성을 활용하여 접근성을 향상시킵니다.
 */
export const VStack = ({
  children,
  as = "div",
  align = "top",
  reversed = false,
  gap,
  className,
  ...rest
}: VStackProps) => {
  const direction = reversed ? "columnReverse" : "column";
  const alignVariants: Record<Align, FlexProps["justify"]> = {
    top: "start",
    center: "center",
    bottom: "end",
    between: "between",
    around: "around",
  };
  const alignContent = alignVariants[align];

  return (
    <Flex
      as={as}
      direction={direction}
      justify={alignContent}
      align="center"
      gap={gap}
      className={className}
      {...rest}
    >
      {children}
    </Flex>
  );
};
