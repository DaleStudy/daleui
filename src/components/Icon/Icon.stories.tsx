import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Icon } from "./Icon";

export default {
  component: Icon,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1600-343&t=uQRCbSZfenVmrky5-0",
    },
  },
  args: { name: "user" },
} satisfies Meta<typeof Icon>;

export const Basic: StoryObj<typeof Icon> = {};

export const Sizes: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} size="xs" />
        <Icon {...args} size="sm" />
        <Icon {...args} size="md" />
        <Icon {...args} size="lg" />
      </div>
    );
  },
  argTypes: { size: { control: false } },
};

export const Tones: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} tone="neutral" />
        <Icon {...args} tone="brand" />
        <Icon {...args} tone="danger" />
        <Icon {...args} tone="warning" />
        <Icon {...args} tone="success" />
        <Icon {...args} tone="info" />
      </div>
    );
  },
  argTypes: { tone: { control: false } },
};
