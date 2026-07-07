/**
 * `llms.txt` 생성 스크립트
 *
 * `src/index.ts`가 공개하는 컴포넌트를 소스 오브 트루스로 삼아, 각 컴포넌트의
 * 설명(JSDoc)과 속성(props)을 TypeScript 타입 체커로 추출한 뒤 llmstxt.org
 * 형식의 `llms.txt`를 저장소 루트에 생성한다.
 *
 * 실행: `bun scripts/generate-llms-txt.ts`
 */
import ts from "typescript";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = join(scriptDir, "..");
const indexPath = join(root, "src", "index.ts");
const pkgPath = join(root, "package.json");
const outPath = join(root, "llms.txt");

const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
  name: string;
  version: string;
  homepage?: string;
};

interface PropInfo {
  name: string;
  optional: boolean;
  type: string;
  description: string;
}

interface ComponentInfo {
  name: string;
  description: string;
  props: PropInfo[];
}

/** 저장소 소스(`src/`)에서 선언된 심볼만 통과시켜 상속된 HTML/스타일 props를 제외한다. */
function isDeclaredInSrc(symbol: ts.Symbol): boolean {
  const decl = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!decl) return false;
  const fileName = decl.getSourceFile().fileName.replace(/\\/g, "/");
  return fileName.includes("/src/") && !fileName.includes("/node_modules/");
}

/** JSDoc 설명을 llms.txt에 넣기 좋게 정리한다. */
function cleanDescription(text: string): string {
  return text
    // Storybook 내부 링크(`[텍스트](?path=...)`)는 daleui.com에서 무의미하므로 텍스트만 남긴다.
    .replace(/\[([^\]]+)\]\(\?path=[^)]*\)/g, "$1")
    // 내부용 TODO 주석은 공개 문서에서 제거한다.
    .replace(/\s*TODO:.*$/gm, "")
    // 컴포넌트별 `###` 헤딩과 충돌하지 않도록 설명 내부 헤딩은 굵은 텍스트로 강등한다.
    .replace(/^#{1,6}\s+(.*)$/gm, "**$1**")
    .trim();
}

/** 파일마다 다른 React import 방식으로 생기는 네임스페이스 접두사를 제거해 타입 표기를 통일한다. */
function normalizeType(typeString: string): string {
  return typeString
    .replace(/import\("[^"]*"\)\./g, "")
    .replace(/\bReact\./g, "")
    .replace(/\s+/g, " ");
}

function getSymbolDescription(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): string {
  return cleanDescription(
    ts.displayPartsToString(symbol.getDocumentationComment(checker)),
  );
}

function getPropsFromComponent(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
): PropInfo[] {
  const decl = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!decl) return [];

  const type = checker.getTypeOfSymbolAtLocation(symbol, decl);
  const signatures = type.getCallSignatures();
  if (signatures.length === 0) return [];

  const params = signatures[0].getParameters();
  if (params.length === 0) return [];

  const propsParam = params[0];
  const propsDecl = propsParam.valueDeclaration ?? propsParam.declarations?.[0];
  if (!propsDecl) return [];

  const propsType = checker.getTypeOfSymbolAtLocation(propsParam, propsDecl);

  const props: PropInfo[] = [];
  for (const prop of propsType.getProperties()) {
    if (!isDeclaredInSrc(prop)) continue;

    const propDecl = prop.valueDeclaration ?? prop.declarations?.[0];
    if (!propDecl) continue;

    const propType = checker.getTypeOfSymbolAtLocation(prop, propDecl);
    const typeString = checker.typeToString(
      propType,
      propDecl,
      ts.TypeFormatFlags.NoTruncation,
    );

    props.push({
      name: prop.getName(),
      optional: (prop.flags & ts.SymbolFlags.Optional) !== 0,
      type: normalizeType(typeString),
      description: getSymbolDescription(prop, checker),
    });
  }

  return props;
}

/** `src/index.ts`의 값(value) export 이름을 파일 등장 순서대로 수집한다(타입 전용 export 제외). */
function getPublicComponentNames(sourceFile: ts.SourceFile): string[] {
  const names: string[] = [];
  sourceFile.forEachChild((node) => {
    if (!ts.isExportDeclaration(node) || !node.exportClause) return;
    if (node.isTypeOnly) return;
    if (!ts.isNamedExports(node.exportClause)) return;
    for (const element of node.exportClause.elements) {
      if (element.isTypeOnly) continue;
      names.push(element.name.text);
    }
  });
  return names;
}

function collectComponents(): ComponentInfo[] {
  const program = ts.createProgram([indexPath], {
    target: ts.ScriptTarget.ES2020,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    skipLibCheck: true,
    strict: false,
    noEmit: true,
    esModuleInterop: true,
  });
  const checker = program.getTypeChecker();

  const indexSource = program.getSourceFile(indexPath);
  if (!indexSource) {
    throw new Error(`엔트리 파일을 찾을 수 없습니다: ${indexPath}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(indexSource);
  if (!moduleSymbol) {
    throw new Error("index.ts의 모듈 심볼을 해석할 수 없습니다.");
  }

  const exportsByName = new Map<string, ts.Symbol>();
  for (const exportSymbol of checker.getExportsOfModule(moduleSymbol)) {
    exportsByName.set(exportSymbol.getName(), exportSymbol);
  }

  const components: ComponentInfo[] = [];
  for (const name of getPublicComponentNames(indexSource)) {
    let symbol = exportsByName.get(name);
    if (!symbol) continue;
    if (symbol.flags & ts.SymbolFlags.Alias) {
      symbol = checker.getAliasedSymbol(symbol);
    }

    components.push({
      name,
      description: getSymbolDescription(symbol, checker),
      props: getPropsFromComponent(symbol, checker),
    });
  }

  return components;
}

function renderProps(props: PropInfo[]): string[] {
  if (props.length === 0) return [];
  const lines = ["", "**Props**", ""];
  for (const prop of props) {
    const optional = prop.optional ? "?" : "";
    const description = prop.description ? ` — ${prop.description}` : "";
    lines.push(`- \`${prop.name}${optional}\`: \`${prop.type}\`${description}`);
  }
  return lines;
}

function render(components: ComponentInfo[]): string {
  const lines: string[] = [];

  lines.push("# 달레 UI (daleui)");
  lines.push("");
  lines.push(
    "> 한국어 사용자 중심으로 설계된 접근성 높은 오픈소스 React 디자인 시스템입니다. Panda CSS 기반의 디자인 토큰과 컴포넌트를 제공합니다.",
  );
  lines.push("");
  lines.push(
    `이 문서는 \`daleui\` npm 패키지 v${pkg.version} 기준으로 자동 생성되었습니다. 공개 컴포넌트와 각 컴포넌트의 속성(props), 디자인 토큰, 참고 문서 링크를 담고 있습니다.`,
  );
  lines.push("");

  lines.push("## 설치");
  lines.push("");
  lines.push("```sh");
  lines.push("npm install daleui pretendard @fontsource-variable/jetbrains-mono");
  lines.push("```");
  lines.push("");
  lines.push("앱 진입점에서 스타일을 한 번 불러옵니다.");
  lines.push("");
  lines.push("```tsx");
  lines.push('import "daleui/styles.css";');
  lines.push("```");
  lines.push("");
  lines.push("컴포넌트는 이름 있는 export로 가져옵니다.");
  lines.push("");
  lines.push("```tsx");
  lines.push('import { Button } from "daleui";');
  lines.push("```");
  lines.push("");

  lines.push("## 컴포넌트");
  lines.push("");
  for (const component of components) {
    lines.push(`### ${component.name}`);
    lines.push("");
    if (component.description) {
      lines.push(component.description);
    }
    lines.push(...renderProps(component.props));
    lines.push("");
  }

  lines.push("## 디자인 토큰");
  lines.push("");
  lines.push(
    "달레 UI는 Panda CSS 기반의 디자인 토큰을 사용합니다. 컴포넌트의 `tone`, `size` 등 속성 값은 아래 토큰 체계를 따릅니다.",
  );
  lines.push("");
  lines.push("- **Colors**: 의미 기반(semantic) 색상과 원시(primitive) 팔레트. 색조는 `brand`, `neutral`, `danger`, `warning`, `success`, `info`로 구성됩니다.");
  lines.push("- **Typography**: Pretendard Variable 웹폰트 기반의 글자 크기·굵기·행간·자간 토큰.");
  lines.push("- **Spacing**: 여백과 간격에 사용하는 간격 토큰.");
  lines.push("- **Radii**: 모서리 둥글기(border-radius) 토큰.");
  lines.push("- **Borders**: 테두리 두께·색상 토큰.");
  lines.push("- **Iconography**: Lucide 기반 아이콘 세트.");
  lines.push("");

  lines.push("## 문서");
  lines.push("");
  lines.push(`- [웹사이트](${pkg.homepage ?? "https://www.daleui.com"})`);
  lines.push("- [Storybook](https://main--675790d317ba346348aa3490.chromatic.com)");
  lines.push("- [GitHub 저장소](https://github.com/DaleStudy/daleui)");
  lines.push("- [위키](https://github.com/DaleStudy/daleui/wiki)");
  lines.push("- [Figma UI Kit](https://www.figma.com/community/file/1559487636467651573)");
  lines.push("");

  return lines.join("\n");
}

const components = collectComponents();
const output = render(components);
writeFileSync(outPath, output, "utf8");
console.log(
  `llms.txt 생성 완료: ${components.length}개 컴포넌트 (${outPath})`,
);
