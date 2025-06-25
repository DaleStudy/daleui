import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react-vite";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Link.stories";

const { Basic, Tones, Contrasts, Underlines, Security, WithIcon } =
  composeStories(stories);

describe("렌더링 테스트", () => {
  test("텍스트와 함께 링크를 렌더링한다", () => {
    render(<Basic />);
    expect(screen.getByRole("link")).toHaveTextContent("링크");
  });

  test("Icon 컴포넌트와 함께 잘 사용한다", () => {
    render(<WithIcon />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("링크");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });
});

describe("스타일 테스트", () => {
  test.each([
    ["중립 링크", "c_fg.neutral"],
    ["브랜드 링크", "c_fg.brand"],
    ["위험 링크", "c_fg.danger"],
    ["경고 링크", "c_fg.warning"],
    ["성공 링크", "c_fg.success"],
    ["정보 링크", "c_fg.info"],
  ] as const)("%s에 올바른 톤 클래스를 적용한다", (linkName, className) => {
    render(<Tones />);

    expect(screen.getByRole("link", { name: linkName })).toHaveClass(className);
  });

  test("size prop에 따라 font size를 적용한다", () => {
    const size = faker.helpers.arrayElement(
      Object.keys(fontSizes),
    ) as keyof typeof fontSizes;

    render(<Basic size={size} />);
    expect(screen.getByRole("link")).toHaveStyle({ fontSize: size });
  });

  test("weight prop에 따라 font weight을 적용한다", () => {
    const weight = faker.helpers.arrayElement(
      Object.keys(fontWeights),
    ) as keyof typeof fontWeights;

    render(<Basic weight={weight} />);
    expect(screen.getByRole("link")).toHaveClass(`fw_${weight}`);
  });

  test.each([
    ["낮은 명암비", "c_fg.neutral.placeholder"],
    ["높은 명암비", "c_fg.neutral"],
  ] as const)("%s에 대해 올바른 클래스를 적용한다", (linkName, className) => {
    render(<Contrasts />);

    expect(screen.getByRole("link", { name: linkName })).toHaveClass(className);
  });

  test.each([
    ["밑줄 있음", "td_underline"],
    ["밑줄 없음", "td_none"],
  ] as const)(
    "%s에 대해 올바른 밑줄 스타일을 적용한다",
    (linkName, className) => {
      render(<Underlines />);

      expect(screen.getByRole("link", { name: linkName })).toHaveClass(
        className,
      );
    },
  );
});

describe("동작 테스트", () => {
  test.each([
    ["href", faker.internet.url({ appendSlash: true })],
    ["target", "_self"],
  ] as const)("%s 속성을 올바르게 전달한다", (attribute, value) => {
    const props = { [attribute]: value };
    render(<Basic {...props} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(attribute, value);
  });

  test.each([
    ["새 탭에서 열기 (보안 속성 자동 추가)", "noopener noreferrer"],
    ["같은 탭에서 열기", null],
  ] as const)(
    "%s 링크의 rel 속성을 올바르게 설정한다",
    (linkName, expectedRel) => {
      render(<Security />);

      const link = screen.getByRole("link", { name: linkName });
      if (expectedRel) {
        expect(link).toHaveAttribute("rel", expectedRel);
      } else {
        expect(link).not.toHaveAttribute("rel", "noopener noreferrer");
      }
    },
  );

  test("클릭 시, 해당 URL로 올바르게 이동한다", async () => {
    const user = userEvent.setup();
    const href = faker.internet.url({ appendSlash: true });
    render(<Basic href={href} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
    await user.click(link);

    expect(window.location.href).toBe(href);
  });

  test("click 이벤트를 올바르게 처리한다", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Basic href="#" onClick={handleClick} />);

    const link = screen.getByRole("link");
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("키보드로 link에 포커스한다", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Basic href={href} />);

    await user.tab();
    const link = screen.getByRole("link");

    expect(link).toHaveFocus();
  });

  test("키보드로 link를 클릭 시, 해당 href로 올바르게 이동한다", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Basic href={href} />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(window.location.href).toBe(href);
  });
});
