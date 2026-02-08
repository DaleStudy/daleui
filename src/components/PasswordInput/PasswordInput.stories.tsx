import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "../../../styled-system/css";
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

const ControlledPasswordInput = () => {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);

    // 8자 미만이면 에러
    if (newValue.length > 0 && newValue.length < 8) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  return (
    <div className={css({ w: "320px" })}>
      <PasswordInput
        value={value}
        onChange={handleChange}
        placeholder="8자 이상 입력하세요..."
        invalid={hasError}
      />
      <div className={css({ mt: "16", fontSize: "sm" })}>
        <p>현재 값 길이: {value.length}자</p>
        {hasError && (
          <p className={css({ color: "fg.danger" })}>
            비밀번호는 8자 이상이어야 합니다.
          </p>
        )}
        {value.length >= 8 && (
          <p className={css({ color: "fg.success" })}>
            사용 가능한 비밀번호입니다.
          </p>
        )}
      </div>
    </div>
  );
};

/**
 * `useState`와 함께 `value`, `onChange` prop을 사용하여 제어 컴포넌트로 만들 수 있습니다.
 */
export const Controlled: Story = {
  render: () => <ControlledPasswordInput />,
  argTypes: {
    invalid: { control: false },
    disabled: { control: false },
    placeholder: { control: false },
    value: { control: false },
    onChange: { control: false },
  },
};

/**
 * `defaultValue` prop을 사용하여 초기값을 설정할 수 있습니다.
 */
export const Uncontrolled: Story = {
  args: {
    defaultValue: "password123",
  },
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
    onChange: { control: false },
  },
};
