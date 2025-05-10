import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Login } from "./Login";

test("로그인 버튼을 클릭하면 prop으로 전달한 onSubmit 함수를 호출한다", async () => {
  const onSubmitSpy = vi.fn();
  render(<Login onSubmit={onSubmitSpy} />);
  expect(onSubmitSpy).toHaveBeenCalledTimes(0);
  await userEvent.click(screen.getByRole("button", { name: "로그인" }));
  expect(onSubmitSpy).toHaveBeenCalledTimes(1);
});
