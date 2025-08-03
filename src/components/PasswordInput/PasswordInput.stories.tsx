import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["brand", "neutral", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 상태
export const Default: Story = {
  args: {
    placeholder: "패스워드를 입력해주세요.",
  },
};

// 입력된 상태 - 패스워드가 입력되어 있음
export const WithPassword: Story = {
  args: {
    defaultValue: "password123",
    placeholder: "패스워드를 입력해주세요.",
  },
};

// 포커스 상태
export const Focused: Story = {
  render: () => {
    return (
      <div>
        <p style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
          아래 입력창을 클릭하면 포커스 상태를 확인할 수 있습니다:
        </p>
        <PasswordInput placeholder="패스워드를 입력해주세요." autoFocus />
      </div>
    );
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    tone: "danger",
    placeholder: "패스워드를 입력해주세요.",
    defaultValue: "123", // 너무 짧은 패스워드 예시
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "패스워드를 입력해주세요.",
  },
};
