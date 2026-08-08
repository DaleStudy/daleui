import { readdirSync } from "node:fs";
import { type ExampleDoc, program, root } from "./setup";

/**
 * src/examples/*.tsx(하위 디렉터리 제외)를 읽어 조합 예시를 추출한다.
 * 각 파일은 최상단 JSDoc의 첫 줄을 제목, 나머지를 설명으로 사용하며,
 * 공개 패키지 사용법을 보여주기 위해 `../index` import를 `daleui`로 치환한다.
 */
export function extractExampleDocs(): ExampleDoc[] {
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

/**
 * ExampleDoc[]를 `skills/daleui/examples.md` 마크다운 문자열로 만든다.
 * 제목·설명·tsx 코드 블록 순으로 조합 예시를 나열한다.
 */
export function renderExamplesMd(examples: ExampleDoc[]): string {
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
