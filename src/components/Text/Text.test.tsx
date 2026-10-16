import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Text } from "./Text";

test("텍스트를 렌더링한다", () => {
  render(<Text>테스트</Text>);

  expect(screen.getByText("테스트")).toBeInTheDocument();
});
