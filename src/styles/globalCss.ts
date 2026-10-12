import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  ":root": {
    "--global-font-body": "var(--fonts-sans)",
  },
  body: {
    backgroundColor: "appBg",
    color: "fg.neutral",
  },
  // 제목 행간은 textStyles.heading.*·Figma와 같은 tight(1.2)를 쓴다.
  // 넓은 행간이 필요한 쪽은 네모꼴 한글이 밀집하는 본문이고, 제목에는 해당하지 않는다.
  h1: {
    fontSize: "var(--font-sizes-4xl)", // 2.25rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-bold)", // 700
  },
  h2: {
    fontSize: "var(--font-sizes-3xl)", // 1.875rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-bold)", // 700
  },
  h3: {
    fontSize: "var(--font-sizes-2xl)", // 1.5rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h4: {
    fontSize: "var(--font-sizes-xl)", // 1.25rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h5: {
    fontSize: "var(--font-sizes-lg)", // 1.125rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-medium)", // 500
  },
  h6: {
    fontSize: "var(--font-sizes-md)", // 1rem
    lineHeight: "var(--line-heights-tight)", // 1.2
    fontWeight: "var(--font-weights-medium)", // 500
  },
  p: {
    fontSize: "var(--font-sizes-md)", // 1rem
    lineHeight: "var(--line-heights-relaxed)", // 1.7
    fontWeight: "var(--font-weights-normal)", // 400
  },
});
