import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Heading } from "./Heading";

const meta = {
  component: Heading,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "제목",
    level: 1,
  },
} satisfies Meta<typeof Heading>;

export default meta;

export const Basic: StoryObj<typeof meta> = {};

export const Levels: StoryObj<typeof meta> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "6" })}>
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
        <Heading {...args} level={6}>
          6 단계
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

export const Contrasts: StoryObj<typeof meta> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "6" })}>
        <Heading {...args} contrast="low">
          낮은 명암비
        </Heading>
        <Heading {...args} contrast="high">
          높은 명암비
        </Heading>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    contrast: {
      control: false,
    },
  },
};
