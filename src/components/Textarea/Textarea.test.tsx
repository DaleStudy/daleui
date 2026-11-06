import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  test("textarea 요소로 렌더링된다", () => {
    render(<Textarea placeholder="내용을 입력해주세요." />);
    expect(screen.getByRole("textbox")).toBeInstanceOf(HTMLTextAreaElement);
  });

  test("사용자가 여러 줄을 입력하면 값이 바뀌고 onChange가 호출된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    await user.type(textarea, "첫 줄{Enter}둘째 줄");

    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue("첫 줄\n둘째 줄");
  });

  test("disabled이면 비활성화되어 입력되지 않는다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea disabled onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
    await user.type(textarea, "테스트");
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("readOnly이면 readonly 속성이 설정되고 값이 바뀌지 않는다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea defaultValue="고정값" readOnly onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
    await user.type(textarea, "추가");
    expect(textarea).toHaveValue("고정값");
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("disabled와 readOnly가 모두 true면 disabled가 우선한다", () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Textarea disabled readOnly />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeDisabled();
    expect(textarea).not.toHaveAttribute("readonly");
    vi.restoreAllMocks();
  });

  test("invalid와 required가 aria 속성에 반영된다", () => {
    render(<Textarea invalid required />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAttribute("aria-required", "true");
  });

  test("ref가 내부 textarea 요소로 전달된다", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  test("defaultValue와 value가 모두 있으면 value가 우선한다", () => {
    render(
      <Textarea defaultValue="초기값" value="제어값" onChange={vi.fn()} />,
    );
    expect(screen.getByRole("textbox")).toHaveValue("제어값");
  });

  test("rows를 넘기지 않으면 기본 3줄로 렌더링된다", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
  });
});

describe("Textarea 레이블", () => {
  test("label이 있으면 레이블을 렌더링하고 textarea와 연결한다", () => {
    render(<Textarea label="의견" />);
    expect(screen.getByLabelText("의견")).toBeInstanceOf(HTMLTextAreaElement);
  });

  test("label을 클릭하면 textarea에 포커스가 이동한다", async () => {
    const user = userEvent.setup();
    render(<Textarea label="의견" />);

    await user.click(screen.getByText("의견"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  test("label 없이 aria-labelledby로 외부 제목과 연결할 수 있다", () => {
    render(
      <>
        <h3 id="question">가장 좋았던 점은 무엇인가요?</h3>
        <Textarea aria-labelledby="question" />
      </>,
    );
    expect(
      screen.getByRole("textbox", { name: "가장 좋았던 점은 무엇인가요?" }),
    ).toBeInTheDocument();
  });

  test("label + required이면 * 표시가 렌더링된다", () => {
    render(<Textarea label="의견" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });
});

describe("Textarea 하단 문구", () => {
  test("helperText가 있으면 표시하고 aria-describedby로 연결한다", () => {
    render(<Textarea helperText="100자 이내로 적어주세요." />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "100자 이내로 적어주세요.",
    );
  });

  test("invalid이면 helperText 대신 errorMessage를 표시한다", () => {
    render(
      <Textarea
        invalid
        helperText="도움말"
        errorMessage="내용을 입력해주세요."
      />,
    );
    expect(screen.queryByText("도움말")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "내용을 입력해주세요.",
    );
  });

  test("외부에서 넘긴 aria-describedby와 helperText를 함께 연결한다", () => {
    render(
      <>
        <p id="extra">추가 설명</p>
        <Textarea aria-describedby="extra" helperText="도움말" />
      </>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
      "추가 설명 도움말",
    );
  });
});

describe("Textarea 글자 수 카운터", () => {
  test("showCount가 없으면 카운터를 표시하지 않는다", () => {
    render(<Textarea maxLength={100} />);
    expect(screen.queryByText("0 / 100")).not.toBeInTheDocument();
  });

  test("비제어 모드에서 입력하면 카운터가 갱신된다", async () => {
    const user = userEvent.setup();
    render(<Textarea showCount maxLength={100} defaultValue="안녕" />);

    expect(screen.getByText("2 / 100")).toBeInTheDocument();

    await user.type(screen.getByRole("textbox"), "하세요");
    expect(screen.getByText("5 / 100")).toBeInTheDocument();
  });

  test("제어 모드에서는 value 길이를 카운터에 표시한다", async () => {
    const user = userEvent.setup();
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <Textarea
          showCount
          maxLength={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }
    render(<Controlled />);

    await user.type(screen.getByRole("textbox"), "abc");
    expect(screen.getByText("3 / 10")).toBeInTheDocument();
  });

  test("maxLength를 넘겨 입력할 수 없다", async () => {
    const user = userEvent.setup();
    render(<Textarea showCount maxLength={3} />);

    await user.type(screen.getByRole("textbox"), "abcdef");
    expect(screen.getByRole("textbox")).toHaveValue("abc");
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  test("maxLength 없이 showCount만 있으면 현재 글자 수만 표시한다", () => {
    render(<Textarea showCount defaultValue="abc" />);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("helperText와 카운터를 함께 표시한다", () => {
    render(<Textarea showCount maxLength={100} helperText="도움말" />);
    expect(screen.getByText("도움말")).toBeInTheDocument();
    expect(screen.getByText("0 / 100")).toBeInTheDocument();
  });
});
