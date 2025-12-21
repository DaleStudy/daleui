import type { Meta, StoryObj } from "@storybook/react-vite";
import { flex, vstack } from "../../../styled-system/patterns";
import { Icon } from "./Icon";
import { VStack } from "../VStack/VStack";
import { css } from "../../../styled-system/css";

export default {
  component: Icon,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=209-620",
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

export const Solid: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <VStack
        gap="24"
        className={css({
          bgColor: "fg.neutral.disabled",
          p: "24",
        })}
      >
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="neutral" />
          <Icon {...args} solid tone="neutral" />
        </div>
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="brand" />
          <Icon {...args} solid tone="brand" />
        </div>
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="danger" />
          <Icon {...args} solid tone="danger" />
        </div>
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="warning" />
          <Icon {...args} solid tone="warning" />
        </div>
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="success" />
          <Icon {...args} solid tone="success" />
        </div>
        <div className={flex({ gap: "24" })}>
          <Icon {...args} solid={false} tone="info" />
          <Icon {...args} solid tone="info" />
        </div>
      </VStack>
    );
  },
  argTypes: { solid: { control: false }, tone: { control: false } },
};
