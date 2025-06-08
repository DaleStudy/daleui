import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Text } from "./Text";

export default {
  component: Text,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "본문",
  },
} satisfies Meta<typeof Text>;

export const Basic: StoryObj<typeof Text> = {};

export const Tones: StoryObj<typeof Text> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Text {...args} tone="neutral">
          중립 색조
        </Text>
        <Text {...args} tone="accent">
          강조 색조
        </Text>
        <Text {...args} tone="danger">
          위험 색조
        </Text>
        <Text {...args} tone="warning">
          경고 색조
        </Text>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
};

export const Contrasts: StoryObj<typeof Text> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Text {...args} muted>
          낮은 명암비
        </Text>
        <Text {...args}>높은 명암비</Text>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    muted: {
      control: false,
    },
  },
};
