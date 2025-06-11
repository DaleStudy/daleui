import type { Meta, StoryObj } from "@storybook/react";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Link } from "./Link";
import { Icon } from "../Icon/Icon";

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
      <div className={vstack({ gap: "24" })}>
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
      <div className={vstack({ gap: "24" })}>
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
      <div className={vstack({ gap: "24" })}>
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
      <div className={vstack({ gap: "24" })}>
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
      <div className={vstack({ gap: "24" })}>
        <Link {...args} weight="normal">
          일반 굵기
        </Link>
        <Link {...args} weight="medium">
          중간 굵기
        </Link>
        <Link {...args} weight="semibold">
          세미볼드 굵기
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
      <div className={vstack({ gap: "24" })}>
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

export const UnderlineThickness: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "0", alignItems: "start" })}>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="xs" weight="normal">
            일반
          </Link>
          <Link {...args} size="xs" weight="medium">
            중간
          </Link>
          <Link {...args} size="xs" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="xs" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="sm" weight="normal">
            일반
          </Link>
          <Link {...args} size="sm" weight="medium">
            중간
          </Link>
          <Link {...args} size="sm" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="sm" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="md" weight="normal">
            일반
          </Link>
          <Link {...args} size="md" weight="medium">
            중간
          </Link>
          <Link {...args} size="md" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="md" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="lg" weight="normal">
            일반
          </Link>
          <Link {...args} size="lg" weight="medium">
            중간
          </Link>
          <Link {...args} size="lg" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="lg" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="2xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="2xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="2xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="2xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="3xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="3xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="3xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="3xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="4xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="4xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="4xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="4xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="5xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="5xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="5xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="5xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="6xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="6xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="6xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="6xl" weight="bold">
            굵은
          </Link>
        </div>
        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="7xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="7xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="7xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="7xl" weight="bold">
            굵은
          </Link>
        </div>

        <div className={hstack({ gap: "24" })}>
          <Link {...args} size="8xl" weight="normal">
            일반
          </Link>
          <Link {...args} size="8xl" weight="medium">
            중간
          </Link>
          <Link {...args} size="8xl" weight="semibold">
            세미볼드
          </Link>
          <Link {...args} size="8xl" weight="bold">
            굵은
          </Link>
        </div>
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
    size: {
      control: false,
    },
  },
};
