import type { ReactNode } from "react";
import { css } from "../../styled-system/css";

// Storybook의 Typeset 블록은 fontFamily·fontSizes·fontWeight·sampleText만 반영한다.
// 행간을 1.2로 고정하고 샘플을 한 줄로 자르기 때문에 행간·자간·밑줄을 보여줄 수 없어
// 텍스트 스타일 견본은 textStyle 토큰을 그대로 적용해서 렌더한다.
// className이 정적으로 추출되도록 토큰 경로를 리터럴로 나열한다.
const textStyleClasses = {
  "display.lg": css({ textStyle: "display.lg" }),
  "display.md": css({ textStyle: "display.md" }),
  "display.sm": css({ textStyle: "display.sm" }),
  "title.lg": css({ textStyle: "title.lg" }),
  "title.md": css({ textStyle: "title.md" }),
  "title.sm": css({ textStyle: "title.sm" }),
  "heading.1": css({ textStyle: "heading.1" }),
  "heading.2": css({ textStyle: "heading.2" }),
  "heading.3": css({ textStyle: "heading.3" }),
  "heading.4": css({ textStyle: "heading.4" }),
  "heading.5": css({ textStyle: "heading.5" }),
  "body.lg": css({ textStyle: "body.lg" }),
  "body.md": css({ textStyle: "body.md" }),
  "body.sm": css({ textStyle: "body.sm" }),
  "label.lg": css({ textStyle: "label.lg" }),
  "label.lg.underline": css({ textStyle: "label.lg.underline" }),
  "label.md": css({ textStyle: "label.md" }),
  "label.md.underline": css({ textStyle: "label.md.underline" }),
  "label.md.strong": css({ textStyle: "label.md.strong" }),
  "label.sm": css({ textStyle: "label.sm" }),
  "label.sm.underline": css({ textStyle: "label.sm.underline" }),
  caption: css({ textStyle: "caption" }),
  code: css({ textStyle: "code" }),
};

export type TextStyleName = keyof typeof textStyleClasses;

interface TextStyleSpecimenProps {
  /** 견본으로 보여줄 텍스트 스타일 토큰 경로 */
  name: TextStyleName;
  /** 샘플 문장 */
  children?: ReactNode;
}

/** 텍스트 스타일 토큰을 실제로 적용한 견본입니다. */
export const TextStyleSpecimen = ({
  name,
  children = "누구든지 사용할 수 있는 Customizable Design System",
}: TextStyleSpecimenProps) => {
  // Storybook 문서의 타이포그래피 스타일은 레이어 밖에 있어 토큰 클래스를 덮어쓴다
  return (
    <div className="sb-unstyled">
      <p className={textStyleClasses[name]}>{children}</p>
    </div>
  );
};
