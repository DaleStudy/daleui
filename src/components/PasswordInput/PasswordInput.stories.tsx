import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

export default {
  component: PasswordInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1780-2822&t=KboHYHT3LB7QCZnb-1",
    },
  },
  args: {
    placeholder: "패스워드를 입력해주세요.",
    size: "md",
    disabled: false,
    invalid: false,
  },
  argTypes: {
    size: {
      control: "select",
      description: "입력 필드의 크기",
    },
  },
} satisfies Meta<typeof PasswordInput>;

type Story = StoryObj<typeof PasswordInput>;

// 기본 상태
export const Default: Story = {};

// 패스워드가 입력된 상태
export const WithPassword: Story = {
  args: {
    defaultValue: "password123",
  },
};

// 포커스 상태
export const Focused: Story = {
  args: {
    autoFocus: true,
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    invalid: true,
    defaultValue: "123",
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
