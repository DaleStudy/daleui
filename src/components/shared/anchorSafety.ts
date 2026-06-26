const SAFE_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

/**
 * `href`가 안전한 URL scheme인지 검사합니다.
 *
 * 상대 경로(`/path`, `#hash`, `?query` 등)는 base URL에 resolve한 뒤 protocol만 확인하므로,
 * `java\tscript:`처럼 공백·제어문자로 난독화한 scheme도 브라우저 URL 파서가 정규화하여 차단됩니다.
 */
export function isSafeHref(href: string): boolean {
  try {
    const url = new URL(href, "http://localhost");
    return SAFE_PROTOCOLS.includes(url.protocol);
  } catch {
    return false;
  }
}

/**
 * 안전한 `href`는 그대로 반환하고, `javascript:` 등 안전하지 않은 `href`는 `#`로 치환합니다.
 * 개발 모드에서는 차단된 값을 `console.warn`으로 알립니다.
 */
export function sanitizeHref(href: string): string {
  if (isSafeHref(href)) {
    return href;
  }

  if (process.env.NODE_ENV !== "production") {
    console.warn(
      `[daleui] 안전하지 않은 href가 차단되었습니다: ${JSON.stringify(href)}`,
    );
  }

  return "#";
}

/**
 * 호출자가 지정한 `rel` 값을 보존하면서 `required` 토큰을 병합합니다.
 *
 * 단순 덮어쓰기와 달리 `nofollow` 같은 기존 의도는 유지하고 보안 토큰만 추가하므로,
 * `target="_blank"` 링크의 `noopener noreferrer`를 항상 보장하여 reverse tabnabbing을 방지합니다.
 * (HTML 명세상 `noopener`는 `opener`보다 우선 적용됩니다.)
 */
export function mergeRel(rel: string | undefined, required: string[]): string {
  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  for (const token of required) {
    tokens.add(token);
  }
  return Array.from(tokens).join(" ");
}
