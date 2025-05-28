import { faker } from "@faker-js/faker";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { fontSizes, fontWeights } from "../../tokens/typography";
import * as stories from "./Link.stories";

const { Basic, Tones, Contrasts, Underlines, Security, WithIcon } =
  composeStories(stories);

describe("rendering test", () => {
  test("텍스트와 함께 링크가 올바르게 렌더링됨", () => {
    render(<Basic />);
    expect(screen.getByRole("link")).toHaveTextContent("링크");
  });

  test("Icon 컴포넌트와 함께 잘 사용 되어짐", () => {
    render(<WithIcon />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("링크");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });
});

describe("style test", () => {
  test("tone prop에 따라 tone이 올바르게 적용됨", () => {
    render(<Tones />);

    expect(screen.getByRole("link", { name: "중립 링크" })).toHaveClass(
      "c_text",
    );
    expect(screen.getByRole("link", { name: "강조 링크" })).toHaveClass(
      "c_text.accent",
    );
    expect(screen.getByRole("link", { name: "위험 링크" })).toHaveClass(
      "c_text.danger",
    );
    expect(screen.getByRole("link", { name: "경고 링크" })).toHaveClass(
      "c_text.warning",
    );
  });

  test("size prop에 따라 font size가 올바르게 적용됨", () => {
    const size = faker.helpers.arrayElement(
      Object.keys(fontSizes),
    ) as keyof typeof fontSizes;

    render(<Basic size={size} />);
    expect(screen.getByRole("link")).toHaveStyle({ fontSize: size });
  });

  test("weight prop에 따라 font weight이 올바르게 적용됨", () => {
    const weight = faker.helpers.arrayElement(
      Object.keys(fontWeights),
    ) as keyof typeof fontWeights;

    render(<Basic weight={weight} />);
    expect(screen.getByRole("link")).toHaveClass(`fw_${weight}`);
  });

  test("낮은 명암비와 높은 명암비에 따라 스타일이 올바르게 적용됨", () => {
    render(<Contrasts />);

    expect(screen.getByRole("link", { name: "낮은 명암비" })).toHaveClass(
      "c_text.muted",
    );

    expect(screen.getByRole("link", { name: "높은 명암비" })).toHaveClass(
      "c_text",
    );
  });

  test("밑줄 스타일이 올바르게 적용됨", () => {
    render(<Underlines />);

    expect(screen.getByRole("link", { name: "밑줄 있음" })).toHaveClass(
      "td_underline",
    );
    expect(screen.getByRole("link", { name: "밑줄 없음" })).toHaveClass(
      "td_none",
    );
  });
});

describe("behavior test", () => {
  test("'href'와 'target'같은 추가 anchor 속성이 전달됨", () => {
    const href = faker.internet.url({ appendSlash: true });
    const target = "_self";

    render(<Basic href={href} target={target} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("target", target);
  });

  test("target 속성이 '_blank'일 경우, rel='noopener noreferrer이 추가됨", () => {
    render(<Security />);

    expect(
      screen.getByRole("link", {
        name: "새 탭에서 열기 (보안 속성 자동 추가)",
      }),
    ).toHaveAttribute("rel", "noopener noreferrer");

    expect(
      screen.getByRole("link", { name: "같은 탭에서 열기" }),
    ).not.toHaveAttribute("rel", "noopener noreferrer");
  });

  test("클릭 시, 해당 URL로 올바르게 잘 이동됨", async () => {
    const user = userEvent.setup();
    const href = faker.internet.url({ appendSlash: true });
    render(<Basic href={href} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
    await user.click(link);

    expect(window.location.href).toBe(href);
  });

  test("click 이벤트가 올바르게 처리됨", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Basic href="#" onClick={handleClick} />);

    const link = screen.getByRole("link");
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("키보드로 link에 포커스가 잘 됨", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Basic href={href} />);

    await user.tab();
    const link = screen.getByRole("link");

    expect(link).toHaveFocus();
  });

  test("키보드로 link를 클릭 시, 해당 href로 올바르게 이동됨", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Basic href={href} />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(window.location.href).toBe(href);
  });
});
