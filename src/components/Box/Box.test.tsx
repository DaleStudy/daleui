import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Box } from "./Box";
import { css } from "../../../styled-system/css";
import { type Spacing, spacing } from "../../tokens/spacing";

describe("Box 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <Box as="nav">
        <span>아이템 1</span>
        <span>아이템 2</span>
      </Box>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });

  test("자식 요소 없이도 렌더링 가능하다", () => {
    render(<Box as="main" />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});

describe("Box 스타일", () => {
  const spacingValues = Object.keys(spacing || {}) as Spacing[];

  test.each(spacingValues)(
    "padding=%s이면 p_%s 클래스가 적용된다",
    (padding) => {
      render(
        <Box as="nav" padding={padding}>
          child
        </Box>,
      );
      expect(screen.getByRole("navigation").className).toMatch(`p_${padding}`);
    },
  );

  test.each(spacingValues)("margin=%s이면 m_%s 클래스가 적용된다", (margin) => {
    render(
      <Box as="nav" margin={margin}>
        child
      </Box>,
    );
    expect(screen.getByRole("navigation").className).toMatch(`m_${margin}`);
  });

  test("width, height prop으로 크기를 지정할 수 있다 (px 단위로 변환)", () => {
    render(
      <Box as="nav" width={100} height={200}>
        child
      </Box>,
    );
    const element = screen.getByRole("navigation");
    expect(element).toHaveStyle({ width: "100px", height: "200px" });
  });

  test("className을 통해 추가 스타일을 적용할 수 있다", () => {
    render(
      <Box as="main" padding="16" className={css({ bg: "bgSolid.brand" })}>
        child
      </Box>,
    );
    const element = screen.getByRole("main");
    expect(element.className).toMatch(/p_16/);
    expect(element.className).toMatch(/bg_bgSolid\.brand/);
  });
});

describe("Box 접근성", () => {
  test.each([
    ["nav", "navigation"],
    ["main", "main"],
    ["header", "banner"],
    ["footer", "contentinfo"],
  ] as const)("as=%s이면 %s role을 갖는다", (as, role) => {
    render(<Box as={as}>content</Box>);
    expect(screen.getByRole(role)).toBeInTheDocument();
  });

  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(<Box role="navigation">Nav</Box>);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});

describe("Box HTML 요소", () => {
  test("기본적으로 div 요소로 렌더링된다", () => {
    render(<Box>content</Box>);
    expect(screen.getByText("content").tagName).toBe("DIV");
  });

  test.each([
    ["nav", "NAV"],
    ["section", "SECTION"],
    ["article", "ARTICLE"],
    ["span", "SPAN"],
  ] as const)("as=%s이면 %s 태그로 렌더링된다", (as, tagName) => {
    render(<Box as={as}>content</Box>);
    expect(screen.getByText("content").tagName).toBe(tagName);
  });

  test("as=span이면 inline-block으로 렌더링되어 width/height가 적용된다", () => {
    render(
      <Box as="span" width={100} height={50}>
        content
      </Box>,
    );
    const element = screen.getByText("content");
    expect(element.className).toMatch(/d_inline-block/);
    expect(element).toHaveStyle({ width: "100px", height: "50px" });
  });
});
