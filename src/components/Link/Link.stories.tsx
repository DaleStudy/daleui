import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Link } from "./Link";
import { Icon } from "../Icon/Icon";
import { Text } from "../Text/Text";

export default {
  component: Link,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "링크",
    href: "#",
  },
} satisfies Meta<typeof Link>;

export const Basic: StoryObj<typeof Link> = {};

export const Tones: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} tone="neutral">
          중립 링크
        </Link>
        <Link {...args} tone="accent">
          강조 링크
        </Link>
        <Link {...args} tone="danger">
          위험 링크
        </Link>
        <Link {...args} tone="warning">
          경고 링크
        </Link>
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

export const Contrasts: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} muted>
          낮은 명암비
        </Link>
        <Link {...args}>높은 명암비</Link>
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

export const Underlines: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} underline>
          밑줄 있음
        </Link>
        <Link {...args} underline={false}>
          밑줄 없음
        </Link>
      </div>
    );
  },
  argTypes: {
    children: {
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
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} size="sm">
          작은 링크
        </Link>
        <Link {...args} size="md">
          중간 링크
        </Link>
        <Link {...args} size="lg">
          큰 링크
        </Link>
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

export const Weights: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} weight="thin">
          얇은 굵기
        </Link>
        <Link {...args} weight="light">
          가벼운 굵기
        </Link>
        <Link {...args} weight="normal">
          일반 굵기
        </Link>
        <Link {...args} weight="medium">
          중간 굵기
        </Link>
        <Link {...args} weight="bold">
          굵은 굵기
        </Link>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    weight: {
      control: false,
    },
  },
};

export const Security: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link {...args} target="_blank">
          새 탭에서 열기 (보안 속성 자동 추가)
        </Link>
        <Link {...args} target="_self">
          같은 탭에서 열기
        </Link>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    target: {
      control: false,
    },
  },
};

export const Mismatch: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.md" })}>
        <Link tone="accent" underline>
          <Text tone="danger">나의 밑줄은 무슨 색일까? 🤔</Text>
        </Link>
        <Link size="sm" tone="accent" {...args}>
          <Icon name="clock" size="xl" tone="danger" />
          링크 아이콘
        </Link>
        <Link tone="danger"></Link>
      </div>
    );
  },
};

export const WithIcon: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <Link {...args} target="_blank">
        <Icon name="chevronRight" />
        링크 아이콘
      </Link>
    );
  },
};

export const Inline: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <p>
        이 문장에는 <Link {...args}>링크</Link>가 포함되어 있습니다.
      </p>
    );
  },
};
