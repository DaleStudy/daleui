# daleui 토큰 레퍼런스

> 자동 생성 — 수동 편집하지 마세요.  
> `css()` 또는 Panda 스타일 속성에서 시맨틱 토큰 키를 사용한다. raw hex/px 금지.

## spacing

> margin, padding, gap, top, right, bottom, left, outlineOffset

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| 0 | 0rem | 간격·여백 |
| 2 | 0.125rem | 간격·여백 |
| 4 | 0.25rem | 간격·여백 |
| 8 | 0.5rem | 간격·여백 |
| 12 | 0.75rem | 간격·여백 |
| 16 | 1rem | 간격·여백 |
| 20 | 1.25rem | 간격·여백 |
| 24 | 1.5rem | 간격·여백 |
| 32 | 2rem | 간격·여백 |
| 36 | 2.25rem | 간격·여백 |
| 40 | 2.5rem | 간격·여백 |
| 48 | 3rem | 간격·여백 |

## radii

> borderRadius

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| xs | 0.125rem | 모서리 둥글기 |
| sm | 0.25rem | 모서리 둥글기 |
| md | 0.5rem | 모서리 둥글기 |
| lg | 1rem | 모서리 둥글기 |
| full | calc(infinity * 1px) | 원형(pill) |

## borderWidths

> borderWidth, outlineWidth

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| sm | 1px | 테두리·포커스 링 두께 |
| md | 1.5px | 테두리·포커스 링 두께 |
| lg | 2px | 테두리·포커스 링 두께 |

## borders

> tone별 border shorthand

| 토큰 | 용도 |
| --- | --- |
| neutral | neutral 톤 테두리 |
| brand | brand 톤 테두리 |
| danger | danger 톤 테두리 |
| success | success 톤 테두리 |
| warning | warning 톤 테두리 |
| info | info 톤 테두리 |

## semanticColors

> 다크모드 자동 대응. `css({ color: "fg.brand" })` 형태로 사용.

| 토큰 | light | dark | 용도 |
| --- | --- | --- | --- |
| appBg | {colors.white} | {colors.black} | 앱 전체 배경 |
| fgSolid.neutral | {colors.slate.1} | {colors.darkSage.1} | solid 배경 위 전경색 |
| fgSolid.brand | {colors.violet.1} | {colors.darkTeal.1} | solid 배경 위 전경색 |
| fgSolid.success | {colors.green.1} | {colors.darkGreen.1} | solid 배경 위 전경색 |
| fgSolid.warning | {colors.amber.12} | {colors.darkAmber.2} | solid 배경 위 전경색 |
| fgSolid.danger | {colors.red.1} | {colors.darkRed.2} | solid 배경 위 전경색 |
| fgSolid.info | {colors.blue.1} | {colors.darkBlue.2} | solid 배경 위 전경색 |
| bg.brand.DEFAULT | {colors.violet.2} | {colors.darkTeal.2} | 배경색 |
| bg.brand.hover | {colors.violet.3} | {colors.darkTeal.3} | 배경색 |
| bg.brand.active | {colors.violet.4} | {colors.darkTeal.4} | 배경색 |
| bg.neutral.DEFAULT | {colors.white} | {colors.darkSage.1} | 배경색 |
| bg.neutral.hover | {colors.slate.2} | {colors.darkSage.2} | 배경색 |
| bg.neutral.active | {colors.slate.3} | {colors.darkSage.3} | 배경색 |
| bg.neutral.disabled | {colors.slate.5} | {colors.darkSage.5} | 배경색 |
| bg.danger.DEFAULT | {colors.red.1} | {colors.darkRed.1} | 배경색 |
| bg.danger.hover | {colors.red.2} | {colors.darkRed.2} | 배경색 |
| bg.danger.active | {colors.red.3} | {colors.darkRed.3} | 배경색 |
| bg.success | {colors.green.1} | {colors.darkGreen.1} | 배경색 |
| bg.warning | {colors.amber.1} | {colors.darkAmber.1} | 배경색 |
| bg.info | {colors.blue.2} | {colors.darkBlue.3} | 배경색 |
| border.brand.DEFAULT | {colors.violet.8} | {colors.darkTeal.8} | 테두리·아웃라인 |
| border.brand.active | {colors.violet.9} | {colors.darkTeal.9} | 테두리·아웃라인 |
| border.brand.focus | {colors.violet.10} | {colors.darkTeal.10} | 테두리·아웃라인 |
| border.neutral.DEFAULT | {colors.slate.5} | {colors.darkSage.6} | 테두리·아웃라인 |
| border.neutral.hover | {colors.slate.6} | {colors.darkSage.7} | 테두리·아웃라인 |
| border.neutral.active | {colors.slate.7} | {colors.darkSage.8} | 테두리·아웃라인 |
| border.neutral.disabled | {colors.slate.6} | {colors.darkSage.7} | 테두리·아웃라인 |
| border.neutral.focus | {colors.slate.3} | {colors.darkSage.8} | 테두리·아웃라인 |
| border.success | {colors.green.8} | {colors.darkGreen.8} | 테두리·아웃라인 |
| border.warning | {colors.amber.7} | {colors.darkAmber.7} | 테두리·아웃라인 |
| border.danger | {colors.red.9} | {colors.darkRed.8} | 테두리·아웃라인 |
| border.info | {colors.blue.9} | {colors.darkBlue.9} | 테두리·아웃라인 |
| bgSolid.brand.DEFAULT | {colors.violet.9} | {colors.darkTeal.9} | solid 컴포넌트 배경 |
| bgSolid.brand.hover | {colors.violet.10} | {colors.darkTeal.10} | solid 컴포넌트 배경 |
| bgSolid.brand.active | {colors.violet.11} | {colors.darkTeal.11} | solid 컴포넌트 배경 |
| bgSolid.neutral.DEFAULT | {colors.slate.9} | {colors.darkSage.11} | solid 컴포넌트 배경 |
| bgSolid.neutral.hover | {colors.slate.10} | {colors.darkSage.12} | solid 컴포넌트 배경 |
| bgSolid.neutral.active | {colors.slate.11} | {colors.white} | solid 컴포넌트 배경 |
| bgSolid.neutral.disabled | {colors.slate.5} | {colors.darkSlate.6} | solid 컴포넌트 배경 |
| bgSolid.danger.DEFAULT | {colors.red.10} | {colors.darkRed.10} | solid 컴포넌트 배경 |
| bgSolid.danger.hover | {colors.red.11} | {colors.darkRed.11} | solid 컴포넌트 배경 |
| bgSolid.danger.active | {colors.red.12} | {colors.darkRed.12} | solid 컴포넌트 배경 |
| bgSolid.success.DEFAULT | {colors.green.10} | {colors.darkGreen.10} | solid 컴포넌트 배경 |
| bgSolid.success.hover | {colors.green.11} | {colors.darkGreen.11} | solid 컴포넌트 배경 |
| bgSolid.success.active | {colors.green.12} | {colors.darkGreen.12} | solid 컴포넌트 배경 |
| bgSolid.warning.DEFAULT | {colors.amber.9} | {colors.darkAmber.10} | solid 컴포넌트 배경 |
| bgSolid.warning.hover | {colors.amber.10} | {colors.darkAmber.11} | solid 컴포넌트 배경 |
| bgSolid.warning.active | {colors.amber.11} | {colors.darkAmber.12} | solid 컴포넌트 배경 |
| bgSolid.info.DEFAULT | {colors.blue.10} | {colors.darkBlue.10} | solid 컴포넌트 배경 |
| bgSolid.info.hover | {colors.blue.11} | {colors.darkBlue.11} | solid 컴포넌트 배경 |
| bgSolid.info.active | {colors.blue.12} | {colors.darkBlue.12} | solid 컴포넌트 배경 |
| fg.brand.DEFAULT | {colors.violet.9} | {colors.darkTeal.9} | 전경색 (텍스트·아이콘) |
| fg.brand.hover | {colors.violet.10} | {colors.darkTeal.10} | 전경색 (텍스트·아이콘) |
| fg.brand.active | {colors.violet.11} | {colors.darkTeal.11} | 전경색 (텍스트·아이콘) |
| fg.brand.visited | {colors.violet.12} | {colors.darkTeal.12} | 전경색 (텍스트·아이콘) |
| fg.neutral.DEFAULT | {colors.slate.9} | {colors.darkSage.11} | 전경색 (텍스트·아이콘) |
| fg.neutral.hover | {colors.slate.10} | {colors.darkSage.12} | 전경색 (텍스트·아이콘) |
| fg.neutral.active | {colors.slate.11} | {colors.white} | 전경색 (텍스트·아이콘) |
| fg.neutral.placeholder | {colors.slate.7} | {colors.darkSage.9} | 전경색 (텍스트·아이콘) |
| fg.neutral.disabled | {colors.slate.7} | {colors.darkSage.9} | 전경색 (텍스트·아이콘) |
| fg.success | {colors.green.11} | {colors.darkGreen.11} | 전경색 (텍스트·아이콘) |
| fg.warning | {colors.amber.11} | {colors.darkAmber.11} | 전경색 (텍스트·아이콘) |
| fg.danger | {colors.red.11} | {colors.darkRed.11} | 전경색 (텍스트·아이콘) |
| fg.info | {colors.blue.11} | {colors.darkBlue.11} | 전경색 (텍스트·아이콘) |

## fontSizes

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| xs | 0.75rem | fontSize |
| sm | 0.875rem | fontSize |
| md | 1rem | fontSize |
| lg | 1.125rem | fontSize |
| xl | 1.25rem | fontSize |
| 2xl | 1.5rem | fontSize |
| 3xl | 1.875rem | fontSize |
| 4xl | 2.25rem | fontSize |
| 5xl | 2.75rem | fontSize |

## fontWeights

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| normal | 400 | fontWeight |
| medium | 500 | fontWeight |
| semibold | 600 | fontWeight |
| bold | 700 | fontWeight |

## lineHeights

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| tight | 1.2 | lineHeight |
| balanced | 1.5 | lineHeight |

## letterSpacings

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| tight | -0.1 | letterSpacing |
| balanced | 0 | letterSpacing |

## icons

> `Icon` 컴포넌트 `name` prop에 사용.

| 이름 | 용도 |
| --- | --- |
| award | Icon name |
| check | Icon name |
| chevronDown | Icon name |
| chevronLeft | Icon name |
| chevronRight | Icon name |
| circleAlert | Icon name |
| clock | Icon name |
| codeXml | Icon name |
| externalLink | Icon name |
| eye | Icon name |
| eyeClosed | Icon name |
| eyeOff | Icon name |
| globe | Icon name |
| handHeart | Icon name |
| heartHandshake | Icon name |
| info | Icon name |
| kr | Icon name |
| loaderCircle | Icon name |
| menu | Icon name |
| messageCircle | Icon name |
| messageCircleMore | Icon name |
| moon | Icon name |
| search | Icon name |
| star | Icon name |
| sun | Icon name |
| thumbsUp | Icon name |
| user | Icon name |
| users | Icon name |
| x | Icon name |
| Discord | Icon name |
| GitHub | Icon name |
| LinkedIn | Icon name |
| Medium | Icon name |
| YouTube | Icon name |
| Storybook | Icon name |
| Figma | Icon name |
| GithubLight | Icon name |
| GithubDark | Icon name |
| LinkedInLight | Icon name |
| LinkedInDark | Icon name |
