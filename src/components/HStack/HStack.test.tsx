import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { type Spacing, spacing } from "../../tokens/spacing";
import { HStack, type HStackProps } from "./HStack";

describe("HStack 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <HStack>
        <span>아이템 1</span>
        <span>아이템 2</span>
      </HStack>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });
});

describe("클래스 토큰 및 스타일", () => {
  test("기본값으로 row 방향, center 정렬(alignItems) 클래스가 적용된다", () => {
    render(
      <HStack data-testid="root">
        <span>child</span>
      </HStack>,
    );
    const root = screen.getByTestId("root");
    expect(root.className).toMatch(/d_flex/);
    expect(root.className).toMatch(/flex-d_row/);
    expect(root.className).toMatch(/ai_center/);
  });

  test.each([
    [true, "flex-d_row-reverse"],
    [false, "flex-d_row"],
  ])("reversed=%s이면 %s 클래스가 적용된다", (reversed, direction) => {
    render(
      <HStack data-testid="rev" reversed={reversed}>
        <span>child</span>
      </HStack>,
    );

    expect(screen.getByTestId("rev").className).toMatch(
      new RegExp(direction, "i"),
    );
  });

  type Align = HStackProps["align"];
  const aligns: [Align, string][] = [
    ["left", "jc_flex-start"],
    ["center", "jc_center"],
    ["right", "jc_flex-end"],
    ["between", "jc_space-between"],
    ["around", "jc_space-around"],
  ];
  test.each(aligns)(
    "align=%s이면 jc_%s 클래스가 적용된다",
    (align, className) => {
      render(
        <HStack data-testid="align" align={align}>
          <span>child</span>
        </HStack>,
      );
      expect(screen.getByTestId("align").className).toMatch(
        new RegExp(className.replace("-", "[-_]"), "i"),
      );
    },
  );

  const gaps = Object.keys(spacing || {}) as Spacing[];
  test.each(gaps.map((gap) => [gap, `gap_${gap}`]))(
    "gap=%s이면 %s 클래스가 적용된다",
    (gap, className) => {
      render(
        <HStack data-testid="gap" gap={gap}>
          <span>child</span>
        </HStack>,
      );
      expect(screen.getByTestId("gap").className).toMatch(className);
    },
  );
});

describe("HStack 접근성", () => {
  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(
      <HStack role="navigation">
        <span>Nav</span>
      </HStack>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("as=nav이면 navigation role을 갖는다", () => {
    render(
      <HStack as="nav">
        <span>Nav</span>
      </HStack>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
