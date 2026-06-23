import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useField } from "./useField";

describe("useField", () => {
  test("기본값이면 하단 텍스트를 숨기고 aria-describedby를 두지 않는다", () => {
    const { result } = renderHook(() => useField({}));

    expect(result.current.helpTextProps.id).toMatch(/-help-text$/);
    expect(result.current.bottomText).toBeUndefined();
    expect(result.current.showBottomText).toBe(false);
    expect(result.current.fieldProps["aria-describedby"]).toBeUndefined();
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("helperText만 있으면 bottomText에 반영하고 helperTextId를 aria-describedby에 넣는다", () => {
    const { result } = renderHook(() => useField({ helperText: "도움말" }));

    expect(result.current.bottomText).toBe("도움말");
    expect(result.current.showBottomText).toBe(true);
    expect(result.current.fieldProps["aria-describedby"]).toBe(
      result.current.helpTextProps.id,
    );
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("helperText가 빈 문자열이면 하단 텍스트를 표시하지 않는다", () => {
    const { result } = renderHook(() => useField({ helperText: "" }));

    expect(result.current.bottomText).toBe("");
    expect(result.current.showBottomText).toBe(false);
    expect(result.current.fieldProps["aria-describedby"]).toBeUndefined();
  });

  test("invalid이어도 errorMessage가 없으면 helperText를 쓰고 isError는 false다", () => {
    const { result } = renderHook(() =>
      useField({
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
      useField({
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
      useField({ errorMessage: "오류", helperText: "힌트" }),
    );

    expect(result.current.bottomText).toBe("힌트");
    expect(result.current.helpTextProps.invalid).toBe(false);
  });

  test("externalAriaDescribedBy와 하단 텍스트가 모두 있으면 공백으로 이어 붙인다", () => {
    const { result } = renderHook(() =>
      useField({
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
      useField({
        helperText: "",
        externalAriaDescribedBy: "only-extra",
      }),
    );

    expect(result.current.fieldProps["aria-describedby"]).toBe("only-extra");
  });

  test("하단 텍스트 없이 externalAriaDescribedBy만 있으면 그대로 연결한다", () => {
    const { result } = renderHook(() =>
      useField({ externalAriaDescribedBy: "solo" }),
    );

    expect(result.current.fieldProps["aria-describedby"]).toBe("solo");
  });
});

describe("useField - 상태 우선순위", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("기본값이면 isDisabled/isReadOnly 모두 false다", () => {
    const { result } = renderHook(() => useField({}));
    expect(result.current.isDisabled).toBe(false);
    expect(result.current.isReadOnly).toBe(false);
  });

  test("readOnly만 true면 isReadOnly가 true다", () => {
    const { result } = renderHook(() => useField({ readOnly: true }));
    expect(result.current.isReadOnly).toBe(true);
    expect(result.current.isDisabled).toBe(false);
  });

  test("disabled가 true면 isDisabled가 true다", () => {
    const { result } = renderHook(() => useField({ disabled: true }));
    expect(result.current.isDisabled).toBe(true);
    expect(result.current.isReadOnly).toBe(false);
  });

  test("disabled와 readOnly가 모두 true면 disabled가 우선하고 isReadOnly는 false다", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { result } = renderHook(() =>
      useField({ disabled: true, readOnly: true }),
    );
    expect(result.current.isDisabled).toBe(true);
    expect(result.current.isReadOnly).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test("disabled 없이 readOnly만이면 경고하지 않는다", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    renderHook(() => useField({ readOnly: true }));
    expect(warn).not.toHaveBeenCalled();
  });
});

describe("useField - fieldProps aria", () => {
  test("invalid/required를 fieldProps의 aria-invalid/aria-required로 노출한다", () => {
    const { result } = renderHook(() =>
      useField({ invalid: true, required: true }),
    );
    expect(result.current.fieldProps["aria-invalid"]).toBe(true);
    expect(result.current.fieldProps["aria-required"]).toBe(true);
  });

  test("기본값이면 aria-invalid/aria-required가 false다", () => {
    const { result } = renderHook(() => useField({}));
    expect(result.current.fieldProps["aria-invalid"]).toBe(false);
    expect(result.current.fieldProps["aria-required"]).toBe(false);
  });
});
