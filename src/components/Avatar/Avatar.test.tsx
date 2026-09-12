import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Avatar } from "./Avatar";
import { getInitial } from "./getInitial";

/** 장식으로 두는 안쪽 이미지(alt="")와 아이콘은 접근성 트리에 없어 DOM에서 직접 찾습니다. */
function getImage(container: HTMLElement) {
  return container.querySelector("img");
}

function getFallbackIcon(container: HTMLElement) {
  return container.querySelector("svg");
}

describe("Avatar 이미지", () => {
  test("src가 있으면 이미지를 렌더링하고 name이 그 이름이 됨", () => {
    const { container } = render(<Avatar src="/dale.png" name="서달레" />);

    expect(screen.getByRole("img")).toHaveAccessibleName("서달레");
    expect(getImage(container)).toHaveAttribute("src", "/dale.png");
  });

  test("name이 없으면 이미지의 대체 텍스트가 비어 있음", () => {
    const { container } = render(<Avatar src="/dale.png" />);

    expect(getImage(container)).toHaveAttribute("alt", "");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("이미지 불러오기에 실패하면 이니셜로 대체됨", () => {
    const { container } = render(
      <Avatar src="/없는-이미지.png" name="서달레" />,
    );

    fireEvent.error(getImage(container)!);

    expect(getImage(container)).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "서달레" })).toHaveTextContent("서");
  });

  test("이미지 불러오기에 실패하고 name도 없으면 대체 아이콘으로 대체됨", () => {
    const { container } = render(<Avatar src="/없는-이미지.png" />);

    fireEvent.error(getImage(container)!);

    expect(getImage(container)).not.toBeInTheDocument();
    expect(getFallbackIcon(container)).toBeInTheDocument();
  });

  test("1px 테두리는 모든 표시 형태에 있어 안쪽 크기가 같고, 링은 이미지에만 보임", () => {
    render(<Avatar src="/dale.png" name="서달레" data-testid="image" />);
    render(<Avatar name="서달레" data-testid="initial" />);
    render(<Avatar data-testid="fallback" />);

    expect(screen.getByTestId("image")).toHaveClass("bd_brand");
    expect(screen.getByTestId("initial")).toHaveClass("bd_brand");
    expect(screen.getByTestId("fallback")).toHaveClass("bd_brand");

    expect(screen.getByTestId("image")).not.toHaveClass("bd-c_transparent");
    expect(screen.getByTestId("initial")).toHaveClass("bd-c_transparent");
    expect(screen.getByTestId("fallback")).toHaveClass("bd-c_transparent");
  });

  test("src가 바뀌면 실패했던 이미지와 무관하게 다시 시도함", () => {
    const { container, rerender } = render(
      <Avatar src="/실패.png" name="서달레" />,
    );

    fireEvent.error(getImage(container)!);
    expect(getImage(container)).not.toBeInTheDocument();

    rerender(<Avatar src="/성공.png" name="서달레" />);

    expect(getImage(container)).toHaveAttribute("src", "/성공.png");
  });
});

describe("Avatar 이니셜", () => {
  test("src가 없고 name이 있으면 이니셜을 보여줌", () => {
    render(<Avatar name="Dale Seo" />);

    expect(screen.getByRole("img", { name: "Dale Seo" })).toHaveTextContent(
      "DS",
    );
  });

  test("공백뿐인 name은 이니셜을 만들지 못해 대체 아이콘을 보여줌", () => {
    const { container } = render(<Avatar name="   " />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(getFallbackIcon(container)).toBeInTheDocument();
  });
});

describe("Avatar 대체 아이콘", () => {
  test("src와 name이 모두 없으면 아이콘으로 대체함", () => {
    const { container } = render(<Avatar data-testid="avatar" />);

    expect(getFallbackIcon(container)).toBeInTheDocument();
  });
});

describe("Avatar 접근성", () => {
  test("이미지에 이름이 있어도 이름이 한 번만 읽힘", () => {
    const { container } = render(
      <Avatar src="/dale.png" name="서달레" data-testid="avatar" />,
    );

    // 안쪽 <img>가 alt를 또 들고 있으면 같은 이름이 두 번 읽힙니다.
    expect(getImage(container)).toHaveAttribute("alt", "");
    expect(screen.getAllByRole("img")).toHaveLength(1);
    expect(screen.getByTestId("avatar")).toHaveAccessibleName("서달레");
  });

  test("이니셜은 축약된 글자가 아니라 전체 이름으로 읽힘", () => {
    render(<Avatar name="Dale Seo" />);

    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAccessibleName("Dale Seo");
    expect(avatar).toHaveTextContent("DS");
    expect(screen.queryByRole("img", { name: "DS" })).not.toBeInTheDocument();
  });

  test("이름이 없는 대체 아이콘은 접근성 트리에 아무것도 노출하지 않음", () => {
    render(<Avatar data-testid="avatar" />);

    // 아이콘 자체가 이미 가려져 있어 루트를 aria-hidden으로 덮지 않아도 읽히지 않습니다.
    // 루트를 덮으면 소비자가 이름을 붙일 수 없고, 포커스가 생기면 ARIA 위반이 됩니다.
    expect(screen.getByTestId("avatar")).not.toHaveAttribute("aria-hidden");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  test("대체 아이콘에 aria-label을 주면 그 이름으로 읽힘", () => {
    render(<Avatar aria-label="알 수 없는 사용자" />);

    expect(screen.getByRole("img")).toHaveAccessibleName("알 수 없는 사용자");
  });

  test("이름은 표시 형태와 상관없이 항상 바깥 span이 전달함", () => {
    render(<Avatar name="서달레" data-testid="initial" />);
    render(<Avatar src="/dale.png" name="서달레" data-testid="image" />);

    for (const id of ["initial", "image"]) {
      const outer = screen.getByTestId(id);
      expect(outer).toHaveAttribute("role", "img");
      expect(outer).toHaveAccessibleName("서달레");
    }
  });

  test("이름이 없으면 역할도 붙이지 않아 이름 없는 이미지가 되지 않음", () => {
    render(<Avatar data-testid="avatar" />);

    // role="img"만 남으면 스크린 리더가 이름 없는 이미지로 읽습니다.
    expect(screen.getByTestId("avatar")).not.toHaveAttribute("role");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("공백뿐인 name은 이름으로 쓰지 않음", () => {
    render(<Avatar name="   " data-testid="avatar" />);

    expect(screen.getByTestId("avatar")).not.toHaveAttribute("role");
    expect(screen.getByTestId("avatar")).not.toHaveAttribute("aria-label");
  });

  test("소비자가 레이블을 주면 바깥 span이 그 이름을 가짐", () => {
    render(
      <Avatar
        src="/dale.png"
        name="서달레"
        aria-label="작성자 서달레"
        data-testid="avatar"
      />,
    );

    // 바깥에 role="img"가 붙으면 ARIA 규칙상 자식은 보조기기에서 무시되지만,
    // Testing Library의 역할 질의는 그 규칙을 흉내내지 않으므로 여기서는
    // 이름이 바깥에 실렸다는 것까지만 확인합니다.
    expect(screen.getByTestId("avatar")).toHaveAccessibleName("작성자 서달레");
  });
});

describe("Avatar className", () => {
  test.each(["image", "initial", "fallback"] as const)(
    "%s 표시에서 전달한 className이 기본 스타일과 함께 적용됨",
    (variant) => {
      const props = {
        image: { src: "/dale.png" },
        initial: { name: "서달레" },
        fallback: {},
      }[variant];

      render(<Avatar {...props} className="my-class" data-testid="avatar" />);

      const avatar = screen.getByTestId("avatar");
      expect(avatar).toHaveClass("my-class");
      expect(avatar).toHaveClass("bdr_full");
      expect(avatar).toHaveClass("w_10");
    },
  );
});

describe("Avatar 크기", () => {
  test.each([
    ["sm", "w_8", "h_8"],
    ["md", "w_10", "h_10"],
    ["lg", "w_12", "h_12"],
  ] as const)("%s는 %s/%s 크기로 렌더링됨", (size, widthClass, heightClass) => {
    render(<Avatar name="서달레" size={size} data-testid="avatar" />);

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toHaveClass(widthClass);
    expect(avatar).toHaveClass(heightClass);
  });

  test("기본 크기는 md", () => {
    render(<Avatar name="서달레" data-testid="avatar" />);

    expect(screen.getByTestId("avatar")).toHaveClass("w_10");
  });
});

describe("getInitial", () => {
  test.each([
    ["서달레", "서"],
    ["서", "서"],
    ["서 달레", "서"],
    ["山田太郎", "山"],
    ["﨑田", "﨑"],
    ["𠀋田", "𠀋"],
    ["ﾀﾅｶ", "ﾀ"],
    ["さくら", "さ"],
    ["Dale Seo", "DS"],
    ["dale seo", "DS"],
    ["Dale  Seo", "DS"],
    ["  Dale Seo  ", "DS"],
    ["Dale Seo Kim", "DS"],
    ["dale", "DA"],
    ["D", "D"],
    ["", ""],
    ["   ", ""],
  ])('"%s"의 이니셜은 "%s"', (name, expected) => {
    expect(getInitial(name)).toBe(expected);
  });
});
