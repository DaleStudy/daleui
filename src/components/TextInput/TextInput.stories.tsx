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
        trailingIcon="user"
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
    errorMessage: "오류 메시지",
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

export const HelperText: Story = {
  args: {
    helperText: "도움말 메시지",
  },
};

/**
 * `label` prop으로 레이블을 표시하고 입력 요소와 연결합니다.
 * `required`와 함께 사용하면 필수 표시(*)가 추가되고, `disabled`이면 레이블도 비활성화 스타일로 바뀝니다.
 */
export const WithLabel: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16", w: "320px" })}>
      <TextInput {...args} label="이름" placeholder="이름을 입력하세요" />
      <TextInput
        {...args}
        label="이름"
        required
        placeholder="필수 항목입니다"
      />
      <TextInput
        {...args}
        label="이름"
        disabled
        placeholder="수정할 수 없습니다"
      />
    </div>
  ),
  argTypes: {
    label: { control: false },
    placeholder: { control: false },
    required: { control: false },
    disabled: { control: false },
  },
};
