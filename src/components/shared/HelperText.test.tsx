import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { HelperText } from "./HelperText";

describe("HelperText", () => {
  test("id와 자식 텍스트를 렌더링한다", () => {
    render(<HelperText id="help-1">안내 문구</HelperText>);

    const node = screen.getByText("안내 문구");
    expect(node).toHaveAttribute("id", "help-1");
  });

  test("invalid이면 위험 색조 클래스를 적용한다", () => {
    render(
      <HelperText id="help-err" invalid>
        오류
      </HelperText>,
    );

    const node = screen.getByText("오류");
    expect(node.className).toMatch(/fg\.danger|danger/);
  });

  test("disabled이면 비활성 색조 클래스를 적용한다", () => {
    render(
      <HelperText id="help-dis" disabled>
        비활성 도움말
      </HelperText>,
    );

    const node = screen.getByText("비활성 도움말");
    expect(node.className).toMatch(/fg\.neutral\.disabled|neutral.*disabled/);
  });

  test("invalid과 disabled가 동시에 true여도 렌더링된다", () => {
    render(
      <HelperText id="help-both" invalid disabled>
        혼합
      </HelperText>,
    );

    expect(screen.getByText("혼합")).toBeInTheDocument();
  });
});
