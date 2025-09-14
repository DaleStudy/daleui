import type { Meta, StoryObj } from "@storybook/react-vite";
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
  argTypes: {
    children: {
      control: "text",
      description: "텍스트 내용",
    },
    tone: {
      control: "select",
      description: "텍스트의 색조",
    },
    size: {
      control: "select",
      description: "텍스트의 크기",
    },
    weight: {
      control: "select",
      description: "텍스트의 굵기",
    },
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
        <Text {...args} tone="brand">
          브랜드 색조
        </Text>
        <Text {...args} tone="danger">
          위험 색조
        </Text>
        {/* <Text {...args} tone="warning">
          경고 색조
        </Text> */}
        <Text {...args} tone="success">
          성공 색조
        </Text>
        <Text {...args} tone="info">
          정보 색조
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
