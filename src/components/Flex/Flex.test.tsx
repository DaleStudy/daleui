import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Flex, type FlexProps } from "./Flex";
import { spacing, type Spacing } from "../../tokens/spacing";

describe("Flex 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <Flex>
        <span>아이템 1</span>
        <span>아이템 2</span>
      </Flex>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });
});

describe("클래스 토큰 및 스타일", () => {
  test("기본값으로 row 방향, center 정렬, center 교차축 클래스가 적용된다", () => {
    render(
      <Flex as="nav" aria-label="flex-root">
        <span>child</span>
      </Flex>,
    );
    const root = screen.getByRole("navigation", { name: "flex-root" });
    expect(root.className).toMatch(/d_flex/);
    expect(root.className).toMatch(/flex-d_row/);
    expect(root.className).toMatch(/jc_center/);
    expect(root.className).toMatch(/ai_center/);
  });

  type Direction = FlexProps["direction"];
  const directions: [Direction, string][] = [
    ["row", "flex-d_row"],
    ["column", "flex-d_column"],
    ["rowReverse", "flex-d_row-reverse"],
    ["columnReverse", "flex-d_column-reverse"],
  ];
  test.each(directions)(
    "direction=%s이면 %s 클래스가 적용된다",
    (direction, className) => {
      render(
        <Flex
          as="nav"
          aria-label={`flex-direction-${direction}`}
          direction={direction}
        >
          <span>child</span>
        </Flex>,
      );
      expect(
        screen.getByRole("navigation", { name: `flex-direction-${direction}` })
          .className,
      ).toMatch(new RegExp(className.replace("-", "[-_]"), "i"));
    },
  );

  type Justify = FlexProps["justify"];
  const justifies: [Justify, string][] = [
    ["start", "jc_flex-start"],
    ["center", "jc_center"],
    ["end", "jc_flex-end"],
    ["between", "jc_space-between"],
  ];
  test.each(justifies)(
    "justify=%s이면 %s 클래스가 적용된다",
    (justify, className) => {
      render(
        <Flex as="nav" aria-label={`flex-justify-${justify}`} justify={justify}>
          <span>child</span>
        </Flex>,
      );
      expect(
        screen.getByRole("navigation", { name: `flex-justify-${justify}` })
          .className,
      ).toMatch(new RegExp(className.replace("-", "[-_]"), "i"));
    },
  );

  type Align = FlexProps["align"];
  const aligns: [Align, string][] = [
    ["start", "ai_flex-start"],
    ["center", "ai_center"],
    ["end", "ai_flex-end"],
    ["stretch", "ai_stretch"],
  ];
  test.each(aligns)("align=%s이면 %s 클래스가 적용된다", (align, className) => {
    render(
      <Flex as="nav" aria-label={`flex-align-${align}`} align={align}>
        <span>child</span>
      </Flex>,
    );
    expect(
      screen.getByRole("navigation", { name: `flex-align-${align}` }).className,
    ).toMatch(new RegExp(className.replace("-", "[-_]"), "i"));
  });

  const gaps = Object.keys(spacing || {}) as Spacing[];
  test.each(gaps)("gap=%s이면 gap_%s 클래스가 적용된다", (gap) => {
    render(
      <Flex as="nav" aria-label={`flex-gap-${gap}`} gap={gap}>
        <span>child</span>
      </Flex>,
    );

    expect(
      screen.getByRole("navigation", { name: `flex-gap-${gap}` }).className,
    ).toMatch(`gap_${gap}`);
  });
});

describe("Flex 접근성", () => {
  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(
      <Flex role="navigation">
        <span>Nav</span>
      </Flex>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("as=nav이면 navigation role을 갖는다", () => {
    render(
      <Flex as="nav">
        <span>Nav</span>
      </Flex>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
