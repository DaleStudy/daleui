import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import * as stories from "./VStack.stories";
import { VStack, type VStackProps } from "./VStack";
import { spacing, type Spacing } from "../../tokens/spacing";

const { Default } = composeStories(stories);

type AlignItems = VStackProps["alignItems"];
const alignItems: AlignItems[] = ["start", "center", "end", "stretch"];

describe("VStack 렌더링", () => {
  test("Default 스토리가 자식들을 렌더링한다", () => {
    render(<Default />);
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });
});

describe("클래스 토큰 및 스타일", () => {
  test("기본값으로 column 방향, center 정렬, gap_8 클래스가 적용된다", () => {
    render(
      <VStack data-testid="root">
        <span>child</span>
      </VStack>,
    );
    const root = screen.getByTestId("root");
    expect(root.className).toMatch(/d_flex/);
    expect(root.className).toMatch(/flex-d_column/);
    expect(root.className).toMatch(/ai_center/);
  });

  test.each([
    [true, "flex-d_column-reverse"],
    [false, "flex-d_column"],
  ])(
    "isReversed=%s이면 flex-d_column%s 클래스가 적용된다",
    (isReversed, direction) => {
      render(
        <VStack data-testid="rev" isReversed={isReversed}>
          <span>child</span>
        </VStack>,
      );

      expect(screen.getByTestId("rev").className).toMatch(
        new RegExp(`${direction}`, "i"),
      );
    },
  );

  test.each(alignItems)(
    "alignItems=%s이면 ai_%s 클래스가 적용된다",
    (alignItems) => {
      render(
        <VStack data-testid="align" alignItems={alignItems}>
          <span>child</span>
        </VStack>,
      );
      expect(screen.getByTestId("align").className).toMatch(`ai_${alignItems}`);
    },
  );

  const gaps = Object.keys(spacing || {}) as Spacing[];
  test.each(gaps)("gap=%s이면 gap_%s 클래스가 적용된다", (gap) => {
    render(
      <VStack data-testid="gap" gap={gap}>
        <span>child</span>
      </VStack>,
    );

    expect(screen.getByTestId("gap").className).toMatch(`gap_${gap}`);
  });

  type JustifyContent = VStackProps["justifyContent"];
  const justifyContents: JustifyContent[] = [
    "start",
    "center",
    "flex-end",
    "space-around",
    "space-between",
  ];
  test.each(justifyContents)(
    "justifyContent=%s이면 jc_%s 클래스가 적용된다",
    (justifyContent) => {
      render(
        <VStack data-testid="justify" justifyContent={justifyContent}>
          <span>child</span>
        </VStack>,
      );
      expect(screen.getByTestId("justify").className).toMatch(
        `jc_${justifyContent}`,
      );
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
