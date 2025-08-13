import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1780-2822&t=KboHYHT3LB7QCZnb-1",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    invalid: {
      control: "boolean",
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
  render: (args) => <PasswordInput {...args} />,
};

// 패스워드가 입력된 상태
export const WithPassword: Story = {
  args: {
    defaultValue: "password123",
    placeholder: "패스워드를 입력해주세요.",
  },
  render: (args) => <PasswordInput {...args} />,
};

// 포커스 상태
export const Focused: Story = {
  args: {
    placeholder: "패스워드를 입력해주세요.",
    autoFocus: true,
  },
  render: (args) => <PasswordInput {...args} />,
};

// 에러 상태
export const Error: Story = {
  args: {
    invalid: true,
    placeholder: "패스워드를 입력해주세요.",
    defaultValue: "123",
  },
  render: (args) => <PasswordInput {...args} />,
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "패스워드를 입력해주세요.",
  },
  render: (args) => <PasswordInput {...args} />,
};
