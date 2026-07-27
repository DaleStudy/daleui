/**
 * scripts/generate-llms-txt.ts
 *
 * 산출물:
 *   skills/daleui/components.md  — 컴포넌트 props 표 (자동 생성)
 *   skills/daleui/tokens.md      — 토큰 이름·값·용도 표 (자동 생성)
 *   skills/daleui/examples.md    — 조합 예시 (src/examples/*.tsx에서 자동 생성)
 *   llms.txt                     — AI 인덱스 (npm 패키지에 포함)
 *
 * 실행: bun run generate:llms
 */
import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { borderWidths, borders } from "../src/tokens/borders";
import { semanticColors } from "../src/tokens/colors";
import { icons } from "../src/tokens/iconography";
import { radii } from "../src/tokens/radii";
import { spacing } from "../src/tokens/spacing";
import {
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "../src/tokens/typography";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = `${scriptDir}/..`;

const OUT = {
  components: `${root}/skills/daleui/components.md`,
  tokens: `${root}/skills/daleui/tokens.md`,
  examples: `${root}/skills/daleui/examples.md`,
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
  examples: StoryExample[];
};

const configFile = ts.readConfigFile(
  `${root}/tsconfig.app.json`,
  ts.sys.readFile,
);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  root,
);
const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: { ...parsedConfig.options, noEmit: true },
});
const checker = program.getTypeChecker();

function getJsDocDescription(node: ts.Node): string {
  for (const jsDoc of ts.getJSDocCommentsAndTags(node)) {
    if (ts.isJSDoc(jsDoc) && jsDoc.comment) {
      return typeof jsDoc.comment === "string"
        ? jsDoc.comment
        : jsDoc.comment
            .map((c) => ("text" in c ? (c.text as string) : ""))
            .join("");
    }
  }
  return "";
}

/** PropertySignature의 이름을 추출한다. 식별자뿐 아니라 "aria-label" 같은 문자열 리터럴 키도 지원한다. */
function getPropName(name: ts.PropertyName): string {
  if (ts.isIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name)) return name.text;
  return "";
}

function normalizeType(typeStr: string): string {
  return typeStr
    .replace(/import\("[^"]*"\)\./g, "")
    .replace(/\bReact\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 문자열이 하나의 균형 잡힌 괄호쌍으로 통째로 감싸져 있으면 그 괄호를 제거한다. */
function stripOuterParens(s: string): string {
  if (!s.startsWith("(") || !s.endsWith(")")) return s;
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") {
      depth--;
      // 끝에 도달하기 전에 최상위 괄호가 닫히면 전체를 감싼 게 아니다.
      if (depth === 0 && i !== s.length - 1) return s;
    }
  }
  return s.slice(1, -1);
}

/**
 * 표시용 타입 문자열을 다듬는다.
 * 옵셔널 prop(`?`)은 타입체커가 끝에 ` | undefined`를 붙이는데,
 * 옵셔널 여부는 표에서 굵기로 이미 구분되므로 중복인 후행 ` | undefined`를 제거한다.
 * (제거 후 함수 타입을 감싸던 여분 괄호도 정리)
 */
function formatPropType(rawType: string, optional: boolean): string {
  if (!optional) return rawType;
  const stripped = rawType.replace(/\s*\|\s*undefined$/, "");
  if (stripped === "" || stripped === rawType) return rawType;
  return stripOuterParens(stripped);
}

function extractDefaults(
  sourceFile: ts.SourceFile,
  componentName: string,
): Record<string, string> {
  const defaults: Record<string, string> = {};

  function extractFromParams(params: ts.NodeArray<ts.ParameterDeclaration>) {
    const firstParam = params[0];
    if (!firstParam || !ts.isObjectBindingPattern(firstParam.name)) return;
    for (const el of firstParam.name.elements) {
      if (!el.initializer) continue;
      const propName = el.propertyName
        ? ts.isIdentifier(el.propertyName)
          ? el.propertyName.text
          : ""
        : ts.isIdentifier(el.name)
          ? el.name.text
          : "";
      if (propName) defaults[propName] = el.initializer.getText(sourceFile);
    }
  }

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === componentName) {
      extractFromParams(node.parameters);
    }
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === componentName &&
          decl.initializer &&
          (ts.isArrowFunction(decl.initializer) ||
            ts.isFunctionExpression(decl.initializer))
        ) {
          extractFromParams(decl.initializer.parameters);
        }
      }
    }
  });

  return defaults;
}

type StoryExample = {
  storyName: string;
  code: string;
};

function getObjectArgs(
  obj: ts.ObjectLiteralExpression,
  sourceFile: ts.SourceFile,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const prop of obj.properties) {
    if (
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name) &&
      prop.name.text !== "children"
    ) {
      result[prop.name.text] = prop.initializer.getText(sourceFile);
    }
  }
  return result;
}

function extractStoryExamples(componentName: string): StoryExample[] {
  const storiesPath = `${root}/src/components/${componentName}/${componentName}.stories.tsx`;
  const sourceFile = program.getSourceFile(storiesPath);
  if (!sourceFile) return [];

  // meta default args
  let metaArgs: Record<string, string> = {};
  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isExportAssignment(node) &&
      ts.isObjectLiteralExpression(node.expression)
    ) {
      const argsProp = node.expression.properties.find(
        (p) =>
          ts.isPropertyAssignment(p) &&
          ts.isIdentifier(p.name) &&
          p.name.text === "args",
      );
      if (
        argsProp &&
        ts.isPropertyAssignment(argsProp) &&
        ts.isObjectLiteralExpression(argsProp.initializer)
      ) {
        metaArgs = getObjectArgs(argsProp.initializer, sourceFile);
      }
    }
  });

  const examples: StoryExample[] = [];

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isVariableStatement(node)) return;
    const isExported = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) return;

    for (const decl of node.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue;
      const storyName = decl.name.text;
      if (!decl.initializer || !ts.isObjectLiteralExpression(decl.initializer))
        continue;

      // story-specific args (overrides)
      const storyArgsProp = decl.initializer.properties.find(
        (p) =>
          ts.isPropertyAssignment(p) &&
          ts.isIdentifier(p.name) &&
          p.name.text === "args",
      );
      const storyArgs =
        storyArgsProp &&
        ts.isPropertyAssignment(storyArgsProp) &&
        ts.isObjectLiteralExpression(storyArgsProp.initializer)
          ? getObjectArgs(storyArgsProp.initializer, sourceFile)
          : {};

      // merge: story args override meta args, then replace {…args}
      const mergedArgs = { ...metaArgs, ...storyArgs };

      const renderProp = decl.initializer.properties.find(
        (p) =>
          ts.isPropertyAssignment(p) &&
          ts.isIdentifier(p.name) &&
          p.name.text === "render",
      );
      if (!renderProp || !ts.isPropertyAssignment(renderProp)) continue;

      const renderFn = renderProp.initializer;
      if (!ts.isArrowFunction(renderFn) && !ts.isFunctionExpression(renderFn))
        continue;

      const body = renderFn.body;
      let code: string;

      if (ts.isBlock(body)) {
        const returnStmt = body.statements.find(ts.isReturnStatement);
        if (!returnStmt?.expression) continue;
        code = returnStmt.expression.getText(sourceFile).trim();
      } else {
        code = body.getText(sourceFile).trim();
      }

      // {…args} → inlined props.
      // 같은 태그에 이미 명시된 속성(예: <Select {...args} disabled />)은
      // 중복 출력되지 않도록 제외한다. rest/close는 캡처한 원문 그대로 되돌려
      // 값에 ">"(예: 화살표 함수)가 있어도 코드가 깨지지 않게 한다.
      code = code.replace(
        /\{\.\.\.args\}([^>]*?)(\/?>)/g,
        (_match, rest: string, close: string) => {
          const present = new Set(
            [...rest.matchAll(/(?:^|\s)([\w-]+)(?=[\s/>=])/g)].map((m) => m[1]),
          );
          const inlined = Object.entries(mergedArgs)
            .filter(
              ([key, val]) =>
                val !== "false" && val !== "undefined" && !present.has(key),
            )
            .map(([key, val]) => {
              if (val === "true") return key;
              if (val.startsWith('"') || val.startsWith("'"))
                return `${key}=${val}`;
              return `${key}={${val}}`;
            })
            .join(" ");
          return `${inlined}${rest}${close}`;
        },
      );

      // attr={args.X} → attr="value" or remove the whole attribute if undefined
      code = code.replace(
        /([\w-]+)=\{args\.(\w+)\}/g,
        (_match, attr: string, key: string) => {
          const val = mergedArgs[key];
          if (val === undefined || val === "undefined") return "";
          if (val.startsWith('"') || val.startsWith("'"))
            return `${attr}=${val}`;
          return `${attr}={${val}}`;
        },
      );

      // {args.X} as JSX children → unwrapped text value or expression
      code = code.replace(/\{args\.(\w+)\}/g, (_match, key: string) => {
        const val = mergedArgs[key];
        if (val === undefined) return "";
        if (val.startsWith('"') || val.startsWith("'")) return val.slice(1, -1);
        return val;
      });

      // remaining args.X in expressions
      code = code.replace(/args\.(\w+)/g, (_match, key: string) => {
        const val = mergedArgs[key];
        if (val === undefined) return '""';
        return val;
      });

      // 안전장치: 위 치환에서 남을 수 있는 의미 없는 `attr={undefined}` 제거
      code = code.replace(/\s+[\w-]+=\{undefined\}/g, "");

      examples.push({ storyName, code });
    }
  });

  return examples;
}

function extractComponentDocs(): ComponentDoc[] {
  const docs: ComponentDoc[] = [];
  const indexFile = program.getSourceFile(`${root}/src/index.ts`);
  if (!indexFile) return docs;

  ts.forEachChild(indexFile, (node) => {
    if (
      !ts.isExportDeclaration(node) ||
      !node.exportClause ||
      !ts.isNamedExports(node.exportClause)
    )
      return;

    for (const element of node.exportClause.elements) {
      if (element.isTypeOnly) continue;
      const name = element.name.text;
      if (name.endsWith("Props") || name === "FieldProps") continue;

      const sourcePath = `${root}/src/components/${name}/${name}.tsx`;
      const sourceFile = program.getSourceFile(sourcePath);
      if (!sourceFile) continue;

      let propsNode:
        | ts.InterfaceDeclaration
        | ts.TypeAliasDeclaration
        | undefined;
      let description = "";
      const defaults = extractDefaults(sourceFile, name);

      ts.forEachChild(sourceFile, (child) => {
        if (
          ts.isInterfaceDeclaration(child) &&
          child.name.text === `${name}Props`
        ) {
          propsNode = child;
        }
        if (
          ts.isTypeAliasDeclaration(child) &&
          child.name.text === `${name}Props`
        ) {
          propsNode = child;
        }
        if (ts.isFunctionDeclaration(child) && child.name?.text === name) {
          description = getJsDocDescription(child);
        }
        if (ts.isVariableStatement(child)) {
          for (const decl of child.declarationList.declarations) {
            if (ts.isIdentifier(decl.name) && decl.name.text === name) {
              description = getJsDocDescription(child);
            }
          }
        }
      });

      if (!propsNode) continue;

      // interface면 멤버 직접 순회, type alias(union 등)면 타입 체커로 프로퍼티 추출
      let props: PropRow[];
      if (ts.isInterfaceDeclaration(propsNode)) {
        props = propsNode.members.filter(ts.isPropertySignature).map((prop) => {
          const propName = getPropName(prop.name);
          const rawType = normalizeType(
            checker.typeToString(
              checker.getTypeAtLocation(prop),
              prop,
              ts.TypeFormatFlags.NoTruncation,
            ),
          );
          const required = !prop.questionToken;
          return {
            name: propName,
            type: formatPropType(rawType, !required),
            required,
            defaultValue: defaults[propName],
            description: getJsDocDescription(prop)
              .replace(/\s*TODO:.*$/gm, "")
              .trim(),
          };
        });
      } else {
        // 소스 파일 내 모든 type/interface 선언에서 직접 선언된 property signature 수집.
        // 유니온 타입(A | B)에서는 같은 prop이 분기별로 여러 번 선언될 수 있다
        // (예: Tag의 href는 링크 분기 `string`, span 분기 `never`).
        // 이때 정보량이 많은 선언(설명이 있거나 구체 타입)을 우선하고,
        // 어느 한 분기라도 optional이면 optional로 취급한다.
        const localProps = new Map<string, ts.PropertySignature>();
        const optionalNames = new Set<string>();

        const propTypeStr = (decl: ts.PropertySignature) =>
          normalizeType(
            checker.typeToString(
              checker.getTypeAtLocation(decl),
              decl,
              ts.TypeFormatFlags.NoTruncation,
            ),
          );
        const propDesc = (decl: ts.PropertySignature) =>
          getJsDocDescription(decl)
            .replace(/\s*TODO:.*$/gm, "")
            .trim();
        const isInformative = (decl: ts.PropertySignature) => {
          const t = propTypeStr(decl);
          return (
            propDesc(decl).length > 0 || (t !== "undefined" && t !== "never")
          );
        };

        function collectLocalProps(node: ts.Node) {
          if (ts.isInterfaceDeclaration(node) || ts.isTypeLiteralNode(node)) {
            for (const member of node.members ?? []) {
              if (!ts.isPropertySignature(member)) continue;
              const memberName = getPropName(member.name);
              if (!memberName) continue;
              if (member.questionToken) optionalNames.add(memberName);
              const existing = localProps.get(memberName);
              if (!existing) {
                localProps.set(memberName, member);
              } else if (isInformative(member) && !isInformative(existing)) {
                localProps.set(memberName, member);
              }
            }
          }
          ts.forEachChild(node, collectLocalProps);
        }
        collectLocalProps(sourceFile);

        props = [...localProps.entries()].map(([propName, propDecl]) => {
          const required =
            !propDecl.questionToken && !optionalNames.has(propName);
          return {
            name: propName,
            type: formatPropType(propTypeStr(propDecl), !required),
            required,
            defaultValue: defaults[propName],
            description: propDesc(propDecl),
          };
        });
      }

      docs.push({
        name,
        description: description
          .replace(/^#{1,6}\s+(.*)$/gm, "**$1**")
          .replace(/\[([^\]]+)\]\(\?path=[^)]*\)/g, "$1")
          .replace(/\s*TODO:.*$/gm, "")
          .trim(),
        props,
        examples: extractStoryExamples(name),
      });
    }
  });

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

    const exampleLines =
      c.examples.length > 0
        ? [
            "### 예시",
            "",
            ...c.examples.flatMap((ex) => [
              `**${ex.storyName}**`,
              "",
              "```tsx",
              ex.code,
              "```",
              "",
            ]),
          ]
        : [];

    return [
      `## ${c.name}`,
      "",
      c.description ? `${c.description}\n` : "",
      `\`import { ${c.name} } from "daleui"\``,
      "",
      mdTable(["prop", "타입", "기본값", "설명"], rows),
      "",
      ...exampleLines,
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

// ── examples.md ───────────────────────────────────────────────

type ExampleDoc = {
  title: string;
  description: string;
  code: string;
};

/**
 * src/examples/*.tsx(하위 디렉터리 제외)를 읽어 조합 예시를 추출한다.
 * 각 파일은 최상단 JSDoc의 첫 줄을 제목, 나머지를 설명으로 사용하며,
 * 공개 패키지 사용법을 보여주기 위해 `../index` import를 `daleui`로 치환한다.
 */
function extractExampleDocs(): ExampleDoc[] {
  const examplesDir = `${root}/src/examples`;
  let entries: string[];
  try {
    entries = readdirSync(examplesDir, { withFileTypes: true })
      .filter((d) => d.isFile() && d.name.endsWith(".tsx"))
      .map((d) => d.name)
      .sort();
  } catch {
    return [];
  }

  const docs: ExampleDoc[] = [];
  for (const fileName of entries) {
    const sourceFile = program.getSourceFile(`${examplesDir}/${fileName}`);
    if (!sourceFile) continue;

    const fullText = sourceFile.getFullText();
    let title = fileName.replace(/\.tsx$/, "");
    let description = "";
    let code = fullText;

    const jsdocMatch = fullText.match(/\/\*\*[\s\S]*?\*\//);
    if (jsdocMatch && fullText.slice(0, jsdocMatch.index).trim() === "") {
      const lines = jsdocMatch[0]
        .replace(/^\/\*\*/, "")
        .replace(/\*\/$/, "")
        .split("\n")
        .map((l) => l.replace(/^\s*\*\s?/, "").trimEnd());
      while (lines.length && lines[0].trim() === "") lines.shift();
      while (lines.length && lines[lines.length - 1].trim() === "") lines.pop();
      title = lines.shift()?.trim() || title;
      while (lines.length && lines[0].trim() === "") lines.shift();
      description = lines.join("\n").trim();
      code = fullText.slice((jsdocMatch.index ?? 0) + jsdocMatch[0].length);
    }

    code = code
      .replace(/from "\.\.\/index"/g, 'from "daleui"')
      .replace(/from "\.\.\/index\.ts"/g, 'from "daleui"')
      .trim();

    docs.push({ title, description, code });
  }

  return docs;
}

function renderExamplesMd(examples: ExampleDoc[]): string {
  const sections = examples.map((ex, i) =>
    [
      `## ${i + 1}. ${ex.title}`,
      "",
      ex.description ? `${ex.description}\n` : "",
      "```tsx",
      ex.code,
      "```",
      "",
    ].join("\n"),
  );

  return [
    "# daleui 조합 예시",
    "",
    "> 자동 생성 — 수동 편집하지 마세요. 원본: `src/examples/*.tsx` (tsc로 타입 검증됨).",
    '> 각 예시는 `import "daleui/styles.css"`가 적용된 환경을 가정한다.',
    "",
    ...sections,
  ].join("\n");
}

// ── llms.txt (AI 인덱스) ──────────────────────────────────────

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
const examples = extractExampleDocs();

write(OUT.components, renderComponentsMd(components));
write(OUT.tokens, renderTokensMd());
write(OUT.examples, renderExamplesMd(examples));
write(OUT.llms, renderLlmsTxt(components));

console.log(
  `생성 완료 (${components.length}개 컴포넌트, ${examples.length}개 예시):`,
  Object.values(OUT)
    .map((p) => p.replace(root + "/", ""))
    .join(", "),
);
