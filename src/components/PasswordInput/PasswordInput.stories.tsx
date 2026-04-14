import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

export default {
  component: PasswordInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1531-1281",
    },
  },
  args: {
    placeholder: "패스워드를 입력해주세요.",
    disabled: false,
    invalid: false,
    required: false,
  },
} satisfies Meta<typeof PasswordInput>;

type Story = StoryObj<typeof PasswordInput>;

// 기본 상태
export const Default: Story = {};

// 포커스 상태
export const Focused: Story = {
  args: {
    autoFocus: true,
  },
};

// 에러 상태
export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "오류 메시지",
    defaultValue: "123",
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const HelpText: Story = {
  args: {
    helpText: "도움말 메시지",
  },
};
