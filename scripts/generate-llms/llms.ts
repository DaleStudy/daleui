import { CHROMATIC, type ComponentDoc, github } from "./setup";

/**
 * ComponentDoc[]를 AI 인덱스용 `llms.txt` 마크다운 문자열로 만든다.
 * 규칙·에이전트 문서 링크·컴포넌트 목록·토큰·Optional 링크를 포함한다.
 */
export function renderLlmsTxt(components: ComponentDoc[]): string {
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
    `- [components.md](${github("skills/daleui/components.md")}): 컴포넌트 레퍼런스`,
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
