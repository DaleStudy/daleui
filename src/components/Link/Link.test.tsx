import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Link } from "./Link";
import { Icon } from "../Icon/Icon";

describe("렌더링 테스트", () => {
  test("텍스트와 함께 링크를 렌더링한다", () => {
    render(<Link href="#">링크</Link>);
    expect(screen.getByRole("link")).toHaveTextContent("링크");
  });
});

describe("스타일 테스트", () => {
  test.each([
    ["중립 링크", "c_fg.neutral"],
    ["브랜드 링크", "c_fg.brand"],
  ] as const)("%s에 올바른 톤 클래스를 적용한다", (linkName, className) => {
    render(
      <>
        <Link href="#" tone="neutral">
          중립 링크
        </Link>
        <Link href="#" tone="brand">
          브랜드 링크
        </Link>
      </>,
    );

    expect(screen.getByRole("link", { name: linkName })).toHaveClass(className);
  });

  test.each([
    ["작은 링크", "fs_sm"],
    ["중간 링크", "fs_md"],
    ["큰 링크", "fs_lg"],
  ] as const)(
    "%s에 대해 올바른 font size를 적용한다",
    (linkName, className) => {
      render(
        <>
          <Link href="#" size="sm">
            작은 링크
          </Link>
          <Link href="#" size="md">
            중간 링크
          </Link>
          <Link href="#" size="lg">
            큰 링크
          </Link>
        </>,
      );

      expect(screen.getByRole("link", { name: linkName })).toHaveClass(
        className,
      );
    },
  );

  test.each([
    ["밑줄 있음", "td_underline"],
    ["밑줄 없음", "td_none"],
  ] as const)(
    "%s에 대해 올바른 밑줄 스타일을 적용한다",
    (linkName, className) => {
      render(
        <>
          <Link href="#" underline>
            밑줄 있음
          </Link>
          <Link href="#" underline={false}>
            밑줄 없음
          </Link>
        </>,
      );

      expect(screen.getByRole("link", { name: linkName })).toHaveClass(
        className,
      );
    },
  );

  test("아이콘이 올바르게 렌더링된다", () => {
    render(
      <Link aria-label="아이콘 있음" href="#">
        아이콘 있음
        <Icon name="externalLink" size="md" role="img" />
      </Link>,
    );
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});

describe("동작 테스트", () => {
  test.each([
    ["href", faker.internet.url({ appendSlash: true })],
    ["target", "_self"],
  ] as const)("%s 속성을 올바르게 전달한다", (attribute, value) => {
    const props = { href: "#", [attribute]: value };
    render(<Link {...props}>링크</Link>);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(attribute, value);
  });

  test.each([
    ["새 탭에서 열기 (보안 속성 자동 추가)", "noopener noreferrer"],
    ["같은 탭에서 열기", null],
  ] as const)(
    "%s 링크의 rel 속성을 올바르게 설정한다",
    (linkName, expectedRel) => {
      render(
        <>
          <Link href="#" external>
            새 탭에서 열기 (보안 속성 자동 추가)
          </Link>
          <Link href="#">같은 탭에서 열기</Link>
        </>,
      );

      const link = screen.getByRole("link", { name: linkName });
      if (expectedRel) {
        expect(link).toHaveAttribute("rel", expectedRel);
      } else {
        expect(link).not.toHaveAttribute("rel", "noopener noreferrer");
      }
    },
  );

  test("새탭에서 열면서 rel 속성을 주입시 올바르게 병합된다", () => {
    render(
      <Link href="#" external rel="noopener noreferrer">
        새 탭에서 열기 (보안 속성 자동 추가)
      </Link>,
    );
    const link = screen.getByRole("link", {
      name: "새 탭에서 열기 (보안 속성 자동 추가)",
    });
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("aria-label 속성을 올바르게 전달한다", () => {
    render(
      <Link href="#" aria-label="링크">
        링크
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "링크");
  });

  test("클릭 시, 해당 URL로 올바르게 이동한다", async () => {
    const user = userEvent.setup();
    const href = faker.internet.url({ appendSlash: true });
    render(<Link href={href}>링크</Link>);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", href);
    await user.click(link);

    expect(window.location.href).toBe(href);
  });

  test("click 이벤트를 올바르게 처리한다", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Link href="#" onClick={handleClick}>
        링크
      </Link>,
    );

    const link = screen.getByRole("link");
    await user.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("키보드로 link에 포커스한다", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Link href={href}>링크</Link>);

    await user.tab();
    const link = screen.getByRole("link");

    expect(link).toHaveFocus();
  });

  test("키보드로 link를 클릭 시, 해당 href로 올바르게 이동한다", async () => {
    const href = faker.internet.url({ appendSlash: true });
    const user = userEvent.setup();
    render(<Link href={href}>링크</Link>);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(window.location.href).toBe(href);
  });
});
