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

export const Contrasts: StoryObj<typeof Heading> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Heading {...args} muted>
          낮은 명암비
        </Heading>
        <Heading {...args}>높은 명암비</Heading>
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
