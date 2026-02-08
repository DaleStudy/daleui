import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Grid, GridItem, type GridProps } from "./Grid";
import { type Spacing, spacing } from "../../tokens/spacing";

describe("Grid 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <Grid>
        <GridItem>아이템 1</GridItem>
        <GridItem>아이템 2</GridItem>
      </Grid>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });

  test("as prop으로 다른 HTML 요소를 렌더링한다", () => {
    render(
      <Grid as="section" data-testid="grid-section">
        <GridItem>child</GridItem>
      </Grid>,
    );
    const element = screen.getByTestId("grid-section");
    expect(element.tagName).toBe("SECTION");
  });
});

describe("Grid 클래스 토큰 및 스타일", () => {
  test("기본값으로 display: grid 클래스가 적용된다", () => {
    render(
      <Grid data-testid="grid-default">
        <GridItem>child</GridItem>
      </Grid>,
    );
    expect(screen.getByTestId("grid-default")).toHaveClass("d_grid");
  });

  test("gridTemplateColumns 적용 시 CSS 변수가 적용된다", () => {
    render(
      <Grid data-testid="grid-cols" gridTemplateColumns="repeat(3, 1fr)">
        <GridItem>child</GridItem>
      </Grid>,
    );
    const root = screen.getByTestId("grid-cols");
    expect(root.style.getPropertyValue("--grid-template-columns")).toBe(
      "repeat(3, 1fr)",
    );
  });

  test("gridTemplateRows 적용 시 CSS 변수가 적용된다", () => {
    render(
      <Grid data-testid="grid-rows" gridTemplateRows="100px auto 1fr">
        <GridItem>child</GridItem>
      </Grid>,
    );
    const root = screen.getByTestId("grid-rows");
    expect(root.style.getPropertyValue("--grid-template-rows")).toBe(
      "100px auto 1fr",
    );
  });

  const gaps = Object.keys(spacing || {}) as Spacing[];
  test.each(gaps)(`gap=%s 적용 시 알맞은 클래스가 적용된다`, (gap) => {
    render(
      <Grid data-testid={`grid-gap-${gap}`} gap={gap}>
        <GridItem>child</GridItem>
      </Grid>,
    );
    expect(screen.getByTestId(`grid-gap-${gap}`)).toHaveClass(`gap_${gap}`);
  });

  test("areas가 문자열로 전달되면 CSS 변수가 적용된다", () => {
    render(
      <Grid
        data-testid="grid-areas-string"
        areas={'"header header" "sidebar main"'}
      >
        <GridItem>child</GridItem>
      </Grid>,
    );
    const root = screen.getByTestId("grid-areas-string");
    expect(root.style.getPropertyValue("--grid-template-areas")).toBe(
      '"header header" "sidebar main"',
    );
  });

  test("areas가 2차원 배열로 전달되면 변환되어 CSS 변수가 적용된다", () => {
    render(
      <Grid
        data-testid="grid-areas-array"
        areas={[
          ["header", "header"],
          ["sidebar", "main"],
        ]}
      >
        <GridItem>child</GridItem>
      </Grid>,
    );
    const root = screen.getByTestId("grid-areas-array");
    expect(root.style.getPropertyValue("--grid-template-areas")).toBe(
      '"header header" "sidebar main"',
    );
  });

  test("areas가 undefined이면 CSS 변수가 적용되지 않는다", () => {
    render(
      <Grid data-testid="grid-no-areas">
        <GridItem>child</GridItem>
      </Grid>,
    );
    const root = screen.getByTestId("grid-no-areas");
    expect(root.style.getPropertyValue("--grid-template-areas")).toBe("");
  });

  type AutoFlow = GridProps["autoFlow"];
  const autoFlows: [AutoFlow, string][] = [
    ["row", "grid-af_row"],
    ["column", "grid-af_column"],
    ["rowDense", "grid-af_row_dense"],
    ["columnDense", "grid-af_column_dense"],
  ];
  test.each(autoFlows)(
    "autoFlow=%s이면 %s 클래스가 적용된다",
    (autoFlow, expectedClass) => {
      render(
        <Grid data-testid={`grid-autoflow-${autoFlow}`} autoFlow={autoFlow}>
          <GridItem>child</GridItem>
        </Grid>,
      );
      expect(screen.getByTestId(`grid-autoflow-${autoFlow}`)).toHaveClass(
        expectedClass,
      );
    },
  );

  type JustifyItems = GridProps["justifyItems"];
  const justifyItemsValues: [JustifyItems, string][] = [
    ["start", "justify-items_start"],
    ["center", "justify-items_center"],
    ["end", "justify-items_end"],
    ["stretch", "justify-items_stretch"],
  ];
  test.each(justifyItemsValues)(
    "justifyItems=%s이면 %s 클래스가 적용된다",
    (justifyItems, expectedClass) => {
      render(
        <Grid
          data-testid={`grid-justify-items-${justifyItems}`}
          justifyItems={justifyItems}
        >
          <GridItem>child</GridItem>
        </Grid>,
      );
      expect(
        screen.getByTestId(`grid-justify-items-${justifyItems}`),
      ).toHaveClass(expectedClass);
    },
  );

  type AlignItems = GridProps["alignItems"];
  const alignItemsValues: [AlignItems, string][] = [
    ["start", "ai_start"],
    ["center", "ai_center"],
    ["end", "ai_end"],
    ["stretch", "ai_stretch"],
  ];
  test.each(alignItemsValues)(
    "alignItems=%s이면 %s 클래스가 적용된다",
    (alignItems, expectedClass) => {
      render(
        <Grid
          data-testid={`grid-align-items-${alignItems}`}
          alignItems={alignItems}
        >
          <GridItem>child</GridItem>
        </Grid>,
      );
      expect(screen.getByTestId(`grid-align-items-${alignItems}`)).toHaveClass(
        expectedClass,
      );
    },
  );

  type JustifyContent = GridProps["justifyContent"];
  const justifyContentValues: [JustifyContent, string][] = [
    ["start", "jc_start"],
    ["center", "jc_center"],
    ["end", "jc_end"],
    ["between", "jc_space-between"],
    ["around", "jc_space-around"],
    ["stretch", "jc_stretch"],
  ];
  test.each(justifyContentValues)(
    "justifyContent=%s이면 %s 클래스가 적용된다",
    (justifyContent, expectedClass) => {
      render(
        <Grid
          data-testid={`grid-justify-content-${justifyContent}`}
          justifyContent={justifyContent}
        >
          <GridItem>child</GridItem>
        </Grid>,
      );
      expect(
        screen.getByTestId(`grid-justify-content-${justifyContent}`),
      ).toHaveClass(expectedClass);
    },
  );

  type AlignContent = GridProps["alignContent"];
  const alignContentValues: [AlignContent, string][] = [
    ["start", "ac_start"],
    ["center", "ac_center"],
    ["end", "ac_end"],
    ["between", "ac_space-between"],
    ["around", "ac_space-around"],
    ["stretch", "ac_stretch"],
  ];
  test.each(alignContentValues)(
    "alignContent=%s이면 %s 클래스가 적용된다",
    (alignContent, expectedClass) => {
      render(
        <Grid
          data-testid={`grid-align-content-${alignContent}`}
          alignContent={alignContent}
        >
          <GridItem>child</GridItem>
        </Grid>,
      );
      expect(
        screen.getByTestId(`grid-align-content-${alignContent}`),
      ).toHaveClass(expectedClass);
    },
  );
});

describe("Grid 접근성", () => {
  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(
      <Grid role="navigation">
        <GridItem>Nav</GridItem>
      </Grid>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("as=nav이면 navigation role을 갖는다", () => {
    render(
      <Grid as="nav">
        <GridItem>Nav</GridItem>
      </Grid>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});

describe("GridItem 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <Grid>
        <GridItem>아이템 1</GridItem>
        <GridItem>아이템 2</GridItem>
      </Grid>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });

  test("as prop으로 다른 HTML 요소를 렌더링한다", () => {
    render(
      <Grid>
        <GridItem as="section" data-testid="grid-item-section">
          child
        </GridItem>
      </Grid>,
    );
    const element = screen.getByTestId("grid-item-section");
    expect(element.tagName).toBe("SECTION");
  });
});

describe("GridItem 스타일", () => {
  test("gridColumn이 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-col" gridColumn="span 2">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-col");
    expect(item.style.getPropertyValue("--grid-column")).toBe("span 2");
  });

  test("gridRow가 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-row" gridRow="span 2">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-row");
    expect(item.style.getPropertyValue("--grid-row")).toBe("span 2");
  });

  test("gridColumnStart가 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-col-start" gridColumnStart="1">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-col-start");
    expect(item.style.getPropertyValue("--grid-column-start")).toBe("1");
  });

  test("gridColumnEnd가 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-col-end" gridColumnEnd="3">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-col-end");
    expect(item.style.getPropertyValue("--grid-column-end")).toBe("3");
  });

  test("gridRowStart가 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-row-start" gridRowStart="1">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-row-start");
    expect(item.style.getPropertyValue("--grid-row-start")).toBe("1");
  });

  test("gridRowEnd가 적용된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-row-end" gridRowEnd="3">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-row-end");
    expect(item.style.getPropertyValue("--grid-row-end")).toBe("3");
  });

  test("gridArea가 적용된다", () => {
    render(
      <Grid areas={'"header" "main"'}>
        <GridItem data-testid="item-area" gridArea="header">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-area");
    expect(item.style.getPropertyValue("--grid-area")).toBe("header");
  });

  test("className prop이 병합된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-class" className="custom-item-class">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-class");
    expect(item.className).toContain("custom-item-class");
  });

  test("HTMLAttributes가 전달된다", () => {
    render(
      <Grid>
        <GridItem data-testid="item-attrs" id="my-item" aria-label="My Item">
          child
        </GridItem>
      </Grid>,
    );
    const item = screen.getByTestId("item-attrs");
    expect(item.id).toBe("my-item");
    expect(item.getAttribute("aria-label")).toBe("My Item");
  });
});

describe("GridItem 접근성", () => {
  test("role 속성을 전달하면 해당 역할로 노출된다", () => {
    render(
      <Grid>
        <GridItem role="listitem">Item</GridItem>
      </Grid>,
    );
    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  test("as=nav이면 navigation role을 갖는다", () => {
    render(
      <Grid>
        <GridItem as="nav">Nav</GridItem>
      </Grid>,
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
