import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "기본 체크박스",
    tone: "brand",
    checked: undefined,
    defaultChecked: false,
    disabled: false,
    error: false,
  },
  argTypes: {
    label: {
      control: "text",
    },
    tone: {
      control: "select",
      options: ["brand", "success", "warning", "info", "danger", "neutral"],
    },
    checked: {
      control: "select",
      options: [undefined, true, false],
    },
    defaultChecked: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {};

export const Controlled: StoryObj<typeof Checkbox> = {
  args: {
    label: "Controlled 체크박스",
    checked: false,
  },
  argTypes: {
    defaultChecked: {
      control: false,
    },
  },
};

export const DefaultChecked: StoryObj<typeof Checkbox> = {
  args: {
    label: "기본값이 체크된 체크박스",
    defaultChecked: true,
  },
  argTypes: {
    checked: {
      control: false,
    },
  },
};

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
    tone: {
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
    disabled: {
      control: false,
    },
  },
};

export const Error: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="에러 상태 체크박스" error />
        <Checkbox
          {...args}
          label="에러 상태 체크박스 (체크됨)"
          error
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
    error: {
      control: false,
    },
  },
};
