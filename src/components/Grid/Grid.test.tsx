import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Grid, GridItem, type GridProps } from "./Grid";
import { type Spacing, spacing } from "../../tokens/spacing";
describe("Grid 렌더링", () => {
  test("자식 요소들을 렌더링한다", () => {
    render(
      <Grid>
        <GridItem>그리드 아이템1</GridItem>
      </Grid>,
    );
    expect(screen.getByText("아이템 1")).toBeInTheDocument();
    expect(screen.getByText("아이템 2")).toBeInTheDocument();
  });
});
