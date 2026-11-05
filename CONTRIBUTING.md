# 기여 가이드

DaleUI에 기여하고 싶으신가요? 여러분의 기여를 환영합니다!

자세한 기여 가이드는 [위키 기여 페이지](https://github.com/DaleStudy/daleui/wiki/Contributing)를 참고해주세요.

## 시각적 회귀 테스트

Chromatic은 TurboSnap으로 변경된 스토리만 촬영합니다. Panda CSS가 생성하는
공통 스타일은 스토리의 모듈 의존성만으로 영향을 추적할 수 없으므로,
`chromatic.config.json`의 `externals`에 지정한 토큰·스타일·설정 파일이 바뀌면
전체 스토리를 다시 촬영합니다. Chromatic 설정 자체도 포함해 설정 변경 시
이전 스냅샷을 재사용하지 않도록 합니다.

공통 CSS 생성에 영향을 주는 파일을 추가할 때는 `externals`와
`.github/workflows/chromatic.yml`, `.github/labeler.yml`의 UI 경로도 함께 확인해주세요.
전체 재촬영은 기준 이미지의 자동 승인이 아닙니다. 차이가 의도된 변경인지
확인한 뒤 Chromatic에서 승인해주세요.

자세한 내용은 [Chromatic의 외부 파일 변경 감지 문서](https://www.chromatic.com/docs/turbosnap/setup/#specify-external-files-to-trigger-a-full-re-test-when-they-change)를 참고해주세요.
