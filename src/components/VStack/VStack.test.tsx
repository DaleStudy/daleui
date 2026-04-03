import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { VStack, type VStackProps } from "./VStack";
import { type Spacing, spacing } from "../../tokens/spacing";

describe("VStack 렌더링", () => {
  test("Default 스토리가 자식들을 렌더링한다", () => {
    render(
      <VStack>
        <div>아이템 1</div>
        <div>아이템 2</div>
      </VStack>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });
});

describe("클래스 토큰 및 스타일", () => {
  test("기본값으로 column 방향, center 정렬 클래스가 적용된다", () => {
    render(
      <VStack data-testid="root">
        <span>child</span>
      </VStack>,
    );
    const root = screen.getByTestId("root");
    expect(root.className).toMatch(/d_flex/);
    expect(root.className).toMatch(/flex-d_column/);
    expect(root.className).toMatch(/ai_center/);
    expect(root.className).toMatch(/jc_flex-start/);
  });

  test.each([
    [true, "flex-d_column-reverse"],
    [false, "flex-d_column"],
  ])(
    "reversed=%s이면 flex-d_column%s 클래스가 적용된다",
    (reversed, direction) => {
      render(
        <VStack data-testid="rev" reversed={reversed}>
          <span>child</span>
        </VStack>,
      );

      expect(screen.getByTestId("rev").className).toMatch(
        new RegExp(`${direction}`, "i"),
      );
    },
  );

  type Align = VStackProps["align"];
  const aligns: [Align, string][] = [
    ["left", "ai_flex-start"],
    ["center", "ai_center"],
    ["right", "ai_flex-end"],
    ["stretch", "ai_stretch"],
  ];
  test.each(aligns)(
    "alignItems=%s이면 ai_%s 클래스가 적용된다",
    (align, className) => {
      render(
        <VStack data-testid="align" align={align}>
          <span>child</span>
        </VStack>,
      );
      expect(screen.getByTestId("align").className).toMatch(className);
    },
  );
  type Justify = VStackProps["justify"];
  const justifies: [Justify, string][] = [
    ["top", "jc_flex-start"],
    ["center", "jc_center"],
    ["bottom", "jc_flex-end"],
    ["between", "jc_space-between"],
    ["around", "jc_space-around"],
  ];
  test.each(justifies)(
    "justify=%s이면 jc_%s 클래스가 적용된다",
    (justify, className) => {
      render(
        <VStack data-testid="justify" justify={justify}>
          <span>child</span>
        </VStack>,
      );
      expect(screen.getByTestId("justify").className).toMatch(className);
    },
  );

  const gaps = Object.keys(spacing || {}) as Spacing[];
  test.each(gaps.map((gap) => [gap, `gap_${gap}`]))(
    "gap=%s이면 %s 클래스가 적용된다",
    (gap, className) => {
      render(
        <VStack data-testid="gap" gap={gap}>
          <span>child</span>
        </VStack>,
      );
      expect(screen.getByTestId("gap").className).toMatch(className);
    },
  );
});

describe("VStack 접근성", () => {
  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(
      <VStack role="navigation">
        <span>Nav</span>
      </VStack>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("as=nav이면 navigation role을 갖는다", () => {
    render(
      <VStack as="nav">
        <span>Nav</span>
      </VStack>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
