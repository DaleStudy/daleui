import { borderWidths, borders } from "../../src/tokens/borders";
import { semanticColors } from "../../src/tokens/colors";
import { icons } from "../../src/tokens/iconography";
import { radii } from "../../src/tokens/radii";
import { spacing } from "../../src/tokens/spacing";
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "../../src/tokens/typography";
import { escapeCell, mdTable } from "./setup";

function flattenSemanticColors(
  obj: Record<string, unknown>,
  prefix = "",
): Array<{ path: string; light: string; dark: string }> {
  const rows: Array<{ path: string; light: string; dark: string }> = [];

  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!val || typeof val !== "object") continue;

    if ("value" in val) {
      const token = val as { value: unknown };
      if (token.value && typeof token.value === "object") {
        const v = token.value as Record<string, string>;
        rows.push({ path, light: v.base ?? "-", dark: v._dark ?? "-" });
      } else if (typeof token.value === "string") {
        rows.push({ path, light: token.value, dark: token.value });
      }
    } else {
      rows.push(...flattenSemanticColors(val as Record<string, unknown>, path));
    }
  }
  return rows;
}

function semanticColorUsage(path: string): string {
  if (path === "appBg") return "앱 전체 배경";
  if (path.startsWith("fgSolid.")) return "solid 배경 위 전경색";
  if (path.startsWith("fg.")) return "전경색 (텍스트·아이콘)";
  if (path.startsWith("bgSolid.")) return "solid 컴포넌트 배경";
  if (path.startsWith("bg.")) return "배경색";
  if (path.startsWith("border.")) return "테두리·아웃라인";
  return "시맨틱 색상";
}

export function renderTokensMd(): string {
  const colorRows = flattenSemanticColors(
    semanticColors as Record<string, unknown>,
  ).map((r) => [
    r.path,
    escapeCell(r.light),
    escapeCell(r.dark),
    semanticColorUsage(r.path),
  ]);

  return [
    "# daleui 토큰 레퍼런스",
    "",
    "> 자동 생성 — 수동 편집하지 마세요.  ",
    "> `css()` 또는 Panda 스타일 속성에서 시맨틱 토큰 키를 사용한다. raw hex/px 금지.",
    "",
    "## spacing",
    "",
    "> margin, padding, gap, top, right, bottom, left, outlineOffset",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(spacing).map(([k, t]) => [k, t.value, "간격·여백"]),
    ),
    "",
    "## radii",
    "",
    "> borderRadius",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(radii as Record<string, { value: string }>).map(
        ([k, t]) => [k, t.value, k === "full" ? "원형(pill)" : "모서리 둥글기"],
      ),
    ),
    "",
    "## borderWidths",
    "",
    "> borderWidth, outlineWidth",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(borderWidths as Record<string, { value: string }>).map(
        ([k, t]) => [k, t.value, "테두리·포커스 링 두께"],
      ),
    ),
    "",
    "## borders",
    "",
    "> tone별 border shorthand",
    "",
    mdTable(
      ["토큰", "용도"],
      Object.keys(borders as Record<string, unknown>).map((k) => [
        k,
        `${k} 톤 테두리`,
      ]),
    ),
    "",
    "## semanticColors",
    "",
    '> 다크모드 자동 대응. `css({ color: "fg.brand" })` 형태로 사용.',
    "",
    mdTable(["토큰", "light", "dark", "용도"], colorRows),
    "",
    "## fontSizes",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(fontSizes).map(([k, t]) => [k, t.value, "fontSize"]),
    ),
    "",
    "## fontWeights",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(fontWeights).map(([k, t]) => [
        k,
        String(t.value),
        "fontWeight",
      ]),
    ),
    "",
    "## lineHeights",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(lineHeights).map(([k, t]) => [k, t.value, "lineHeight"]),
    ),
    "",
    "## letterSpacings",
    "",
    mdTable(
      ["토큰", "값", "용도"],
      Object.entries(letterSpacings).map(([k, t]) => [
        k,
        t.value,
        "letterSpacing",
      ]),
    ),
    "",
    "## icons",
    "",
    "> `Icon` 컴포넌트 `name` prop에 사용.",
    "",
    mdTable(
      ["이름", "용도"],
      Object.keys(icons).map((name) => [name, "Icon name"]),
    ),
    "",
  ].join("\n");
}
