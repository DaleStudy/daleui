import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Heading } from "./Heading";

export default {
  component: Heading,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "제목",
    level: 1,
    tone: "brand",
  },
} satisfies Meta<typeof Heading>;

export const Basic: StoryObj<typeof Heading> = {};

export const Levels: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} level={1}>
          1 단계
        </Heading>
        <Heading {...args} level={2}>
          2 단계
        </Heading>
        <Heading {...args} level={3}>
          3 단계
        </Heading>
        <Heading {...args} level={4}>
          4 단계
        </Heading>
        <Heading {...args} level={5}>
          5 단계
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    level: {
      control: false,
    },
  },
};

export const Tones: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} tone="neutral">
          중립 색조
        </Heading>
        <Heading {...args} tone="brand">
          브랜드 색조
        </Heading>
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

export const Sizes: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} size="md">
          제목
        </Heading>
        <Heading {...args} size="lg">
          제목
        </Heading>
        <Heading {...args} size="xl">
          제목
        </Heading>
        <Heading {...args} size="2xl">
          제목
        </Heading>
        <Heading {...args} size="3xl">
          제목
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};
