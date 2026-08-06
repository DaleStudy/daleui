/**
 * scripts/generate-llms-txt.ts
 *
 * 산출물:
 *   skills/daleui/components.md  — 컴포넌트 레퍼런스 (자동 생성)
 *   skills/daleui/tokens.md      — 토큰 이름·값·용도 표 (자동 생성)
 *   skills/daleui/examples.md    — 조합 예시 (src/examples/*.tsx에서 자동 생성)
 *   llms.txt                     — AI 인덱스 (npm 패키지에 포함)
 *
 * 구현은 scripts/generate-llms/ 아래 관심사별 모듈에 있다.
 * 실행: bun run generate:llms
 */
import {
  extractComponentDocs,
  renderComponentsMd,
} from "./generate-llms/components";
import {
  extractExampleDocs,
  renderExamplesMd,
} from "./generate-llms/examples";
import { renderLlmsTxt } from "./generate-llms/llms";
import { OUT, root, write } from "./generate-llms/setup";
import { renderTokensMd } from "./generate-llms/tokens";

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
