import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Link } from "./Link";

export default {
  component: Link,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "링크",
    href: "#",
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
    },
    tone: "brand",
    size: "md",
    iconName: "externalLink",
  },
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
} satisfies Meta;

export const Basic: StoryObj<typeof Link> = {};

export const Tones: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} tone="brand">
          브랜드 링크
        </Link>
        <Link {...args} tone="neutral">
          중립 링크
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

export const Icons: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} iconName="externalLink">
          아이콘 있음
        </Link>
        <Link {...args} iconName={undefined}>
          아이콘 없음
        </Link>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    iconName: {
      control: false,
    },
  },
};

export const Visited: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} href="https://www.daleui.com" target="_blank">
          방문한 링크
        </Link>
        <Link {...args}>방문하지 않은 링크</Link>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    href: {
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
        <Link {...args}>같은 탭에서 열기</Link>
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

export const Inline: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <p>
        이 문장에는 <Link {...args} />가 포함되어 있습니다.
      </p>
    );
  },
};
