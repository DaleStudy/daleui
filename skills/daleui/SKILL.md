# daleui Agent Skill

한국어 우선 React 디자인 시스템 `daleui`를 사용해 UI를 구현하는 AI 에이전트 가이드입니다.

## 필수 규칙

1. **스타일 import 필수** — 앱 진입점에서 반드시 한 번 불러온다.
   ```tsx
   import "daleui/styles.css";
   ```
2. **시맨틱 토큰만 사용** — `color: "#fff"`, `padding: "8px"` 같은 raw 값 금지. 반드시 `tokens.md`의 토큰 키를 사용한다.
3. **폼 필드 접근성** — `TextInput`, `Select`, `PasswordInput`, `Checkbox`, `RadioGroup` 등 모든 폼 요소에 `label` prop 또는 `aria-label`을 반드시 지정한다.
4. **외부 링크** — `Link`에 `external` prop을 주면 `target="_blank"` + `rel="noopener noreferrer"`가 자동 적용된다.

## 컴포넌트 선택 가이드

### 레이아웃

| 상황                       | 추천 컴포넌트       |
| -------------------------- | ------------------- |
| 기본 블록 컨테이너         | `Box`               |
| 가로 배치 (중앙 정렬 기본) | `HStack`            |
| 세로 배치 (중앙 정렬 기본) | `VStack`            |
| 방향 전환·정렬 커스텀 필요 | `Flex`              |
| 격자 레이아웃              | `Grid` + `GridItem` |

> `HStack`과 `VStack`은 `align` 기본값이 `center`입니다. `stretch` 등 다른 정렬이 필요하면 `Flex`를 사용하세요.

### 폼 입력

| 상황                          | 추천 컴포넌트   |
| ----------------------------- | --------------- |
| 텍스트 입력                   | `TextInput`     |
| 비밀번호 입력                 | `PasswordInput` |
| 드롭다운 선택 (6개 이상 옵션) | `Select`        |
| 단일 선택 (5개 이하 옵션)     | `RadioGroup`    |
| 다중 선택                     | `CheckboxGroup` |
| 단독 체크 (동의, 토글 등)     | `Checkbox`      |

> 선택지가 5개 이하일 때 `Select` 대신 `RadioGroup`을 권장합니다.

### 텍스트

| 상황               | 추천 컴포넌트                           |
| ------------------ | --------------------------------------- |
| 페이지·섹션 제목   | `Heading` (`level` prop으로 h1–h5 지정) |
| 본문·레이블 텍스트 | `Text`                                  |
| 입력 필드 레이블   | `Label`                                 |

### 액션·내비게이션

| 상황                    | 추천 컴포넌트 |
| ----------------------- | ------------- |
| 사용자 액션 유도 (클릭) | `Button`      |
| 페이지 이동·URL 연결    | `Link`        |
| 카테고리·상태 표시      | `Tag`         |

### 색조(tone) 사용 기준

| tone      | 용도                            |
| --------- | ------------------------------- |
| `brand`   | 주요 액션, 브랜드 강조 (기본값) |
| `neutral` | 일반 텍스트, 보조 요소          |
| `danger`  | 오류, 삭제, 위험 경고           |
| `success` | 성공, 완료                      |
| `warning` | 경고, 주의                      |
| `info`    | 정보 제공                       |

## 참고 문서

- [components.md](./components.md): 전체 컴포넌트 props 표
- [tokens.md](./tokens.md): 토큰 이름·값·용도 표
- [examples.md](./examples.md): 조합 예시
