import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  ":root": {
    "--global-font-body": "var(--fonts-sans)",
    // 달레 브랜드 그라데이션 (청록 -> 보라). 브랜드 마크(</> 로고)와 동일하게 청록(teal.9)과
    // 보라(violet.9) 브랜드 폴을 고정값으로 사용하므로 라이트/다크 테마에서 동일합니다.
    "--gradient-brand":
      "linear-gradient(135deg, var(--colors-teal-9), var(--colors-violet-9))",
  },
  body: {
    backgroundColor: "appBg",
    color: "fg.neutral",
  },
  h1: {
    fontSize: "var(--font-sizes-4xl)", // 2.25rem
    lineHeight: "var(--line-heights-loose)", // 2
    fontWeight: "var(--font-weights-bold)", // 700
  },
  h2: {
    fontSize: "var(--font-sizes-3xl)", // 1.875rem
    lineHeight: "var(--line-heights-loose)", // 2
    fontWeight: "var(--font-weights-bold)", // 500
  },
  h3: {
    fontSize: "var(--font-sizes-2xl)", // 1.5rem
    lineHeight: "var(--line-heights-relaxed)", // 1.625
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h4: {
    fontSize: "var(--font-sizes-xl)", // 1.25rem
    lineHeight: "var(--line-heights-relaxed)", // 1.625
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h5: {
    fontSize: "var(--font-sizes-lg)", // 1.125rem
    lineHeight: "var(--line-heights-relaxed)", // 1.625
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h6: {
    fontSize: "var(--font-sizes-md)", // 1rem
    lineHeight: "var(--line-heights-relaxed)", // 1.625
    fontWeight: "var(--font-weights-medium)", // 500
  },
  p: {
    fontSize: "var(--font-sizes-md)", // 1rem
    lineHeight: "var(--line-heights-relaxed)", // 1.625
    fontWeight: "var(--font-weights-normal)", // 400
  },
});
