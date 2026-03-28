import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=851-1768",
    },
  },
  args: {
    label: "기본 체크박스",
    tone: "brand",
    checked: undefined,
    defaultChecked: false,
    disabled: false,
    invalid: false,
    required: false,
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {};

export const Tones: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="브랜드 색조" tone="brand" />
        <Checkbox {...args} label="중립 색조" tone="neutral" />
        <Checkbox {...args} label="위험 색조" tone="danger" />
        <Checkbox {...args} label="성공 색조" tone="success" />
        <Checkbox {...args} label="경고 색조" tone="warning" />
        <Checkbox {...args} label="정보 색조" tone="info" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          label="비활성화 & 체크된 상태"
          disabled
          defaultChecked
        />
        <Checkbox {...args} label="비활성화 & 체크되지 않은 상태" disabled />
        <Checkbox {...args} label="활성화 상태" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
  },
};

export const Invalid: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="에러 상태 체크박스" invalid />
        <Checkbox
          {...args}
          label="에러 상태 체크박스 (체크됨)"
          invalid
          defaultChecked
        />
        <Checkbox {...args} label="정상 체크박스" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    invalid: {
      control: false,
    },
  },
};

export const Required: StoryObj<typeof Checkbox> = {
  args: {
    label: "필수 체크박스",
    required: true,
  },
  argTypes: {
    checked: {
      control: false,
    },
    label: {
      control: false,
    },
    defaultChecked: {
      control: false,
    },
    invalid: {
      control: false,
    },
    disabled: {
      control: false,
    },
    name: {
      control: false,
    },
  },
};
