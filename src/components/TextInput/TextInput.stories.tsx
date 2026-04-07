import type { Meta, StoryObj } from "@storybook/react";
import { css } from "../../../styled-system/css";
import { vstack } from "../../../styled-system/patterns";
import { TextInput } from "./TextInput";

export default {
  component: TextInput,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1531-1280",
    },
  },
  args: {
    placeholder: "텍스트를 입력해주세요.",
    disabled: false,
    invalid: false,
    required: false,
  },
} satisfies Meta<typeof TextInput>;

type Story = StoryObj<typeof TextInput>;

/**
 * 가장 기본적인 TextInput 컴포넌트입니다. `disabled`, `invalid` 등의 props를 조절해보세요.
 */
export const Default: Story = {};

/**
 * `leadingIcon`과 `trailingIcon` prop에 아이콘 이름을 문자열로 전달하여 아이콘을 표시할 수 있습니다.
 * TextInput의 상태에 따라 아이콘의 스타일(색상, 비활성화)이 자동으로 변경됩니다.
 */
export const WithIcons: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16", w: "320px" })}>
      <TextInput
        {...args}
        leadingIcon="search"
        placeholder="검색어를 입력하세요..."
      />
      <TextInput
        {...args}
        trailingIcon="x"
        placeholder="아이디"
        defaultValue="storybook_user"
      />
      <TextInput
        {...args}
        disabled
        leadingIcon="star"
        placeholder="비활성화된 아이콘"
      />
    </div>
  ),
  argTypes: {
    leadingIcon: {
      control: false,
    },
    trailingIcon: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};

/**
 * `invalid` prop을 `true`로 설정하여 오류 상태를 시각적으로 표현할 수 있습니다.
 * 아이콘을 함께 사용하면, 아이콘의 색상도 오류 상태에 맞게 자동으로 변경됩니다.
 */
export const Invalid: Story = {
  render: (args) => (
    <div
      className={css({
        w: "320px",
      })}
    >
      <TextInput
        {...args}
        invalid
        trailingIcon="circleAlert"
        placeholder="이메일 형식이 올바르지 않습니다."
      />
    </div>
  ),
  args: {
    invalid: true,
  },
  argTypes: {
    invalid: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};

/**
 * `disabled` prop을 true로 설정하면 입력이 비활성화됩니다.
 * 아이콘이 있을 경우, 아이콘도 비활성화 스타일이 적용됩니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "수정할 수 없습니다.",
    leadingIcon: "star",
    "aria-label": "수정할 수 없는 입력 필드",
  },
  argTypes: {
    disabled: {
      control: false,
    },
    placeholder: {
      control: false,
    },
  },
};
