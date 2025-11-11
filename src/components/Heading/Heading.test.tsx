import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Heading } from "./Heading";

test("텍스트와 함께 heading이 올바르게 렌더링됨", () => {
  render(<Heading level={1}>제목</Heading>);

  expect(screen.getByRole("heading")).toHaveTextContent("제목");
});

test.each([1, 2, 3, 4, 5] as const)(
  "level 값에 따라 HTML heading 요소가 올바르게 렌더링됨",
  (level) => {
    render(<Heading level={level}>제목</Heading>);

    expect(screen.getByRole("heading", { level })).toBeInTheDocument();
  },
);

test.each([1, 2, 3, 4, 5] as const)(
  "size prop에 따라 textStyle 클래스가 올바르게 적용됨",
  (size) => {
    render(
      <Heading level={1} size={size}>
        제목
      </Heading>,
    );
    expect(screen.getByRole("heading")).toHaveClass(
      `textStyle_heading.${size}`,
    );
  },
);

test.each([
  ["중립 색조", "c_fg.neutral"],
  ["브랜드 색조", "c_fg.brand"],
] as const)("%s에 올바른 톤 클래스를 적용한다", (textName, className) => {
  render(
    <>
      <Heading level={2} tone="neutral">
        중립 색조
      </Heading>
      <Heading level={2} tone="brand">
        브랜드 색조
      </Heading>
    </>,
  );

  expect(screen.getByText(textName)).toHaveClass(className);
});
