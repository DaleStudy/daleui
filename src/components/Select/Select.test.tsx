import { createRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { Select } from "./Select";

describe("렌더링", () => {
  test("기본 구조로 올바르게 렌더링한다", () => {
    render(
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByRole("combobox", {
      name: "UI 라이브러리/프레임워크를 선택하세요",
    });
    expect(trigger).toBeInTheDocument();
    expect(
      screen.getByText("UI 라이브러리/프레임워크를 선택하세요"),
    ).toBeInTheDocument();
  });

  test("placeholder가 올바르게 표시된다", () => {
    render(
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    expect(
      screen.getByText("UI 라이브러리/프레임워크를 선택하세요"),
    ).toBeInTheDocument();
  });

  test("defaultValue가 제공되면 해당 값을 선택한다", () => {
    render(
      <Select.Root defaultValue="vue">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  test("value가 defaultValue보다 우선한다", () => {
    render(
      <Select.Root defaultValue="vue" value="svelte">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByText("Svelte")).toBeInTheDocument();
    expect(screen.queryByText("Vue")).not.toBeInTheDocument();
  });

  test.each([undefined, ""])(
    "value가 %s일 때 placeholder가 표시된다",
    (value) => {
      render(
        <Select.Root value={value}>
          <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
          </Select.Content>
        </Select.Root>,
      );

      expect(
        screen.getByText("UI 라이브러리/프레임워크를 선택하세요"),
      ).toBeInTheDocument();
    },
  );

  test("disabled가 true일 때 선택이 비활성화된다", () => {
    render(
      <Select.Root disabled>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByRole("combobox", {
      name: "UI 라이브러리/프레임워크를 선택하세요",
    });
    expect(trigger).toBeDisabled();
  });

  test("clearable이 true이고 값이 선택되어 있을 때 clear 버튼이 표시된다", () => {
    render(
      <Select.Root value="react" clearable>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const clearButton = screen.getByRole("button", {
      name: /clear/i,
    });
    expect(clearButton).toBeInTheDocument();
  });

  test("clearable이 false이거나 없을 때 clear 버튼이 표시되지 않는다", () => {
    const { rerender } = render(
      <Select.Root value="react" clearable={false}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    let clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });
    expect(clearButton).not.toBeInTheDocument();

    rerender(
      <Select.Root value="react">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });
    expect(clearButton).not.toBeInTheDocument();
  });

  test("clearable이 true여도 값이 없을 때 clear 버튼이 표시되지 않는다", () => {
    render(
      <Select.Root clearable>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
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
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");
    await user.click(trigger);

    const option = screen.getByRole("option", { name: "React" });
    await user.click(option);

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("옵션 선택 시 onValueChange를 호출한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select.Root onValueChange={handleChange}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");
    await user.click(trigger);

    const option = screen.getByRole("option", { name: "React" });
    await user.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith("react");
  });

  test("disabled가 true일 때 사용자 액션이 차단된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select.Root disabled onValueChange={handleChange}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");
    await user.click(trigger).catch(() => {});
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("키보드로 옵션을 탐색할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");
    trigger.focus();

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(screen.getByText("React")).toBeInTheDocument();
  });

  test("여러 옵션을 순차적으로 선택할 수 있다", async () => {
    const user = userEvent.setup();

    render(
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");

    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: "React" }));
    expect(screen.getByText("React")).toBeInTheDocument();

    await user.click(screen.getByText("React"));
    await user.click(screen.getByRole("option", { name: "Vue" }));
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  test("clear 버튼을 클릭하면 값이 초기화된다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select.Root value="react" clearable onValueChange={handleChange}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const clearButton = screen.getByRole("button", {
      name: /clear/i,
    });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });

  test("clear 버튼 클릭 시 placeholder가 다시 표시된다", async () => {
    const user = userEvent.setup();

    const ControlledSelectTest = () => {
      const [selectedValue, setSelectedValue] = useState<string | undefined>(
        "react",
      );

      return (
        <Select.Root
          value={selectedValue}
          clearable
          onValueChange={(value: string | undefined) => {
            setSelectedValue(value);
          }}
        >
          <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
          </Select.Content>
        </Select.Root>
      );
    };

    render(<ControlledSelectTest />);

    expect(screen.getByText("React")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", {
      name: /clear/i,
    });
    await user.click(clearButton);

    expect(
      screen.getByText("UI 라이브러리/프레임워크를 선택하세요"),
    ).toBeInTheDocument();
    expect(screen.queryByText("React")).not.toBeInTheDocument();
  });

  test("disabled 상태일 때 clear 버튼이 작동하지 않는다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select.Root
        value="react"
        clearable
        disabled
        onValueChange={handleChange}
      >
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const clearButton = screen.queryByRole("button", {
      name: /clear/i,
    });

    if (clearButton) {
      expect(clearButton).toBeDisabled();
      await user.click(clearButton).catch(() => {});
      expect(handleChange).not.toHaveBeenCalled();
    }
  });

  test("required일 때도 clear 버튼이 작동한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Select.Root
        value="react"
        clearable
        required
        onValueChange={handleChange}
      >
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const clearButton = screen.getByRole("button", {
      name: /clear/i,
    });
    await user.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(undefined);
  });
});

describe("상태 관리", () => {
  test("제어 모드에서 정상적으로 동작한다", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const ControlledSelectTest = () => {
      const [selectedValue, setSelectedValue] = useState<string | undefined>(
        "react",
      );

      return (
        <Select.Root
          value={selectedValue}
          onValueChange={(value: string | undefined) => {
            handleChange(value);
            setSelectedValue(value);
          }}
        >
          <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
            <Select.Item value="svelte">Svelte</Select.Item>
          </Select.Content>
        </Select.Root>
      );
    };

    render(<ControlledSelectTest />);

    expect(screen.getByText("React")).toBeInTheDocument();

    const trigger = screen.getByText("React");
    await user.click(trigger);

    const option = screen.getByRole("option", { name: "Vue" });
    await user.click(option);

    expect(handleChange).toHaveBeenCalledWith("vue");
    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  test("비제어 모드에서 정상적으로 동작한다", async () => {
    const user = userEvent.setup();

    render(
      <Select.Root defaultValue="react">
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByText("React")).toBeInTheDocument();

    const trigger = screen.getByText("React");
    await user.click(trigger);

    const option = screen.getByRole("option", { name: "Vue" });
    await user.click(option);

    expect(screen.getByText("Vue")).toBeInTheDocument();
  });

  test("여러 Select 인스턴스가 독립적으로 동작한다", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Select.Root defaultValue="react">
          <Select.Trigger placeholder="첫 번째 선택" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
          </Select.Content>
        </Select.Root>
        <Select.Root defaultValue="svelte">
          <Select.Trigger placeholder="두 번째 선택" />
          <Select.Content>
            <Select.Item value="svelte">Svelte</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
          </Select.Content>
        </Select.Root>
      </>,
    );

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Svelte")).toBeInTheDocument();

    const trigger1 = screen.getByRole("combobox", { name: "첫 번째 선택" });
    await user.click(trigger1);
    await user.click(screen.getByRole("option", { name: "Vue" }));

    expect(screen.getByText("Vue")).toBeInTheDocument();
    expect(screen.getByText("Svelte")).toBeInTheDocument();
  });
});

describe("접근성 및 기타", () => {
  test.each([
    [true, "true"],
    [false, "false"],
  ])("invalid가 %s일 때 aria-invalid 속성이 %s이다", (invalid, ariaInvalid) => {
    render(
      <Select.Root invalid={invalid}>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByRole("combobox", {
      name: "UI 라이브러리/프레임워크를 선택하세요",
    });
    expect(trigger).toHaveAttribute("aria-invalid", ariaInvalid);
  });

  test.each([
    [true, "true"],
    [false, "false"],
  ])(
    "required가 %s일 때 aria-required 속성이 %s이다",
    (required, ariaRequired) => {
      render(
        <Select.Root required={required}>
          <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
          </Select.Content>
        </Select.Root>,
      );

      const trigger = screen.getByRole("combobox", {
        name: "UI 라이브러리/프레임워크를 선택하세요",
      });
      expect(trigger).toHaveAttribute("aria-required", ariaRequired);
    },
  );

  test("disabled 옵션이 있을 때 해당 옵션은 aria-disabled 속성을 가진다", async () => {
    const user = userEvent.setup();

    render(
      <Select.Root>
        <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue" disabled>
            Vue
          </Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    const trigger = screen.getByText("UI 라이브러리/프레임워크를 선택하세요");
    await user.click(trigger);

    const disabledOption = screen.getByRole("option", { name: "Vue" });
    expect(disabledOption).toHaveAttribute("aria-disabled", "true");
  });

  test("ref가 내부 trigger 엘리먼트로 전달된다", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Select.Root>
        <Select.Trigger
          ref={ref}
          placeholder="UI 라이브러리/프레임워크를 선택하세요"
        />
        <Select.Content>
          <Select.Item value="react">React</Select.Item>
        </Select.Content>
      </Select.Root>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test("name이 제공되면 form 제출 시 올바른 값이 전달된다", () => {
    const formData = new FormData();
    const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      formData.append("framework", e.currentTarget.framework.value);
    });

    render(
      <form onSubmit={handleSubmit}>
        <Select.Root name="framework" defaultValue="react">
          <Select.Trigger placeholder="UI 라이브러리/프레임워크를 선택하세요" />
          <Select.Content>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
          </Select.Content>
        </Select.Root>
        <button type="submit">제출</button>
      </form>,
    );

    const submitButton = screen.getByRole("button", { name: "제출" });
    submitButton.click();

    expect(handleSubmit).toHaveBeenCalled();
    expect(formData.get("framework")).toBe("react");
  });
});
