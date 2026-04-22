import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useHelperText } from "./useHelperText";

describe("useHelperText", () => {
  test("기본값이면 하단 텍스트를 숨기고 aria-describedby를 두지 않는다", () => {
    const { result } = renderHook(() => useHelperText({}));

    expect(result.current.helpTextProps.id).toMatch(/-help-text$/);
    expect(result.current.bottomText).toBeUndefined();
    expect(result.current.showBottomText).toBe(false);
    expect(result.current.fieldProps["aria-describedby"]).toBeUndefined();
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("helperText만 있으면 bottomText에 반영하고 helperTextId를 aria-describedby에 넣는다", () => {
    const { result } = renderHook(() =>
      useHelperText({ helperText: "도움말" }),
    );

    expect(result.current.bottomText).toBe("도움말");
    expect(result.current.showBottomText).toBe(true);
    expect(result.current.fieldProps["aria-describedby"]).toBe(
      result.current.helpTextProps.id,
    );
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("helperText가 빈 문자열이면 하단 텍스트를 표시하지 않는다", () => {
    const { result } = renderHook(() => useHelperText({ helperText: "" }));

    expect(result.current.bottomText).toBe("");
    expect(result.current.showBottomText).toBe(false);
    expect(result.current.fieldProps["aria-describedby"]).toBeUndefined();
  });

  test("invalid이어도 errorMessage가 없으면 helperText를 쓰고 isError는 false다", () => {
    const { result } = renderHook(() =>
      useHelperText({
        invalid: true,
        errorMessage: undefined,
        helperText: "힌트",
      }),
    );

    expect(result.current.bottomText).toBe("힌트");
    expect(result.current.helpTextProps.invalid).toBe(false);
    expect(result.current.showBottomText).toBe(true);
  });

  test("invalid이고 errorMessage가 있으면 errorMessage를 쓰고 isError는 true다", () => {
    const { result } = renderHook(() =>
      useHelperText({
        invalid: true,
        errorMessage: "오류",
        helperText: "힌트",
      }),
    );

    expect(result.current.bottomText).toBe("오류");
    expect(result.current.helpTextProps.invalid).toBe(true);
    expect(result.current.showBottomText).toBe(true);
  });

  test("invalid가 아니면 errorMessage를 bottomText로 쓰지 않는다", () => {
    const { result } = renderHook(() =>
      useHelperText({ errorMessage: "오류", helperText: "힌트" }),
    );

    expect(result.current.bottomText).toBe("힌트");
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("externalAriaDescribedBy와 하단 텍스트가 모두 있으면 공백으로 이어 붙인다", () => {
    const { result } = renderHook(() =>
      useHelperText({
        helperText: "힌트",
        externalAriaDescribedBy: "extra-desc",
      }),
    );

    expect(result.current.fieldProps["aria-describedby"]).toBe(
      `extra-desc ${result.current.helpTextProps.id}`,
    );
  });

  test("externalAriaDescribedBy만 있고 하단 텍스트가 없으면 외부 id만 반환한다", () => {
    const { result } = renderHook(() =>
      useHelperText({
        helperText: "",
        externalAriaDescribedBy: "only-extra",
      }),
    );

    expect(result.current.fieldProps["aria-describedby"]).toBe("only-extra");
  });

  test("하단 텍스트 없이 externalAriaDescribedBy만 있으면 그대로 연결한다", () => {
    const { result } = renderHook(() =>
      useHelperText({ externalAriaDescribedBy: "solo" }),
    );

    expect(result.current.fieldProps["aria-describedby"]).toBe("solo");
  });
});
