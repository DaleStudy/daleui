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
  },
  argTypes: {
    label: {
      control: "text",
    },
    tone: {
      control: "select",
      options: ["brand", "success", "warning", "info", "danger", "neutral"],
    },
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
    tone: {
      control: false,
    },
  },
};

export const States: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="체크된 상태" defaultChecked={true} />
        <Checkbox {...args} label="체크되지 않은 상태" defaultChecked={false} />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    defaultChecked: {
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

export const Invalid: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="유효하지 않은 체크박스" invalid />
        <Checkbox
          {...args}
          label="유효하지 않은 체크박스 (체크됨)"
          invalid
          defaultChecked
        />
        <Checkbox {...args} label="유효한 체크박스" />
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

export const WithValue: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          label="값이 있는 체크박스"
          value="checkbox-value"
          onCheckedChange={(details) =>
            console.log(`체크박스 상태: ${details.checked}, 값: checkbox-value`)
          }
        />
      </div>
    );
  },
};
