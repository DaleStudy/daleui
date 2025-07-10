import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Icon } from "../Icon/Icon";
import { TextInput } from "./TextInput";

export default {
  component: TextInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1716-641&t=DTMfNzoC2d19WCiu-4",
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "입력 필드의 크기를 조절합니다.",
    },
    state: {
      control: "select",
      options: ["success", "warning", "error", undefined],
      description: "입력 필드의 상태(성공, 경고, 오류)를 설정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "입력 필드를 비활성화합니다.",
    },
    leadingIcon: {
      control: false, // 아이콘은 직접 코드로 보여주는 것이 더 명확하므로 컨트롤 비활성화
    },
    trailingIcon: {
      control: false,
    },
  },
  args: {
    placeholder: "텍스트를 입력해주세요.",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof TextInput>;

/**
 * 가장 기본적인 TextInput 컴포넌트입니다. `size`, `disabled` 등의 props를 조절해보세요.
 */
export const Default: Story = {};

/**
 * `size` prop을 통해 입력 필드의 크기를 조절할 수 있습니다.
 */
export const Sizes: Story = {
  render: (args) => (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "16",
        w: "320px",
      })}
    >
      <TextInput {...args} size="sm" placeholder="Small size" />
      <TextInput {...args} size="md" placeholder="Medium size" />
      <TextInput {...args} size="lg" placeholder="Large size" />
    </div>
  ),
};

/**
 * `leadingIcon`과 `trailingIcon` prop에 Icon 컴포넌트를 전달하여 아이콘을 표시할 수 있습니다.
 * TextInput의 상태에 따라 아이콘의 스타일(색상, 비활성화)이 자동으로 변경됩니다.
 */
export const WithIcons: Story = {
  render: (args) => (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "16",
        w: "320px",
      })}
    >
      <TextInput
        {...args}
        leadingIcon={<Icon name="search" />}
        placeholder="검색어를 입력하세요..."
      />
      <TextInput
        {...args}
        trailingIcon={<Icon name="x" />}
        placeholder="아이디"
        defaultValue="storybook_user"
      />
      <TextInput
        {...args}
        disabled
        leadingIcon={<Icon name="star" />}
        placeholder="비활성화된 아이콘"
      />
    </div>
  ),
};

/**
 * `state` prop을 통해 입력 필드의 상태(성공, 경고, 오류)를 시각적으로 표현할 수 있습니다.
 * 아이콘을 함께 사용하면, 아이콘의 색상도 상태에 맞게 자동으로 변경됩니다.
 */
export const States: Story = {
  render: (args) => (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "16",
        w: "320px",
      })}
    >
      <TextInput
        {...args}
        state="success"
        defaultValue="올바른 형식입니다."
        trailingIcon={<Icon name="check" />}
      />
      <TextInput
        {...args}
        state="warning"
        defaultValue="비밀번호가 곧 만료됩니다."
        trailingIcon={<Icon name="circleAlert" />}
      />
      <TextInput
        {...args}
        state="error"
        defaultValue="이메일 형식이 올바르지 않습니다."
        trailingIcon={<Icon name="circleAlert" />}
      />
    </div>
  ),
};

/**
 * `disabled` prop을 true로 설정하면 입력이 비활성화됩니다.
 * 아이콘이 있을 경우, 아이콘도 비활성화 스타일이 적용됩니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "수정할 수 없습니다.",
    leadingIcon: <Icon name="star" />,
  },
};

const ControlledTextInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={css({ w: "320px" })}>
      <TextInput
        value={value}
        onChange={handleChange}
        placeholder="이곳에 입력하세요..."
        trailingIcon={
          value.length > 0 ? (
            <span
              className={css({ cursor: "pointer", display: "inline-flex" })}
              onClick={() => setValue("")}
            >
              <Icon name="x" />
            </span>
          ) : undefined
        }
      />
      <div className={css({ mt: "16", fontSize: "sm" })}>
        <p>현재 값: {value}</p>
        <p>글자 수: {value.length}</p>
      </div>
    </div>
  );
};

/**
 * `useState`와 함께 `value`, `onChange` prop을 사용하여 제어 컴포넌트로 만들 수 있습니다.
 */
export const Controlled: Story = {
  render: () => <ControlledTextInput />,
  args: {},
};
