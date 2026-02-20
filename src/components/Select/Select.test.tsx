import { createRef, useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Select } from "./Select";

describe("렌더링", () => {
  test("기본 구조로 올바르게 렌더링한다", () => {
    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    // native select는 placeholder를 지원하지 않아 getByText로 테스트
    expect(screen.getByText("라이브러리를 선택하세요")).toBeInTheDocument();
  });

  test("defaultValue가 제공되면 해당 값을 선택한다", () => {
    render(
      <Select defaultValue="vue" placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    expect(select.value).toBe("vue");
  });

  test('value가 "" 일 때 placeholder가 표시된다', () => {
    render(
      <Select
        value=""
        onChange={() => {}}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByText("라이브러리를 선택하세요")).toBeInTheDocument();
  });

  test("disabled가 true일 때 선택이 비활성화된다", () => {
    render(
      <Select disabled placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });

  test("clearButtonName이 제공되고 값이 선택되어 있을 때 clear 버튼이 표시된다", () => {
    render(
      <Select
        value="react"
        clearButtonName="clear"
        onChange={() => {}}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.getByRole("button", {
      name: "clear",
    });
    expect(clearButton).toBeInTheDocument();
  });

  test("clearButtonName이 없을 때 clear 버튼이 표시되지 않는다", () => {
    render(
      <Select
        value="react"
        onChange={() => {}}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });
    expect(clearButton).not.toBeInTheDocument();
  });

  test("clearButtonName이 제공되어도 값이 없을 때 clear 버튼이 표시되지 않는다", () => {
    render(
      <Select clearButtonName="clear" placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });
    expect(clearButton).not.toBeInTheDocument();
  });
});

describe("사용자 액션", () => {
  test("옵션을 선택하면 선택된 값이 표시된다", async () => {
    const user = userEvent.setup();

    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    await user.selectOptions(select, "react");

    expect(select.value).toBe("react");
  });

  test("옵션 선택 시 onChange를 호출한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select onChange={handleChange} placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "react");

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "react" }),
      }),
    );
  });

  test("disabled가 true일 때 사용자 액션이 차단된다", () => {
    const handleChange = vi.fn();

    render(
      <Select
        disabled
        onChange={handleChange}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("여러 옵션을 순차적으로 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");

    await user.selectOptions(select, "react");
    expect(select.value).toBe("react");

    await user.selectOptions(select, "vue");
    expect(select.value).toBe("vue");
  });

  test("clear 버튼을 클릭하면 값이 초기화된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select
        value="react"
        clearButtonName="clear"
        onChange={handleChange}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.getByRole("button", {
      name: "clear",
    });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "" }),
      }),
    );
  });

  test("clear 버튼 클릭 시 placeholder가 다시 표시된다", async () => {
    const user = userEvent.setup();

    const ControlledSelectTest = () => {
      const [selectedValue, setSelectedValue] = useState<string>("react");

      return (
        <Select
          value={selectedValue}
          clearButtonName="clear"
          onChange={(e) => {
            setSelectedValue(e.target.value);
          }}
          placeholder="라이브러리를 선택하세요"
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </Select>
      );
    };

    render(<ControlledSelectTest />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    expect(select.value).toBe("react");

    const clearButton = screen.getByRole("button", {
      name: "clear",
    });
    await user.click(clearButton);

    await waitFor(() => {
      expect(select.value).toBe("");
    });
    expect(screen.getByText("라이브러리를 선택하세요")).toBeInTheDocument();
  });

  test("disabled 상태일 때 clear 버튼이 작동하지 않는다", () => {
    const handleChange = vi.fn();

    render(
      <Select
        value="react"
        clearButtonName="clear"
        disabled
        onChange={handleChange}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });

    expect(clearButton).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("required일 때도 clear 버튼이 작동한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select
        value="react"
        clearButtonName="clear"
        required
        onChange={handleChange}
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    const clearButton = screen.getByRole("button", {
      name: "clear",
    });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "" }),
      }),
    );
  });
});

describe("상태 관리", () => {
  test("제어 모드에서 정상적으로 동작한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const ControlledSelectTest = () => {
      const [selectedValue, setSelectedValue] = useState<string>("react");

      return (
        <Select
          value={selectedValue}
          onChange={(e) => {
            handleChange(e.target.value);
            setSelectedValue(e.target.value);
          }}
          placeholder="라이브러리를 선택하세요"
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
          <option value="svelte">Svelte</option>
        </Select>
      );
    };

    render(<ControlledSelectTest />);

    const select: HTMLSelectElement = screen.getByRole("combobox");
    expect(select.value).toBe("react");

    await user.selectOptions(select, "vue");

    expect(handleChange).toHaveBeenCalledWith("vue");
    expect(select.value).toBe("vue");
  });

  test("비제어 모드에서 정상적으로 동작한다", async () => {
    const user = userEvent.setup();

    render(
      <Select defaultValue="react" placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    expect(select.value).toBe("react");

    await user.selectOptions(select, "vue");

    expect(select.value).toBe("vue");
  });

  test("여러 Select 인스턴스가 독립적으로 동작한다", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Select
          defaultValue="react"
          placeholder="첫 번째 선택"
          aria-label="첫 번째 선택"
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </Select>
        <Select
          defaultValue="svelte"
          placeholder="두 번째 선택"
          aria-label="두 번째 선택"
        >
          <option value="svelte">Svelte</option>
          <option value="vue">Vue</option>
        </Select>
      </>,
    );

    const select1: HTMLSelectElement = screen.getByRole("combobox", {
      name: "첫 번째 선택",
    });
    const select2: HTMLSelectElement = screen.getByRole("combobox", {
      name: "두 번째 선택",
    });

    expect(select1.value).toBe("react");
    expect(select2.value).toBe("svelte");

    await user.selectOptions(select1, "vue");

    expect(select1.value).toBe("vue");
    expect(select2.value).toBe("svelte");
  });
});

describe("접근성 및 기타", () => {
  test("invalid prop이 없을 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  test("invalid가 true일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(
      <Select invalid placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("invalid가 false일 때 aria-invalid 속성이 올바르게 설정된다", () => {
    render(
      <Select invalid={false} placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  test("required prop이 없을 때 aria-required 속성이 올바르게 설정된다", () => {
    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-required",
      "false",
    );
  });

  test("required가 true일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(
      <Select required placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-required",
      "true",
    );
  });

  test("required가 false일 때 aria-required 속성이 올바르게 설정된다", () => {
    render(
      <Select required={false} placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-required",
      "false",
    );
  });

  test("disabled 옵션이 있을 때 해당 옵션은 disabled 속성을 가진다", () => {
    render(
      <Select placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
        <option value="vue" disabled>
          Vue
        </option>
        <option value="svelte">Svelte</option>
      </Select>,
    );

    const select: HTMLSelectElement = screen.getByRole("combobox");
    const vueOption = Array.from(select.options).find(
      (opt) => opt.value === "vue",
    );
    expect(vueOption).toBeDefined();
    expect(vueOption?.disabled).toBe(true);
  });

  test("name이 제공되면 form 제출 시 올바른 값이 전달된다", () => {
    const formData = new FormData();
    const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formData.append("framework", e.currentTarget.framework.value);
    });

    render(
      <form onSubmit={handleSubmit}>
        <Select
          name="framework"
          defaultValue="react"
          placeholder="라이브러리를 선택하세요"
        >
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </Select>
        <button type="submit">제출</button>
      </form>,
    );

    const submitButton = screen.getByRole("button", { name: "제출" });
    submitButton.click();

    expect(handleSubmit).toHaveBeenCalled();
    expect(formData.get("framework")).toBe("react");
  });

  test("ref가 내부 select 엘리먼트로 전달되어야 한다", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} placeholder="라이브러리를 선택하세요">
        <option value="react">React</option>
      </Select>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  test("ref를 통해 select 엘리먼트에 접근할 수 있어야 한다", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select
        ref={ref}
        defaultValue="react"
        placeholder="라이브러리를 선택하세요"
      >
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </Select>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current?.value).toBe("react");
  });
});
