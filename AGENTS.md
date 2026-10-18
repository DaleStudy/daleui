# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

코드 컨벤션은 [위키의 Conventions](https://github.com/DaleStudy/daleui/wiki/Conventions)를 따른다.

## Code Review Rules

- 새 컴포넌트나 공개 타입은 `src/index.ts`에서 export되어야 한다. 빠지면 `import { X } from "daleui"`가 깨진다.
- 이미 export된 컴포넌트에서 prop의 이름이나 타입, 기본값을 바꾸거나 지우면 breaking change다. PR 설명에 명시되어 있지 않으면 지적한다.
- 스타일은 Panda CSS(`styled-system`)와 `src/tokens`의 토큰으로만 작성한다. 색상이나 간격, radius 값을 하드코딩하면 지적한다.
- 상호작용 컴포넌트는 키보드로 조작 가능하고 적절한 role과 aria 속성, label 연결이 있어야 한다.
- boolean prop은 `is`/`has` 접두사 없이 형용사로 짓는다 (예: `reversed`).
- 테스트는 사용자 상호작용에 `fireEvent` 대신 `@testing-library/user-event`를 쓰고, 스토리(`composeStories` 등)에 의존하지 않는다. 테스트 제목은 한국어로 쓴다.
