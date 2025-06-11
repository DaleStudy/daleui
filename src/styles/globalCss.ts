import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  ":root": {
    "--global-font-body": "var(--fonts-sans)",
  },
  body: {
    backgroundColor: "bg.neutral.default",
    color: "fg.neutral.default",
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
