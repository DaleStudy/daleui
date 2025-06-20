import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  parameters: {
    layout: "centered",
  },
  args: { label: "링크", href: undefined, iconName: "externalLink" },
  decorators: [
    (Story, context) => {
      return (
        <Story
          args={{
            ...context.args,
            href: context.args.href || window.parent.location.href,
          }}
        />
      );
    },
  ],
};

export default meta;

export const Basic: StoryObj<typeof Link> = {};

export const Tones: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} tone="brand" label="브랜드 링크" />
        <Link {...args} tone="neutral" label="중립 링크" />
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

export const Underlines: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} underline label="밑줄 있음" />
        <Link {...args} underline={false} label="밑줄 없음" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    underline: {
      control: false,
    },
  },
};

export const Sizes: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} size="sm" label="작은 링크" />
        <Link {...args} size="md" label="중간 링크" />
        <Link {...args} size="lg" label="큰 링크" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};

export const Security: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link
          {...args}
          target="_blank"
          label="새 탭에서 열기 (보안 속성 자동 추가)"
        />
        <Link {...args} label="같은 탭에서 열기" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    target: {
      control: false,
    },
  },
};

export const Inline: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <p>
        이 문장에는 <Link {...args} />가 포함되어 있습니다.
      </p>
    );
  },
};
