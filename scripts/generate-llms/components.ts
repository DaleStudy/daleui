import ts from "typescript";
import {
  type ComponentDoc,
  type PropRow,
  type StoryExample,
  checker,
  escapeCell,
  mdTable,
  program,
  root,
} from "./setup";

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

/**
 * typeToString 결과에서 import() 경로·React. 접두사·여분 공백을 제거해 문서용으로 짧게 만든다.
 * 예: `import("…/react").ReactNode` → `ReactNode`
 *     `React.Ref<HTMLButtonElement>` → `Ref<HTMLButtonElement>`
 */
function normalizeType(typeStr: string): string {
  return typeStr
    .replace(/import\("[^"]*"\)\./g, "")
    .replace(/\bReact\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * 문자열이 하나의 균형 잡힌 괄호쌍으로 통째로 감싸져 있으면 그 괄호를 제거한다.
 * 예: `(() => void)` → `() => void`
 *     `(a) | (b)` → 그대로 (중간에 최상위 괄호가 닫히므로 통째로 감싼 게 아님)
 */
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

/** 주어진 파라미터 목록에서 구조 분해 `prop = value`만 defaults에 기록한다. */
function extractDefaultsFromParams(
  params: ts.NodeArray<ts.ParameterDeclaration>,
  sourceFile: ts.SourceFile,
  defaults: Record<string, string>,
) {
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

/**
 * 파라미터 타입 어노테이션 이름을 반환한다.
 * 예: `function CheckboxGroupRoot({ … }: CheckboxGroupProps)` → `"CheckboxGroupProps"`
 */
function getParamTypeName(param: ts.ParameterDeclaration): string | undefined {
  if (!param.type || !ts.isTypeReferenceNode(param.type)) return undefined;
  return ts.isIdentifier(param.type.typeName)
    ? param.type.typeName.text
    : undefined;
}

/**
 * 소스 파일에서 이름에 해당하는 함수 선언을 찾는다.
 * 예: name `"CardRoot"` → `function CardRoot({ tone = "neutral" }) { … }`
 *
 * getObjectAssignTarget이 돌려준 식별자 이름을 받을 때 이어서 쓴다.
 */
function findFunctionByName(
  sourceFile: ts.SourceFile,
  name: string,
): ts.SignatureDeclaration | undefined {
  let found: ts.SignatureDeclaration | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (found) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === name) {
      found = node;
      return;
    }
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === name &&
          decl.initializer &&
          (ts.isArrowFunction(decl.initializer) ||
            ts.isFunctionExpression(decl.initializer))
        ) {
          found = decl.initializer;
          return;
        }
      }
    }
  });
  return found;
}

/**
 * `Object.assign(CardRoot, …)` 호출에서 첫 인자 식만 꺼낸다.
 * 예: → 식별자 `CardRoot` (함수 본문은 findFunctionByName으로 따로 찾음)
 */
function getObjectAssignTarget(
  initializer: ts.Expression,
): ts.Expression | undefined {
  if (
    !ts.isCallExpression(initializer) ||
    !ts.isPropertyAccessExpression(initializer.expression) ||
    !ts.isIdentifier(initializer.expression.expression) ||
    initializer.expression.expression.text !== "Object" ||
    initializer.expression.name.text !== "assign"
  ) {
    return undefined;
  }
  return initializer.arguments[0];
}

/**
 * 컴포넌트 구현 함수를 찾아 기본값 맵을 만든다 (Default 열용).
 *
 * export 이름과 구현 함수 이름이 다를 수 있어서, 아래 순으로 찾는다.
 * - `const Button = ({ size = "md" }) => …` 처럼 동명
 * - `export const Card = Object.assign(CardRoot, …)` → CardRoot
 * - `function CheckboxGroupRoot({ tone = "brand" }: CheckboxGroupProps)` → Props 타입으로 매칭
 *
 * 찾은 함수의 파라미터는 extractDefaultsFromParams에 넘긴다.
 */
function extractDefaults(
  sourceFile: ts.SourceFile,
  componentName: string,
): Record<string, string> {
  const defaults: Record<string, string> = {};
  const propsTypeName = `${componentName}Props`;

  // 1) export 이름과 같은 함수 / Object.assign(Root) 대상
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === componentName) {
      extractDefaultsFromParams(node.parameters, sourceFile, defaults);
    }
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || decl.name.text !== componentName)
          continue;
        if (!decl.initializer) continue;

        if (
          ts.isArrowFunction(decl.initializer) ||
          ts.isFunctionExpression(decl.initializer)
        ) {
          extractDefaultsFromParams(
            decl.initializer.parameters,
            sourceFile,
            defaults,
          );
          continue;
        }

        const target = getObjectAssignTarget(decl.initializer);
        if (!target) continue;
        if (ts.isIdentifier(target)) {
          const impl = findFunctionByName(sourceFile, target.text);
          if (impl?.parameters) {
            extractDefaultsFromParams(impl.parameters, sourceFile, defaults);
          }
        } else if (
          ts.isArrowFunction(target) ||
          ts.isFunctionExpression(target)
        ) {
          extractDefaultsFromParams(target.parameters, sourceFile, defaults);
        }
      }
    }
  });

  if (Object.keys(defaults).length > 0) return defaults;

  // 2) `function FooRoot(...: FooProps)`처럼 이름만 다른 구현 함수
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isFunctionDeclaration(node) || !node.parameters[0]) return;
    if (getParamTypeName(node.parameters[0]) === propsTypeName) {
      extractDefaultsFromParams(node.parameters, sourceFile, defaults);
    }
  });

  return defaults;
}

/** index.ts에서 export한 이름(예: Card)을 따라가 실제 구현 파일(Card.tsx)을 찾는다. */
function resolveExportSourceFile(
  element: ts.ExportSpecifier,
): ts.SourceFile | undefined {
  const symbol = checker.getSymbolAtLocation(element.name);
  if (!symbol) return undefined;
  const resolved =
    symbol.flags & ts.SymbolFlags.Alias
      ? checker.getAliasedSymbol(symbol)
      : symbol;
  return resolved.declarations?.[0]?.getSourceFile();
}

function getObjectArgs(
  obj: ts.ObjectLiteralExpression,
  sourceFile: ts.SourceFile,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const prop of obj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      result[prop.name.text] = prop.initializer.getText(sourceFile);
    }
  }
  return result;
}

/** `satisfies` / `as`로 감싼 표현식의 안쪽 값을 꺼낸다. */
function unwrapExpression(expr: ts.Expression): ts.Expression {
  while (ts.isSatisfiesExpression(expr) || ts.isAsExpression(expr)) {
    expr = expr.expression;
  }
  return expr;
}

/** onClick 등 함수 형태 args 값인지 (여러 치환 경로에서 공용) */
function isFunctionArgValue(val: string): boolean {
  const trimmed = val.trim();
  return trimmed.startsWith("function") || trimmed.includes("=>");
}

/** docs 예시에 인라인할지 — 컴포넌트 기본값·데모용 props는 제외 */
function shouldInlineStoryArg(
  key: string,
  val: string,
  componentDefaults: Record<string, string>,
): boolean {
  // Storybook 캔버스용·문서 노이즈 (className / style)
  if (key === "className" || key === "style") return false;
  if (val === "false" || val === "undefined") return false;
  if (val === '""' || val === "''") return false;
  // children은 JSX 자식으로 따로 넣으므로 함수 형태 검사에서 제외
  if (key !== "children" && isFunctionArgValue(val)) return false;
  if (componentDefaults[key] === val) return false;
  return true;
}

/** args.children 소스 텍스트를 JSX 자식 문자열로 다듬는다. */
function formatArgsChildren(val: string): string {
  let s = val.trim();
  if (s.startsWith("(") && s.endsWith(")")) {
    s = stripOuterParens(s).trim();
  }
  if (s.startsWith("<>") && s.endsWith("</>")) {
    s = s.slice(2, -3).trim();
  }
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    return s.slice(1, -1);
  }
  return s;
}

/**
 * 객체 리터럴에서 `render:`에 연결된 함수 노드를 꺼낸다.
 * 예: `{ render: (args) => <Button {...args} /> }` → 그 화살표 함수
 * 스토리/meta 둘 다에 쓰며, 스토리에 없으면 meta render로 fallback할 때 사용.
 */
function getRenderFunction(
  obj: ts.ObjectLiteralExpression,
): ts.ArrowFunction | ts.FunctionExpression | undefined {
  const renderProp = obj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "render",
  );
  if (!renderProp || !ts.isPropertyAssignment(renderProp)) return undefined;
  const fn = renderProp.initializer;
  if (!ts.isArrowFunction(fn) && !ts.isFunctionExpression(fn)) return undefined;
  return fn;
}

/**
 * render 함수 본문에서 반환 JSX/표현식 소스 문자열을 뽑는다.
 * 예: `(args) => (<Button {...args} />)` → `(<Button {...args} />)`
 *     `(args) => { return <Button />; }` → `<Button />`
 */
function getRenderCode(
  renderFn: ts.ArrowFunction | ts.FunctionExpression,
  sourceFile: ts.SourceFile,
): string | undefined {
  const body = renderFn.body;
  if (ts.isBlock(body)) {
    const returnStmt = body.statements.find(ts.isReturnStatement);
    if (!returnStmt?.expression) return undefined;
    return returnStmt.expression.getText(sourceFile).trim();
  }
  return body.getText(sourceFile).trim();
}

function extractStoryExamples(
  componentName: string,
  componentDefaults: Record<string, string> = {},
): StoryExample[] {
  const storiesPath = `${root}/src/components/${componentName}/${componentName}.stories.tsx`;
  const sourceFile = program.getSourceFile(storiesPath);
  if (!sourceFile) return [];

  // meta default args + shared render
  let metaArgs: Record<string, string> = {};
  let metaRender: ts.ArrowFunction | ts.FunctionExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isExportAssignment(node)) return;
    const meta = unwrapExpression(node.expression);
    if (!ts.isObjectLiteralExpression(meta)) return;

    const argsProp = meta.properties.find(
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
    metaRender = getRenderFunction(meta);
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

      // 스토리 render가 없으면 meta render로 fallback (Card 등)
      const renderFn = getRenderFunction(decl.initializer) ?? metaRender;
      if (!renderFn) continue;

      const codeRaw = getRenderCode(renderFn, sourceFile);
      if (!codeRaw) continue;
      let code = codeRaw;

      // {…args} → inlined props (+ self-closing이면 children을 JSX 자식으로).
      // 같은 태그에 이미 명시된 속성(예: <Select {...args} disabled />)은
      // 중복 출력되지 않도록 제외한다. rest/close는 캡처한 원문 그대로 되돌려
      // 값에 ">"(예: 화살표 함수)가 있어도 코드가 깨지지 않게 한다.
      code = code.replace(
        /<([\w.]+)(\s*)\{\.\.\.args\}([^>]*?)(\/?)>/g,
        (
          _match,
          tagName: string,
          ws: string,
          rest: string,
          selfClose: string,
        ) => {
          const present = new Set(
            [...rest.matchAll(/(?:^|\s)([\w-]+)(?=[\s/>=])/g)].map((m) => m[1]),
          );
          const inlined = Object.entries(mergedArgs)
            .filter(
              ([key, val]) =>
                key !== "children" &&
                !present.has(key) &&
                shouldInlineStoryArg(key, val, componentDefaults),
            )
            .map(([key, val]) => {
              if (val === "true") return key;
              if (val.startsWith('"') || val.startsWith("'"))
                return `${key}=${val}`;
              return `${key}={${val}}`;
            })
            .join(" ");
          const attrs = inlined ? `${inlined}${rest}` : rest;
          const childrenVal = mergedArgs.children;
          const children =
            selfClose === "/" &&
            childrenVal &&
            shouldInlineStoryArg("children", childrenVal, componentDefaults)
              ? formatArgsChildren(childrenVal)
              : "";
          if (children) {
            return `<${tagName}${ws}${attrs}>\n${children}\n</${tagName}>`;
          }
          return `<${tagName}${ws}${attrs}${selfClose ? " /" : ""}>`;
        },
      );

      // attr={args.X} → attr="value" or remove the whole attribute if undefined
      code = code.replace(
        /([\w-]+)=\{args\.(\w+)\}/g,
        (_match, attr: string, key: string) => {
          const val = mergedArgs[key];
          if (
            val === undefined ||
            !shouldInlineStoryArg(key, val, componentDefaults)
          )
            return "";
          if (val === "true") return attr;
          if (val.startsWith('"') || val.startsWith("'"))
            return `${attr}=${val}`;
          return `${attr}={${val}}`;
        },
      );

      // {args.X} as JSX children → unwrapped text value or expression
      code = code.replace(/\{args\.(\w+)\}/g, (_match, key: string) => {
        const val = mergedArgs[key];
        if (val === undefined) return "";
        if (isFunctionArgValue(val)) return "";
        if (val.startsWith('"') || val.startsWith("'")) return val.slice(1, -1);
        return val;
      });

      // remaining args.X in expressions
      code = code.replace(/args\.(\w+)/g, (_match, key: string) => {
        const val = mergedArgs[key];
        if (val === undefined || isFunctionArgValue(val)) return '""';
        return val;
      });

      // 안전장치: 위 치환에서 남을 수 있는 의미 없는 `attr={undefined}` 제거
      code = code.replace(/\s+[\w-]+=\{undefined\}/g, "");
      // `{"" && (…)}` / `{false && (…)}` 같은 죽은 조건부 제거
      code = code.replace(/\{\s*(?:""|false)\s*&&\s*\([\s\S]*?\)\s*\}/g, "");
      // `{"url" && (jsx)}` → jsx (truthy 문자열 조건부 unwrap)
      code = code.replace(
        /\{\s*("[^"]+"|'[^']+')\s*&&\s*\(([\s\S]*?)\)\s*\}/g,
        "$2",
      );

      examples.push({ storyName, code });
    }
  });

  return examples;
}

/**
 * `src/index.ts` 공개 export를 순회해 컴포넌트 문서 데이터를 모은다.
 * 각 항목에 props·기본값·JSDoc·Storybook 예시가 들어 있으며, renderComponentsMd 입력으로 쓴다.
 */
export function extractComponentDocs(): ComponentDoc[] {
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

      const sourceFile = resolveExportSourceFile(element);
      if (!sourceFile) continue;

      let propsNode:
        ts.InterfaceDeclaration | ts.TypeAliasDeclaration | undefined;
      let description = "";
      const defaults = extractDefaults(sourceFile, name);
      const propsTypeName = `${name}Props`;

      ts.forEachChild(sourceFile, (child) => {
        if (
          ts.isInterfaceDeclaration(child) &&
          child.name.text === propsTypeName
        ) {
          propsNode = child;
        }
        if (
          ts.isTypeAliasDeclaration(child) &&
          child.name.text === propsTypeName
        ) {
          propsNode = child;
        }
        if (ts.isFunctionDeclaration(child) && child.name?.text === name) {
          description = getJsDocDescription(child) || description;
        }
        if (
          ts.isFunctionDeclaration(child) &&
          child.parameters[0] &&
          getParamTypeName(child.parameters[0]) === propsTypeName
        ) {
          description = description || getJsDocDescription(child);
        }
        if (ts.isVariableStatement(child)) {
          for (const decl of child.declarationList.declarations) {
            if (!ts.isIdentifier(decl.name) || decl.name.text !== name)
              continue;
            description = getJsDocDescription(child) || description;
            const target =
              decl.initializer && getObjectAssignTarget(decl.initializer);
            if (target && ts.isIdentifier(target)) {
              const impl = findFunctionByName(sourceFile, target.text);
              if (impl) {
                description = description || getJsDocDescription(impl);
              }
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
        examples: extractStoryExamples(name, defaults),
      });
    }
  });

  return docs.sort((a, b) => a.name.localeCompare(b.name));
}

// ── components.md ─────────────────────────────────────────────

/**
 * ComponentDoc[]를 `skills/daleui/components.md` 마크다운 문자열로 만든다.
 * 컴포넌트별 props 표와 (있으면) 예시 코드 블록을 포함한다.
 */
export function renderComponentsMd(components: ComponentDoc[]): string {
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
