<p align="center">
  <img src="./public/newLogoWithText.svg" alt="달레 UI 로고" width="280" />
</p>

[![NPM Version](https://img.shields.io/npm/v/daleui)](https://www.npmjs.com/package/daleui)
[![Chromatic 🎨](https://github.com/DaleStudy/daleui/actions/workflows/chromatic.yml/badge.svg)](https://github.com/DaleStudy/daleui/actions/workflows/chromatic.yml)
[![Integration 🔀](https://github.com/DaleStudy/daleui/actions/workflows/integration.yml/badge.svg)](https://github.com/DaleStudy/daleui/actions/workflows/integration.yml)
[![codecov](https://codecov.io/github/DaleStudy/daleui/graph/badge.svg)](https://codecov.io/github/DaleStudy/daleui)
[![bundle size](https://codecov.io/github/DaleStudy/daleui/graph/bundle/daleui-bundle-esm/badge.svg)](https://app.codecov.io/github/DaleStudy/daleui/bundles/main/daleui-bundle-esm)
[![All Contributors](https://img.shields.io/github/all-contributors/DaleStudy/daleui?color=ee8449&style=flat-square)](#contributors)

# 달레 UI

🎨 달레 스터디의 디자인 시스템

## 핵심가치 (Core values)

- **모두를 위한 경험 설계** — 초보자부터 전문가까지 쉽게 채택할 수 있는 온보딩 경험
- **명확성과 투명성** — 기술적 개념과 의사결정 과정을 명확하고 투명하게 전달
- **일관성과 신뢰성** — 예측 가능하고 신뢰할 수 있는 컴포넌트와 패턴
- **한국어 사용자 중심 설계** — 한국어 타이포그래피와 문화적 맥락에 최적화
- **적응적 유연성** — 다양한 사용 시나리오에 맞는 유연한 아키텍처
- **커뮤니티 중심 발전** — 오픈소스 정신에 입각한 참여와 기여

## 문서 (Documentation)

- [스토리북](https://main--675790d317ba346348aa3490.chromatic.com)
- [위키](https://github.com/DaleStudy/daleui/wiki)

## 설치 (Installation)

React 프로젝트에서 다음 패키지 매니저 중 하나로 설치합니다.

```sh
# with Bun
$ bun add daleui

# with npm
$ npm install daleui

# with Yarn
$ yarn add daleui

# with pnpm
$ pnpm add daleui

```

앱 진입점(예: `main.tsx`, `App.tsx`)에서 스타일을 한 번에 불러옵니다.

```tsx
import "daleui/styles.css";
```

## Usage

```tsx
import { Button } from "daleui";

export default () => (
  <>
    <Button size="md" tone="brand" type="button" variant="solid">
      시작하기
    </Button>
    <TextInput placeholder="텍스트를 입력해주세요." />
  </>
);
```

## Contributors ✨

본 프로젝트는 [All Contributors](https://github.com/all-contributors/all-contributors) 관례에 따라 기여자분들의 공헌를 인정하고 감사를 표현하고 있습니다.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.daleseo.com/"><img src="https://avatars.githubusercontent.com/u/5466341?v=4?s=100" width="100px;" alt="Dale Seo"/><br /><sub><b>Dale Seo</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=DaleSeo" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=DaleSeo" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yolophg"><img src="https://avatars.githubusercontent.com/u/38199103?v=4?s=100" width="100px;" alt="Helena Park"/><br /><sub><b>Helena Park</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=yolophg" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=yolophg" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sounmind"><img src="https://avatars.githubusercontent.com/u/37020415?v=4?s=100" width="100px;" alt="Evan Suhyeong Lee"/><br /><sub><b>Evan Suhyeong Lee</b></sub></a><br /><a href="#blog-sounmind" title="Blogposts">📝</a> <a href="https://github.com/DaleStudy/daleui/commits?author=sounmind" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=sounmind" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hyoseong1994"><img src="https://avatars.githubusercontent.com/u/50227228?v=4?s=100" width="100px;" alt="hyoseong"/><br /><sub><b>hyoseong</b></sub></a><br /><a href="#blog-hyoseong1994" title="Blogposts">📝</a> <a href="https://github.com/DaleStudy/daleui/commits?author=hyoseong1994" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=hyoseong1994" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/RiaOh"><img src="https://avatars.githubusercontent.com/u/83909755?v=4?s=100" width="100px;" alt="오예림 Ria Oh"/><br /><sub><b>오예림 Ria Oh</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=RiaOh" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=RiaOh" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://velog.io/@hecklebot"><img src="https://avatars.githubusercontent.com/u/51806574?v=4?s=100" width="100px;" alt="Hansaem.so"/><br /><sub><b>Hansaem.so</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=Hecklebot" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=Hecklebot" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sseung30"><img src="https://avatars.githubusercontent.com/u/69985950?v=4?s=100" width="100px;" alt="seunghyun"/><br /><sub><b>seunghyun</b></sub></a><br /><a href="#design-sseung30" title="Design">🎨</a> <a href="https://github.com/DaleStudy/daleui/commits?author=sseung30" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jj5u"><img src="https://avatars.githubusercontent.com/u/89135410?v=4?s=100" width="100px;" alt="Jahye"/><br /><sub><b>Jahye</b></sub></a><br /><a href="#design-jj5u" title="Design">🎨</a> <a href="https://github.com/DaleStudy/daleui/commits?author=jj5u" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JJinuk"><img src="https://avatars.githubusercontent.com/u/74299463?v=4?s=100" width="100px;" alt="최진욱"/><br /><sub><b>최진욱</b></sub></a><br /><a href="#projectManagement-JJinuk" title="Project Management">📆</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ones-to-watch.ethansup.net/"><img src="https://avatars.githubusercontent.com/u/47362439?v=4?s=100" width="100px;" alt="Yunsup Sim(심윤섭)"/><br /><sub><b>Yunsup Sim(심윤섭)</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=SimYunSup" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=SimYunSup" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://seozi.io/"><img src="https://avatars.githubusercontent.com/u/30362922?v=4?s=100" width="100px;" alt="서진혁 (Aka)"/><br /><sub><b>서진혁 (Aka)</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=HowToBeAHappyBoy" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=HowToBeAHappyBoy" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/y00eunji"><img src="https://avatars.githubusercontent.com/u/27201591?v=4?s=100" width="100px;" alt="유은지"/><br /><sub><b>유은지</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=y00eunji" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=y00eunji" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lustellz"><img src="https://avatars.githubusercontent.com/u/45252527?v=4?s=100" width="100px;" alt="Tasha(살미)"/><br /><sub><b>Tasha(살미)</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=Lustellz" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=Lustellz" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/boldkang"><img src="https://avatars.githubusercontent.com/u/202710030?v=4?s=100" width="100px;" alt="mkang"/><br /><sub><b>mkang</b></sub></a><br /><a href="#blog-boldkang" title="Blogposts">📝</a> <a href="#design-boldkang" title="Design">🎨</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://sunjae95.github.io/"><img src="https://avatars.githubusercontent.com/u/63578094?v=4?s=100" width="100px;" alt="이선재"/><br /><sub><b>이선재</b></sub></a><br /><a href="#blog-Sunjae95" title="Blogposts">📝</a> <a href="https://github.com/DaleStudy/daleui/commits?author=Sunjae95" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=Sunjae95" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sehwanlee.dev/"><img src="https://avatars.githubusercontent.com/u/39740066?v=4?s=100" width="100px;" alt="Sehwan"/><br /><sub><b>Sehwan</b></sub></a><br /><a href="#blog-nhistory" title="Blogposts">📝</a> <a href="https://github.com/DaleStudy/daleui/commits?author=nhistory" title="Code">💻</a> <a href="https://github.com/DaleStudy/daleui/commits?author=nhistory" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bkidea"><img src="https://avatars.githubusercontent.com/u/201320266?v=4?s=100" width="100px;" alt="BK LEE"/><br /><sub><b>BK LEE</b></sub></a><br /><a href="#design-bkidea" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/graycrisp"><img src="https://avatars.githubusercontent.com/u/51190669?v=4?s=100" width="100px;" alt="graycrisp"/><br /><sub><b>graycrisp</b></sub></a><br /><a href="#design-graycrisp" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lylamin.com/"><img src="https://avatars.githubusercontent.com/u/50537876?v=4?s=100" width="100px;" alt="Lyla (Minju) Park"/><br /><sub><b>Lyla (Minju) Park</b></sub></a><br /><a href="https://github.com/DaleStudy/daleui/commits?author=lylaminju" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 후원하기 💖

달레 UI가 여러분 프로젝트의 도움이 된다면, 후원을 고려해주세요.

<p align="center">
  <a href="https://github.com/sponsors/DaleStudy">
    <img src="./sponsorkit/sponsors.svg" alt="Sponsors" />
  </a>
</p>

### 왜 후원해야 하나요?

- 활발한 개발 유지
- 후원자를 위한 우선 지원
- 로드맵 및 기능에 영향력 행사
- 무료 오픈소스 유지 지원

### 다른 도움 방법

- ⭐ 리포지토리에 Star 주기
- 🐛 버그 리포트
- 💡 기능 제안
- 📝 코드 기여
