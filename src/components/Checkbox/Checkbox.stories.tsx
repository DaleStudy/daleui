import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { vstack } from "../../../styled-system/patterns";

export default {
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  args: {
    id: "checkbox",
    label: "기본 체크박스",
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {};

export const Tones: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} id="brand" label="브랜드 색조" tone="brand" />
        <Checkbox {...args} id="neutral" label="중립 색조" tone="neutral" />
        <Checkbox {...args} id="danger" label="위험 색조" tone="danger" />
        <Checkbox {...args} id="success" label="성공 색조" tone="success" />
        <Checkbox {...args} id="warning" label="경고 색조" tone="warning" />
        <Checkbox {...args} id="info" label="정보 색조" tone="info" />
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
        <Checkbox {...args} id="checked" label="체크된 상태" checked={true} />
        <Checkbox
          {...args}
          id="unchecked"
          label="체크되지 않은 상태"
          checked={false}
        />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    checked: {
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
          id="disabled-checked"
          label="비활성화 & 체크된 상태"
          disabled
          checked
        />
        <Checkbox
          {...args}
          id="disabled-unchecked"
          label="비활성화 & 체크되지 않은 상태"
          disabled
        />
        <Checkbox {...args} id="enabled" label="활성화 상태" />
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

export const Required: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} id="required" label="필수 체크박스" required />
        <Checkbox {...args} id="optional" label="선택 체크박스" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    required: {
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
          id="value-example"
          label="값이 있는 체크박스"
          value="checkbox-value"
          onChange={(checked, value) =>
            console.log(`체크박스 상태: ${checked}, 값: ${value}`)
          }
        />
      </div>
    );
  },
};
