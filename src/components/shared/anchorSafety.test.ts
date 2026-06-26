import { describe, expect, test, vi } from "vitest";
import { isSafeHref, mergeRel, sanitizeHref } from "./anchorSafety";

describe("isSafeHref", () => {
  test.each([
    "https://example.com",
    "http://example.com",
    "mailto:hi@example.com",
    "tel:+821012345678",
    "/relative/path",
    "#hash",
    "?query=1",
    "page2",
  ])("안전한 href를 허용한다: %s", (href) => {
    expect(isSafeHref(href)).toBe(true);
  });

  test.each([
    "javascript:alert(1)",
    "JavaScript:alert(1)",
    "java\tscript:alert(1)",
    " javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "vbscript:msgbox(1)",
  ])("위험한 href를 차단한다: %s", (href) => {
    expect(isSafeHref(href)).toBe(false);
  });

  test("파싱할 수 없는 href는 안전하지 않은 것으로 간주한다", () => {
    expect(isSafeHref("https://exa mple.com")).toBe(false);
  });
});

describe("sanitizeHref", () => {
  test("안전한 href는 그대로 반환한다", () => {
    expect(sanitizeHref("https://example.com")).toBe("https://example.com");
  });

  test("위험한 href는 #로 치환하고 경고를 출력한다", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(sanitizeHref("javascript:alert(1)")).toBe("#");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("안전하지 않은 href"),
    );

    warn.mockRestore();
  });

  test("production 모드에서는 경고 없이 #로 치환한다", () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      expect(sanitizeHref("javascript:alert(1)")).toBe("#");
      expect(warn).not.toHaveBeenCalled();
    } finally {
      process.env.NODE_ENV = original;
      warn.mockRestore();
    }
  });
});

describe("mergeRel", () => {
  test("rel이 없으면 required 토큰만 반환한다", () => {
    expect(mergeRel(undefined, ["noopener", "noreferrer"])).toBe(
      "noopener noreferrer",
    );
  });

  test("기존 rel을 보존하며 required를 병합한다", () => {
    expect(mergeRel("nofollow", ["noopener", "noreferrer"])).toBe(
      "nofollow noopener noreferrer",
    );
  });

  test("중복 토큰을 제거한다", () => {
    expect(mergeRel("noopener", ["noopener", "noreferrer"])).toBe(
      "noopener noreferrer",
    );
  });
});
