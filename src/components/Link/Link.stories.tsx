import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Icon } from "../Icon/Icon";
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

export const Basic: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <Link {...args} aria-label="링크">
        {args.children}
        <Icon name="externalLink" size={args.size} />
      </Link>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "기본적인 링크 컴포넌트 예시입니다. 아이콘과 함께 사용할 수 있습니다.",
      },
    },
  },
};

export const Tones: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} tone="brand" aria-label="브랜드 링크">
          브랜드 링크
          <Icon name="externalLink" size={args.size} />
        </Link>
        <Link {...args} tone="neutral" aria-label="중립 링크">
          중립 링크
          <Icon name="externalLink" size={args.size} />
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
  parameters: {
    docs: {
      description: {
        story: "링크의 색상을 변경할 수 있습니다. 기본값은 `brand`입니다.",
      },
    },
  },
};

export const Underlines: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} underline aria-label="밑줄 있음">
          밑줄 있음
          <Icon name="externalLink" size={args.size} />
        </Link>
        <Link {...args} underline={false} aria-label="밑줄 없음">
          밑줄 없음
          <Icon name="externalLink" size={args.size} />
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
  parameters: {
    docs: {
      description: {
        story: "링크의 밑줄 여부를 변경할 수 있습니다. 기본값은 `true`입니다.",
      },
    },
  },
};

export const Sizes: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} size="sm" aria-label="작은 링크">
          작은 링크
          <Icon name="externalLink" size="sm" />
        </Link>
        <Link {...args} size="md" aria-label="중간 링크">
          중간 링크
          <Icon name="externalLink" size="md" />
        </Link>
        <Link {...args} size="lg" aria-label="큰 링크">
          큰 링크
          <Icon name="externalLink" size="lg" />
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
  parameters: {
    docs: {
      description: {
        story: "링크의 크기를 변경할 수 있습니다. 기본값은 `md`입니다.",
      },
    },
  },
};

export const Icons: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link {...args} aria-label="아이콘 있음">
          아이콘 있음 <Icon name="externalLink" size={args.size} />
        </Link>
        <Link {...args}>아이콘 없음</Link>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "children에 아이콘을 추가할 수 있습니다.",
      },
    },
  },
};

export const Visited: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Link
          {...args}
          href="https://www.daleui.com"
          target="_blank"
          aria-label="방문한 링크"
        >
          방문한 링크
          <Icon name="externalLink" size={args.size} />
        </Link>
        <Link {...args} aria-label="방문하지 않은 링크">
          방문하지 않은 링크
          <Icon name="externalLink" size={args.size} />
        </Link>
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
  parameters: {
    docs: {
      description: {
        story: "링크의 방문 여부에 따라 아이콘의 색상이 변경됩니다.",
      },
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
          aria-label="새 탭에서 열기 (보안 속성 자동 추가)"
        >
          새 탭에서 열기 (보안 속성 자동 추가)
          <Icon name="externalLink" size={args.size} />
        </Link>
        <Link {...args} aria-label="같은 탭에서 열기">
          같은 탭에서 열기
          <Icon name="externalLink" size={args.size} />
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
  parameters: {
    docs: {
      description: {
        story:
          "`target='_blank'`를 통해 새탭으로 열 경우 링크의 보안 속성을 자동으로 추가합니다.",
      },
    },
  },
};

export const Inline: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <p>
        이 문장에는{" "}
        <Link {...args} aria-label="링크">
          링크
          <Icon name="externalLink" size={args.size} />
        </Link>
        가 포함되어 있습니다.
      </p>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "링크를 텍스트 내에 포함할 수 있습니다.",
      },
    },
  },
};

export const NoAriaLabel: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <Link {...args}>
        잘못된 링크 <Icon name="externalLink" size={args.size} />
      </Link>
    );
  },
};
