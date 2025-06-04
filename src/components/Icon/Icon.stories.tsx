import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Heading } from "../Heading/Heading";
import { Text } from "../Text/Text";
import { Icon } from "./Icon";

export default {
  component: Icon,
  parameters: {
    layout: "centered",
  },
  args: {
    name: "user",
  },
} satisfies Meta<typeof Icon>;

export const Basic: StoryObj<typeof Icon> = {
  args: {
    tone: "accent",
    muted: true,
    size: "xl",
  },
};

export const Sizes: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} size="xs" />
        <Icon {...args} size="sm" />
        <Icon {...args} size="md" />
        <Icon {...args} size="lg" />
        <Icon {...args} size="xl" />
      </div>
    );
  },
  argTypes: {
    size: {
      control: false,
    },
  },
  args: {
    tone: "accent",
    muted: true,
  },
};

export const Tones: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Icon {...args} tone="neutral" />
        <Icon {...args} tone="accent" />
        <Icon {...args} tone="danger" />
        <Icon {...args} tone="warning" />
      </div>
    );
  },
  argTypes: {
    tone: {
      control: false,
    },
  },
  args: {
    muted: true,
  },
};

export const Contrasts: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Text {...args} muted>
          낮은 <Icon name="moon" /> 명암비
        </Text>
        <Text {...args}>
          높은 <Icon name="sun" /> 명암비
        </Text>
      </div>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
    muted: {
      control: false,
    },
  },
};

export const WithHeading: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <Heading level={2}>
        <Icon {...args} name="user" />
        프로필
      </Heading>
    );
  },
  argTypes: {
    name: {
      control: false,
    },
  },
};
