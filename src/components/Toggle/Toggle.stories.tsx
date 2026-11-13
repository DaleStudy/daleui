import type { Meta, StoryObj } from "@storybook/react";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Toggle } from "./Toggle";

export default {
  component: Toggle,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/DaleUI-Kit?node-id=9520-7414",
    },
  },
  args: {
    size: "md",
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export const Basic: StoryObj<typeof Toggle> = {};

export const WithLabel: StoryObj<typeof Toggle> = {
  args: {
    label: "알림 받기",
  },
};

export const Sizes: StoryObj<typeof Toggle> = {
  render: (args) => (
    <div className={vstack({ gap: "16", alignItems: "flex-start" })}>
      <div className={hstack({ gap: "8", alignItems: "center" })}>
        <Toggle {...args} size="sm" />
        <Toggle {...args} size="sm" defaultChecked label="sm" />
      </div>
      <div className={hstack({ gap: "8", alignItems: "center" })}>
        <Toggle {...args} size="md" />
        <Toggle {...args} size="md" defaultChecked label="md" />
      </div>
      <div className={hstack({ gap: "8", alignItems: "center" })}>
        <Toggle {...args} size="lg" />
        <Toggle {...args} size="lg" defaultChecked label="lg" />
      </div>
    </div>
  ),
  argTypes: {
    size: { control: false },
    label: { control: false },
    defaultChecked: { control: false },
  },
};

export const Disabled: StoryObj<typeof Toggle> = {
  render: (args) => (
    <div className={vstack({ gap: "16", alignItems: "flex-start" })}>
      <Toggle {...args} label="비활성화 (꺼짐)" disabled />
      <Toggle {...args} label="비활성화 (켜짐)" disabled defaultChecked />
    </div>
  ),
  argTypes: {
    label: { control: false },
    disabled: { control: false },
    defaultChecked: { control: false },
  },
};
