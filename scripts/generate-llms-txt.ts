/**
 * scripts/generate-llms-txt.ts
 *
 * 산출물:
 *   skills/daleui/components.md  — 컴포넌트 props 표 (자동 생성)
 *   skills/daleui/tokens.md      — 토큰 이름·값·용도 표 (자동 생성)
 *   public/llms.txt              — AI 인덱스 (npm 패키지에 포함)
 *
 * 실행: bun run generate:llms
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Project, SyntaxKind } from "ts-morph";

import { spacing } from "../src/tokens/spacing";
import { radii } from "../src/tokens/radii";
import { borderWidths, borders } from "../src/tokens/borders";
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "../src/tokens/typography";
import { semanticColors } from "../src/tokens/colors";
import { icons } from "../src/tokens/iconography";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = `${scriptDir}/..`;

const OUT = {
  components: `${root}/skills/daleui/components.md`,
  tokens: `${root}/skills/daleui/tokens.md`,
  llms: `${root}/llms.txt`,
};

const GITHUB = "https://github.com/DaleStudy/daleui/blob/main";
const CHROMATIC = "https://main--675790d317ba346348aa3490.chromatic.com";

// ── 유틸 ─────────────────────────────────────────────────────

function write(path: string, content: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    content.endsWith("\n") ? content : content + "\n",
    "utf8",
  );
}

function github(path: string) {
  return `${GITHUB}/${path}`;
}

function mdTable(headers: string[], rows: string[][]) {
  const head = `| ${headers.join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.map((r) => `| ${r.join(" | ")} |`).join("\n");
  return [head, sep, body].join("\n");
}

function escapeCell(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

// ── 컴포넌트 추출 ─────────────────────────────────────────────

type PropRow = {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
};

type ComponentDoc = {
  name: string;
  description: string;
  props: PropRow[];
};

const project = new Project({
  tsConfigFilePath: `${root}/tsconfig.app.json`,
  skipAddingFilesFromTsConfig: true,
});
project.addSourceFilesAtPaths(`${root}/src/index.ts`);
project.addSourceFilesAtPaths(`${root}/src/components/**/*.tsx`);
project.addSourceFilesAtPaths(`${root}/src/components/shared/types.ts`);

const indexFile = project.getSourceFileOrThrow(`${root}/src/index.ts`);

function extractDefaults(
  sourceFile: ReturnType<typeof project.getSourceFile>,
  exportName: string,
): Record<string, string> {
  if (!sourceFile) return {};
  const defaults: Record<string, string> = {};

  // function declaration 또는 variable declaration (const Foo = (...) => ...) 둘 다 처리
  const fn =
    sourceFile.getFunction(exportName) ??
    sourceFile
      .getVariableDeclarations()
      .find((v) => v.getName() === exportName);

  if (!fn) return defaults;

  const binding = fn.getFirstDescendantByKind(SyntaxKind.ObjectBindingPattern);
  if (!binding) return defaults;

  for (const el of binding.getElements()) {
    const init = el.getInitializer();
    if (init) defaults[el.getName()] = init.getText();
  }
  return defaults;
}

function extractComponentDocs(): ComponentDoc[] {
  const docs: ComponentDoc[] = [];

  for (const exp of indexFile.getExportDeclarations()) {
    for (const named of exp.getNamedExports()) {
      if (named.isTypeOnly()) continue;
      const name = named.getName();
      if (!name || name.endsWith("Props") || name === "FieldProps") continue;

      const sourcePath = `${root}/src/components/${name}/${name}.tsx`;
      const sourceFile = project.getSourceFile(sourcePath);
      if (!sourceFile) continue;

      const propsInterface = sourceFile.getInterface(`${name}Props`);
      if (!propsInterface) continue;

      const defaults = extractDefaults(sourceFile, name);

      const fnDecl = sourceFile.getFunction(name);
      const varDecl = sourceFile
        .getVariableDeclarations()
        .find((v) => v.getName() === name);
      const rawDesc =
        fnDecl?.getJsDocs()[0]?.getDescription() ??
        varDecl
          ?.getFirstAncestorByKind(SyntaxKind.VariableStatement)
          ?.getJsDocs()[0]
          ?.getDescription() ??
        "";
      const description = rawDesc
        .replace(/^#{1,6}\s+(.*)$/gm, "**$1**")
        .replace(/\[([^\]]+)\]\(\?path=[^)]*\)/g, "$1")
        .replace(/\s*TODO:.*$/gm, "")
        .trim();

      const props: PropRow[] = propsInterface.getProperties().map((prop) => ({
        name: prop.getName(),
        type: prop.getType().getText(prop).replace(/\s+/g, " "),
        required: !prop.hasQuestionToken(),
        defaultValue: defaults[prop.getName()],
        description:
          prop
            .getJsDocs()[0]
            ?.getDescription()
            ?.replace(/\s*TODO:.*$/gm, "")
            .trim() ?? "",
      }));

      docs.push({ name, description, props });
    }
  }

  return docs.sort((a, b) => a.name.localeCompare(b.name));
}

// ── components.md ─────────────────────────────────────────────

function renderComponentsMd(components: ComponentDoc[]): string {
  const sections = components.map((c) => {
    const rows = c.props.map((p) => [
      p.required ? `**${p.name}**` : p.name,
      `\`${escapeCell(p.type)}\``,
      p.defaultValue ? `\`${p.defaultValue}\`` : "-",
      escapeCell(p.description),
    ]);

    return [
      `## ${c.name}`,
      "",
      c.description ? `${c.description}\n` : "",
      `\`import { ${c.name} } from "daleui"\``,
      "",
      mdTable(["prop", "타입", "기본값", "설명"], rows),
      "",
    ].join("\n");
  });

  return [
    "# daleui 컴포넌트 레퍼런스",
    "",
    "> 자동 생성 — 수동 편집하지 마세요.",
    "",
    ...sections,
  ].join("\n");
}

// ── tokens.md ─────────────────────────────────────────────────

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

function renderTokensMd(): string {
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

// ── public/llms.txt (AI 인덱스) ──────────────────────────────

function renderLlmsTxt(components: ComponentDoc[]): string {
  const componentLinks = components.map((c) => {
    const summary = c.description.split("\n")[0]?.replace(/\*\*/g, "") ?? "";
    const url = `${github("skills/daleui/components.md")}#${c.name.toLowerCase()}`;
    return `- [${c.name}](${url}): \`import { ${c.name} } from "daleui"\`. ${summary}`;
  });

  return [
    "# daleui",
    "",
    "> 한국어 우선 React 디자인 시스템. Panda CSS 시맨틱 토큰과 접근성 높은 컴포넌트를 제공한다.",
    "",
    "## 규칙",
    "",
    '- `import "daleui/styles.css"` 필수',
    "- 시맨틱 토큰만 사용 (raw hex/px 금지)",
    "- 폼 필드는 label 또는 aria-label 필수",
    "",
    "## AI 에이전트",
    "",
    `- [SKILL.md](${github("skills/daleui/SKILL.md")}): 사용 규칙·컴포넌트 선택 가이드`,
    `- [components.md](${github("skills/daleui/components.md")}): 컴포넌트 props 표`,
    `- [tokens.md](${github("skills/daleui/tokens.md")}): 토큰 이름·값·용도 표`,
    `- [examples.md](${github("skills/daleui/examples.md")}): 조합 예시`,
    "",
    "## 설치",
    "",
    "- npm: `npm install daleui pretendard @fontsource-variable/jetbrains-mono`",
    "- GitHub: https://github.com/DaleStudy/daleui",
    "",
    "## 컴포넌트",
    "",
    `상세 props → [components.md](${github("skills/daleui/components.md")})`,
    "",
    ...componentLinks,
    "",
    "## 토큰",
    "",
    `상세 표 → [tokens.md](${github("skills/daleui/tokens.md")})`,
    "",
    "- spacing, radii, borderWidths, borders, semanticColors, fontSizes, fontWeights, lineHeights, letterSpacings, icons",
    "",
    "## Optional",
    "",
    `- [Storybook (Chromatic)](${CHROMATIC}): 사람용 시각 문서`,
    `- [웹사이트](https://www.daleui.com)`,
    "",
  ].join("\n");
}

// ── 실행 ─────────────────────────────────────────────────────

const components = extractComponentDocs();

write(OUT.components, renderComponentsMd(components));
write(OUT.tokens, renderTokensMd());
write(OUT.llms, renderLlmsTxt(components));

console.log(
  `생성 완료 (${components.length}개 컴포넌트):`,
  Object.values(OUT)
    .map((p) => p.replace(root + "/", ""))
    .join(", "),
);
