import type { Meta, StoryObj } from "@storybook/react";
import { VStack } from "../VStack/VStack";
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

/**
 * `disabled`와 `readOnly` 상태를 비교합니다.
 * `disabled`는 입력이 비활성화되고 흐려집니다.
 * `readOnly`는 값은 보이지만 편집할 수 없고, 흐려지지 않고 커서만 기본값으로 바뀌며 표시/숨김 토글도 비활성화됩니다.
 */
export const Disabled: Story = {
  render: (args) => (
    <VStack gap="16" style={{ width: "320px" }}>
      <PasswordInput
        {...args}
        disabled
        defaultValue="수정할 수 없습니다"
        label="비활성화"
      />
      <PasswordInput
        {...args}
        readOnly
        defaultValue="read-only-secret"
        label="읽기 전용"
      />
    </VStack>
  ),
  argTypes: {
    disabled: { control: false },
    readOnly: { control: false },
  },
};

export const HelperText: Story = {
  args: {
    helperText: "도움말 메시지",
  },
};

/**
 * `label` prop으로 레이블을 표시하고 입력 요소와 연결합니다.
 */
export const WithLabel: Story = {
  render: (args) => (
    <VStack gap="16" style={{ width: "320px" }}>
      <PasswordInput {...args} label="비밀번호" />
      <PasswordInput {...args} label="비밀번호" required />
      <PasswordInput {...args} label="비밀번호" disabled />
    </VStack>
  ),
  argTypes: {
    label: { control: false },
    required: { control: false },
    disabled: { control: false },
  },
};
