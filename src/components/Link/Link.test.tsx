import { test } from "vitest";

/** children이 올바르게 렌더링되는지 확인합니다. */
test("renders children correctly");

/** tone prop에 따라 올바른 톤이 적용되는지 확인합니다. */
test("applies the correct tone based on the 'tone' prop");

/** size prop에 따라 올바른 폰트 크기가 적용되는지 확인합니다. */
test("applies the correct font size based on the 'size' prop");

/** weight prop에 따라 올바른 폰트 굵기가 적용되는지 확인합니다. */
test("applies the correct font weight based on the 'weight' prop");

/** muted가 true일 때 명암비가 낮게 렌더링되는지 확인합니다. */
test("renders with reduced contrast when 'muted' is true");

/** underline이 true일 때 밑줄이 표시되는지 확인합니다. */
test("renders with underline when 'underline' is true");

/** href, target 등의 추가 anchor 속성이 정상적으로 전달되는지 확인합니다. */
test("forwards additional anchor props like 'href' and 'target'");

/** target이 '_blank'일 때 보안을 위해 rel="noopener noreferrer"가 자동으로 추가되는지 확인합니다. */
test("adds rel='noopener noreferrer' when target is '_blank'");

/** Icon 컴포넌트와 같이 사용할 수 있는지 확인합니다. */
test("can be used with Icon component");
