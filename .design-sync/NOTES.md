# design-sync 노트 (daleui → claude.ai/design)

이 파일은 `/design-sync` 실행이 남기는 리포 고유의 학습 기록이다. 재동기화 시 가장 먼저 읽는다.

## 브랜치 운용 (2026-09)

- 이 디렉토리는 **main이 아니라 `design-sync` 브랜치에만** 있다. Claude Design을 달레UI가 지원하는 표면으로 삼을지 팀이 결정하기 전까지는 main에 넣지 않는다 (제안 자료: PR #1286, 닫힘).
- 동기화 순서: `git switch design-sync && git rebase main` → 동기화 → 바뀐 `config.json`/`NOTES.md`를 이 브랜치에 커밋·푸시. 검증 상태의 앵커(`_ds_sync.json`)는 Claude Design 프로젝트 쪽에 있으므로 브랜치에 있어도 재동기화 속도는 같다.
- 팀이 채택하면 이 브랜치를 main에 병합하고, 프로젝트를 팀 공용으로 옮긴다.

## 실행 환경

- shape: `storybook` (`.storybook/`가 리포 루트). 패키지 매니저 `bun` (`bun install --frozen-lockfile`).
- 라이브러리 빌드는 `cfg.buildCmd` (= `bun run build`에서 `generate:llms`를 뺀 것 — llms.txt/skills 문서 재생성은 동기화와 무관하고 tracked 파일을 건드린다).
- 참조 Storybook: `bunx storybook build -c .storybook -o "$(git rev-parse --show-toplevel)/.design-sync/sb-reference"`. DS 소스가 바뀌면 `buildCmd`와 **함께** 재빌드한다.
- `projectId`는 Dale 소유의 Claude Design 프로젝트를 가리킨다. 비밀값이 아니라 `chromatic.config.json`의 `projectId`와 같은 성격의 식별자다 — 접근 권한은 프로젝트 공유 설정(현재 `scope: org`)이 결정한다. **이 리포는 PUBLIC이므로 공유 범위를 "링크가 있는 누구나"로 바꾸면 커밋된 ID가 곧 공개 링크가 된다.** 다른 사람이 동기화하려면 그 프로젝트의 멤버여야 한다.
- 변환기 호출: `--node-modules ./node_modules --entry dist/index.js --out ./ds-bundle` (자체 소스 리포라 `node_modules/daleui`가 없다).
- 새 클론에서는 `ln -sfn ../.ds-sync/node_modules .design-sync/node_modules`가 필요하다 — `overrides/dts.mjs` fork가 bare `ts-morph`를 import하는데 심링크는 gitignore된다.
- 재동기화 드라이버: `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry dist/index.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json --max-stories 12`. `--max-stories 12`를 유지해야 Grid(9)/RadioGroup(10)/Link·CheckboxGroup(8)/HStack·VStack(7)의 꼬리 스토리가 캡처 범위에 들어온다.

## 전역 수정 이력 (증상 → 원인 → 조치)

- [GENERAL] 모든 프리뷰 빌드가 `Could not resolve "../../../styled-system/css"`로 실패 → Panda가 `styled-system/*`를 `index.mjs` 전용 디렉토리로 생성하는데 esbuild 기본 `resolveExtensions`에 `.mjs`가 없음 → `.design-sync/overrides/story-imports.mjs` fork (policyRedirect에서 해석 실패 시 `<path>.mjs` / `<dir>/index.mjs` 재시도). `cfg.libOverrides`에 선언.
- [GENERAL] README 컴포넌트 목록의 한글 설명이 `Button — , , , .`처럼 구두점만 남음 → 스킬 `lib/dts.mjs` `jsdocFor`의 정제 정규식 `/[^\w\s.,()'/:+-]/g`가 `u` 플래그 없이 `\w`(ASCII)만 남김 (스킬 버그, 피드백 제출됨) → `.design-sync/overrides/dts.mjs` fork — 정규식 한 줄만 `/[^\p{L}\p{N}_\s.,()'/:+-]/gu`로 교체. **스킬이 고쳐지면 fork를 지운다** (fork는 해당 모듈을 스킬 2.1.271 시점에 고정하므로 스킬 업데이트 시 `diff .ds-sync/lib/dts.mjs .design-sync/overrides/dts.mjs`로 차이가 그 한 줄뿐인지 확인할 것 — story-imports.mjs도 동일).
- (해결됨) `[FONT_MISSING] "JetBrains Mono"` → 토큰 `--fonts-mono`가 `"JetBrains Mono"`를 참조했지만 `@fontsource-variable/jetbrains-mono`의 `@font-face` 패밀리명은 `"JetBrains Mono Variable"`이라 mono 텍스트가 시스템 폰트로 fallback되던 리포 버그. 2026-09 첫 동기화에서는 `cfg.extraFonts` 별칭 + sb-reference 주입으로 우회했고, 이후 소스에서 토큰 값을 맞춰(#1284) 우회를 제거했다. 다시 뜨면 토큰과 `@font-face` 이름부터 대조할 것.
- `! preview decorator bundle failed: No loader is configured for ".woff2"` → `.storybook/preview.tsx`가 `../src/index.css`(폰트 패키지 @import)를 가져오는데 데코레이터 번들러엔 폰트 로더가 없음 → **무해하므로 방치**. 유일한 데코레이터는 `withThemeByClassName`(light = `""`, 기본 light)이라 래핑 없이도 스토리와 동일하게 렌더된다. `cfg.provider`를 설정하지 말 것(래핑할 프로바이더 컴포넌트가 없다).
- `[CSS_FROM_STORYBOOK]` → `dist/index.css`는 `@import "pretendard/..."`, `@import "@fontsource-variable/jetbrains-mono"` 같은 bare 패키지 @import로 시작해 업로드 후 해석 불가. sb-reference의 컴파일된 CSS(같은 Panda 파이프라인 + 폰트 인라인)를 쓰는 편이 맞다. `cfg.cssEntry`를 설정하지 말 것.
- `[TITLE_UNMAPPED] Homepage, Login` → `src/examples/`의 페이지 예제 스토리(컴포넌트 아님) → `cfg.titleMap {Homepage: null, Login: null}`.
- `[GRID_OVERFLOW] wide` → Flex, Grid, HStack, Select(OverflowText), Skeleton(Variants)에 `cfg.overrides.<Name>.cardMode: "column"`.
- `[DTS_STYLE_SYSTEM]` 경고 → Box/Flex 등이 `@types/react` CSS 축약 props를 상속하므로 필터링됨. 실제 API가 아니므로 `dtsPropsFor` 불필요.

## 등급(grading) 시 알아둘 점

- [GENERAL] sb 쪽 캡처는 `#storybook-root` 요소 스크린샷인데, 모든 스토리 파일이 `parameters.layout: "centered"`라 루트가 flex 아이템이 되어 **콘텐츠 고유 폭까지 수축**한다. 그래서 `width: 100%` 컴포넌트(TextInput/PasswordInput 래퍼 없는 스토리, Card outline, VStack/Flex 배경 박스)는 sb 쪽이 좁고 프리뷰 쪽은 뷰포트−패딩(876px) 전폭으로 보인다 — 프레이밍 차이이지 결함이 아니다. 판정 요령: raw PNG를 콘텐츠 bbox로 트림해 **높이가 같고** 프리뷰 폭이 정확히 뷰포트−패딩이면 framing, 폭이 임의 값이면 실제 delta. 320px 래퍼가 있는 스토리는 양쪽 트림 크기가 픽셀 단위로 일치한다.
- 프리뷰 쪽은 900×700 뷰포트 전체라 시트에서 작게 보인다; 의심되면 `raw/`를 볼 것. 스토리 래퍼 `VStack`의 기본 `align="center"` 때문에 프리뷰 콘텐츠가 뷰포트 가운데(x≈250–650)에 놓이는 것도 같은 이유.
- 스토리에 원격 이미지가 없다(Figma 링크는 parameters뿐) → `[ASSETS_BLOCKED]` 카나리 해당 없음.
- 2026-09 전체 검증: 솔로 세트(Button, Select, Icon, Heading, Skeleton)는 모든 스토리를, 나머지 16개는 §4 샘플링 규칙으로 이미지 판정해 21/21 `match`. **수정 0건, 소유 프리뷰 0건** — 생성된 프리뷰만으로 스토리북과 일치한다.

## 2026-07 이전 동기화에서 복구한 것

- 7월 동기화는 업로드까지 완료했으나 `.design-sync/config.json`, `NOTES.md`, `conventions.md`, `overrides/`가 커밋되지 않아 유실됐다. 이번 실행에서 로그(`.design-sync/.cache/prev-logs/`)와 원격 README에서 설정을 복원했다. **이 디렉토리의 durable 파일은 반드시 커밋할 것.**

## Re-sync risks

- **fork 파일은 절대 포맷하지 말 것** — `.design-sync/overrides/*.mjs`의 바이트가 등급 키에 들어간다. `.prettierignore`에 등록돼 있고, 스테이징 lib(`.ds-sync/lib/`)을 복사한 뒤 한 줄만 고친 형태를 유지해야 `diff`가 의미를 갖는다. (2026-09에 pre-commit prettier가 재포맷해 하마터면 21개 등급이 초기화될 뻔했다 — 복원 후 `_ds_sync.json`의 sourceKeys를 업로드본과 대조해 확인.)
- **두 lib fork(story-imports.mjs, dts.mjs)** 는 스킬 버전에 묶인다. 스킬 업데이트 후 첫 재동기화에서는 staged lib과 diff해 의도한 한 줄 변경만 남아 있는지 확인하고, 상위에서 고쳐졌으면 fork를 삭제한다(삭제도 fork 바이트 변화라 전체 재등급을 유발함 — 스크린샷 sha256 대조로 재확인 가능, `.cache/raw-hashes-*.txt` 방식).
- **등급은 소스 지문에 묶인다**: 스토리 파일이나 config 슬라이스(provider/storyImports/extraEntries/overrides.skip·viewport/titleMap)나 fork 바이트가 바뀌면 해당(또는 전체) 등급이 초기화된다. cardMode/primaryStory·css/fonts 변경은 등급을 유지한다.
- **`[REFERENCE_STALE?]`** 는 원격 앵커의 bundleSha(7월 1.1.1 빌드)와 비교해 뜬 것이다. 이번 실행은 같은 소스에서 sb-reference를 새로 빌드했으므로 무시했다. 다음부터는 DS 소스가 바뀌면 `buildCmd`와 sb-reference를 **함께** 재빌드할 것.
- **수동 검증 범위**: 솔로 5개·콘텐츠 5개·꼬리 13개 스토리는 개별 이미지 판정, 레이아웃/폼 11개 컴포넌트는 주 스토리(+복잡 스토리 1–2개) 이미지 판정 후 나머지 sibling-trusted. `close` 판정 0건, skip 0건.
- **README 본문 컴포넌트 설명은 `dist/*.d.ts`에서 `export`되는 심볼의 JSDoc 첫 줄(140자)** 에서 온다. `Object.assign(Root, {...})` compound 패턴에서는 JSDoc이 내부 `*Root` 함수가 아니라 **export되는 상수** 위에 있어야 한다(RadioGroup/CheckboxGroup이 그렇게 빠져 있던 것을 #1285에서 옮김). 새 compound 컴포넌트를 추가할 때 같은 실수를 반복하기 쉽다.
- `.storybook/preview.tsx`에 실제 프로바이더 데코레이터가 추가되면 `! preview decorator bundle failed`가 더 이상 무해하지 않다 — 그때는 `.woff2` 로더 문제를 풀거나 `cfg.provider`를 설정해야 한다.
